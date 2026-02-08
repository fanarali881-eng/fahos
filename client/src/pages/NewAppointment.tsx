import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

declare const L: any;

// Arabic to English letter mapping for plate
const letterOptions = [
  { value: "-", ar: "-", en: "-" },
  { value: "أ - A", ar: "أ", en: "A" },
  { value: "ب - B", ar: "ب", en: "B" },
  { value: "ح - J", ar: "ح", en: "J" },
  { value: "د - D", ar: "د", en: "D" },
  { value: "ر - R", ar: "ر", en: "R" },
  { value: "س - S", ar: "س", en: "S" },
  { value: "ص - X", ar: "ص", en: "X" },
  { value: "ط - T", ar: "ط", en: "T" },
  { value: "ع - E", ar: "ع", en: "E" },
  { value: "ق - G", ar: "ق", en: "G" },
  { value: "ك - K", ar: "ك", en: "K" },
  { value: "ل - L", ar: "ل", en: "L" },
  { value: "م - Z", ar: "م", en: "Z" },
  { value: "ن - N", ar: "ن", en: "N" },
  { value: "ه - H", ar: "ه", en: "H" },
  { value: "و - U", ar: "و", en: "U" },
  { value: "ي - V", ar: "ي", en: "V" },
];

const regions = [
  "اختر منطقة",
  "منطقة نجران",
  "منطقة الجوف",
  "المنطقة الشرقية",
  "منطقة تبوك",
  "منطقة القصيم",
  "منطقة حائل",
  "منطقة عسير",
  "منطقة مكة المكرمة",
  "منطقة المدينة المنورة",
  "منطقة الباحة",
  "منطقة الرياض",
  "منطقة جازان",
  "منطقة الحدود الشمالية",
];

const centersByRegion: Record<string, string[]> = {
  "منطقة نجران": [
    "نجران",
  ],
  "منطقة الجوف": [
    "الجوف",
    "القريات",
  ],
  "المنطقة الشرقية": [
    "الهفوف",
    "الخفجي",
    "الجبيل",
    "الدمام",
    "حفر الباطن",
  ],
  "منطقة تبوك": [
    "تبوك",
  ],
  "منطقة القصيم": [
    "الراس",
    "القصيم",
  ],
  "منطقة حائل": [
    "حائل",
  ],
  "منطقة عسير": [
    "بيشة",
    "ابها",
    "محايل عسير",
  ],
  "منطقة مكة المكرمة": [
    "جدة الشمال",
    "جدة عسفان",
    "مكة المكرمة",
    "الطائف",
    "جدة الجنوب",
    "الخرمة",
  ],
  "منطقة المدينة المنورة": [
    "المدينة المنورة",
    "ينبع",
  ],
  "منطقة الباحة": [
    "الباحة",
  ],
  "منطقة الرياض": [
    "الرياض حي المونسية",
    "وادي الدواسر",
    "الخرج",
    "جنوب شرق الرياض مخرج سبعة عشر",
    "الرياض حي الشفا طريق ديراب",
    "المجمعة",
    "القويعية",
    "الرياض حي القيروان",
  ],
  "منطقة جازان": [
    "جيزان",
  ],
  "منطقة الحدود الشمالية": [
    "عرعر",
  ],
};

const centerCoordinates: Record<string, [number, number]> = {
  "نجران": [17.4933, 44.1277],
  "الجوف": [29.9697, 40.2064],
  "القريات": [31.3326, 37.3432],
  "الهفوف": [25.3648, 49.5876],
  "الخفجي": [28.4392, 48.4920],
  "الجبيل": [27.0046, 49.6225],
  "الدمام": [26.4207, 50.0888],
  "حفر الباطن": [28.4328, 45.9708],
  "تبوك": [28.3838, 36.5550],
  "الراس": [25.8607, 43.4984],
  "القصيم": [26.3260, 43.9750],
  "حائل": [27.5114, 41.7208],
  "بيشة": [20.0000, 42.6000],
  "ابها": [18.2164, 42.5053],
  "محايل عسير": [18.5340, 42.0530],
  "جدة الشمال": [21.6500, 39.1500],
  "جدة عسفان": [21.9000, 39.3500],
  "مكة المكرمة": [21.3891, 39.8579],
  "الطائف": [21.2703, 40.4158],
  "جدة الجنوب": [21.4000, 39.1700],
  "الخرمة": [21.9131, 42.1194],
  "المدينة المنورة": [24.4672, 39.6024],
  "ينبع": [24.0895, 38.0618],
  "الباحة": [20.0000, 41.4667],
  "الرياض حي المونسية": [24.7800, 46.8100],
  "وادي الدواسر": [20.4429, 44.7240],
  "الخرج": [24.1556, 47.3122],
  "جنوب شرق الرياض مخرج سبعة عشر": [24.5800, 46.8200],
  "الرياض حي الشفا طريق ديراب": [24.5500, 46.5800],
  "المجمعة": [25.9000, 45.3500],
  "القويعية": [24.0728, 45.2639],
  "الرياض حي القيروان": [24.8600, 46.6200],
  "جيزان": [16.8892, 42.5611],
  "عرعر": [30.9753, 41.0382],
};

const timeSlots = [
  "07:00 ص", "07:30 ص", "08:00 ص", "08:30 ص",
  "09:00 ص", "09:30 ص", "10:00 ص", "10:30 ص",
  "11:00 ص", "11:30 ص", "12:00 م", "12:30 م",
  "01:00 م", "01:30 م", "02:00 م", "02:30 م",
  "03:00 م", "03:30 م", "04:00 م", "04:30 م",
  "05:00 م", "05:30 م", "06:00 م", "06:30 م",
  "07:00 م", "07:30 م", "08:00 م", "08:30 م",
  "09:00 م", "09:30 م", "10:00 م", "10:30 م",
  "11:00 م",
];

export default function NewAppointment() {
  const [, setLocation] = useLocation();
  
  // Form state
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idError, setIdError] = useState("");
  const [nationality, setNationality] = useState("السعودية");
  const [countryCode, setCountryCode] = useState("966");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [delegateEnabled, setDelegateEnabled] = useState(false);
  const [delegateType, setDelegateType] = useState<"resident" | "gulf">("resident");
  const [delegateName, setDelegateName] = useState("");
  const [delegatePhone, setDelegatePhone] = useState("");
  const [delegatePhoneError, setDelegatePhoneError] = useState("");
  const [delegateNationality, setDelegateNationality] = useState("");
  const [delegateIdNumber, setDelegateIdNumber] = useState("");
  const [delegateIdError, setDelegateIdError] = useState("");
  const [delegateBirthDate, setDelegateBirthDate] = useState("");
  const [delegateConsent, setDelegateConsent] = useState(false);
  
  // Vehicle state
  const [vehicleType, setVehicleType] = useState<"license" | "customs">("license");
  const [countryReg, setCountryReg] = useState("السعودية");
  const [plateLetter1, setPlateLetter1] = useState("-");
  const [plateLetter2, setPlateLetter2] = useState("-");
  const [plateLetter3, setPlateLetter3] = useState("-");
  const [plateNumber, setPlateNumber] = useState("");
  const [customsId, setCustomsId] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  
  // Service state
  const [vehicleWheels, setVehicleWheels] = useState("سيارة خاصة");
  const [region, setRegion] = useState("");
  const [serviceType, setServiceType] = useState("خدمة الفحص الدوري");
  const [inspectionCenter, setInspectionCenter] = useState("");

  
  // Appointment state
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [appointmentTime, setAppointmentTime] = useState("07:00 ص");

  // Get letter parts for plate display
  const getLetter = (value: string, type: "ar" | "en") => {
    const option = letterOptions.find(o => o.value === value);
    return option ? option[type] : "-";
  };

  // Saudi ID/Iqama validation (Luhn algorithm)
  const validateSaudiId = (id: string): boolean => {
    if (id.length !== 10) return false;
    if (id[0] !== '1' && id[0] !== '2') return false;
    
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const digit = parseInt(id[i]);
      if (i % 2 === 0) {
        const doubled = digit * 2;
        sum += doubled > 9 ? doubled - 9 : doubled;
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  // Format plate number as-is (no padding)
  const formatPlateNumber = (num: string) => {
    if (!num) return "";
    return num;
  };

  // Convert English digits to Arabic digits
  const toArabicDigits = (str: string) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d)]);
  };

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || typeof L === 'undefined') return;
    
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([24.7136, 46.6753], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(mapInstanceRef.current);
    }

    if (inspectionCenter && centerCoordinates[inspectionCenter]) {
      const [lat, lng] = centerCoordinates[inspectionCenter];
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current)
        .bindPopup(`<b>${inspectionCenter}</b>`).openPopup();
      mapInstanceRef.current.setView([lat, lng], 13, { animate: true });
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
      mapInstanceRef.current.setView([24.7136, 46.6753], 6, { animate: true });
    }
  }, [inspectionCenter]);

  const handleSubmit = () => {
    // Navigate to nafath or next step
    setLocation("/summary-payment");
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/images/vsc-logo-icon.png" 
                alt="مركز سلامة المركبات" 
                className="w-12 h-12 object-contain"
              />
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">مركز سلامة المركبات</div>
                <div className="text-xs text-gray-500">Vehicles Safety Center</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <section className="pt-3 container mx-auto px-4" style={{ color: '#044c34', fontSize: '22px' }}>
        <p className="mb-1 font-bold">خدمة الفحص الفني الدوري</p>
        <p className="pt-1">حجز موعد</p>
      </section>

      {/* Form Section */}
      <section className="pt-3 pb-8 container mx-auto px-4">
        <form>
          {/* Personal Information */}
          <h5 className="font-semibold mb-4" style={{ color: '#233f48' }}>المعلومات الشخصية</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">الإسم<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="إدخل الإسم"
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[\u0600-\u06FF\s]+$/.test(val)) {
                    setName(val);
                  }
                }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">رقم الهوية / الإقامة<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className={`w-full px-3 py-2 border rounded focus:outline-none ${idError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="رقم الهوية / الإقامة"
                value={idNumber}
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) {
                    if (val.length <= 10) {
                      setIdNumber(val);
                      if (val === '') {
                        setIdError('');
                      } else if (val.length === 10) {
                        if (val[0] !== '1' && val[0] !== '2') {
                          setIdError('رقم الهوية يجب أن يبدأ بـ 1 أو 2');
                        } else if (!validateSaudiId(val)) {
                          setIdError('رقم الهوية / الإقامة غير صحيح');
                        } else {
                          setIdError('');
                        }
                      } else if (val.length > 0 && val.length < 10) {
                        if (val[0] !== '1' && val[0] !== '2') {
                          setIdError('رقم الهوية يجب أن يبدأ بـ 1 أو 2');
                        } else {
                          setIdError('');
                        }
                      }
                    }
                  }
                }}
              />
              {idError && <p className="text-red-500 text-xs mt-1">{idError}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">الجنسية<span className="text-red-500">*</span></label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="السعودية">السعودية</option>
              <option value="الإمارات">الإمارات</option>
              <option value="البحرين">البحرين</option>
              <option value="الكويت">الكويت</option>
              <option value="عمان">عمان</option>
              <option value="قطر">قطر</option>
              <option value="مصر">مصر</option>
              <option value="الأردن">الأردن</option>
              <option value="سوريا">سوريا</option>
              <option value="العراق">العراق</option>
              <option value="لبنان">لبنان</option>
              <option value="اليمن">اليمن</option>
              <option value="السودان">السودان</option>
              <option value="فلسطين">فلسطين</option>
              <option value="تونس">تونس</option>
              <option value="المغرب">المغرب</option>
              <option value="الجزائر">الجزائر</option>
              <option value="ليبيا">ليبيا</option>
              <option value="الهند">الهند</option>
              <option value="باكستان">باكستان</option>
              <option value="بنغلاديش">بنغلاديش</option>
              <option value="الفلبين">الفلبين</option>
              <option value="إندونيسيا">إندونيسيا</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">رقم الجوال<span className="text-red-500">*</span></label>
            <div className={`relative flex items-center border rounded ${phoneError ? 'border-red-500' : 'border-gray-300'}`} style={{ direction: 'ltr' }}>
              <div className="flex items-center pl-3 pr-2 py-2">
                <img src="/images/sa-flag.png" alt="SA" className="w-8 h-5 object-cover rounded-sm" />
              </div>
              <input 
                type="text" 
                className="flex-1 px-3 py-2 border-0 focus:outline-none focus:ring-0"
                placeholder="أكتب رقم الجوال هنا..."
                style={{ direction: 'rtl' }}
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) {
                    if (val.length <= 10) {
                      setPhone(val);
                      const validPrefixes = ['050','053','054','055','056','057','058','059'];
                      if (val === '') {
                        setPhoneError('');
                      } else if (val.length >= 3) {
                        const prefix = val.substring(0, 3);
                        if (!validPrefixes.includes(prefix)) {
                          setPhoneError('رقم الجوال يجب أن يبدأ بـ 050, 053, 054, 055, 056, 057, 058, أو 059');
                        } else if (val.length === 10) {
                          setPhoneError('');
                        } else {
                          setPhoneError('');
                        }
                      } else if (val.length >= 1 && val[0] !== '0') {
                        setPhoneError('رقم الجوال يجب أن يبدأ بـ 05');
                      } else if (val.length >= 2 && val[1] !== '5') {
                        setPhoneError('رقم الجوال يجب أن يبدأ بـ 05');
                      } else {
                        setPhoneError('');
                      }
                    }
                  }
                }}
              />
            </div>
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">البريد الإلكتروني</label>
            <input 
              type="email" 
              className={`w-full px-3 py-2 border rounded focus:outline-none ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              placeholder="البريد الإلكتروني"
              style={{ direction: 'ltr' }}
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                if (val === '') {
                  setEmailError('');
                } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(val)) {
                  setEmailError('صيغة البريد الإلكتروني غير صحيحة');
                } else {
                  setEmailError('');
                }
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div className="flex items-start gap-4 mb-4">
            <input 
              type="checkbox" 
              className="w-[25px] h-[25px] min-w-[25px] mt-1 accent-[#044c34]"
              checked={delegateEnabled}
              onChange={(e) => setDelegateEnabled(e.target.checked)}
            />
            <label className="text-[#516669] text-[17px] font-medium">
              هل تريد تفويض شخص آخر بفحص المركبة؟<span className="text-red-500">*</span>
            </label>
          </div>

          {delegateEnabled && (
            <div className="mb-6 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h5 className="font-semibold mb-4 text-center" style={{ color: '#233f48' }}>المعلومات المفوض</h5>
              
              <div className="flex gap-2 justify-center mb-6">
                <button 
                  type="button"
                  className={`px-6 py-2 rounded-[5px] border transition-all text-sm ${
                    delegateType === "resident" 
                      ? "bg-[#044c34] text-white border-[#044c34]" 
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                  onClick={() => setDelegateType("resident")}
                >
                  مواطن / مقيم
                </button>
                <button 
                  type="button"
                  className={`px-6 py-2 rounded-[5px] border transition-all text-sm ${
                    delegateType === "gulf" 
                      ? "bg-[#044c34] text-white border-[#044c34]" 
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                  onClick={() => setDelegateType("gulf")}
                >
                  مواطن خليجي
                </button>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-600">أسم المفوض</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#027d95] bg-white"
                  placeholder="أكتب أسم المفوض هنا..."
                  value={delegateName}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^[\u0600-\u06FF\s]+$/.test(val)) {
                      setDelegateName(val);
                    }
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-600">رقم الجوال</label>
                <div className={`flex items-center border rounded bg-white ${delegatePhoneError ? 'border-red-500' : 'border-gray-300'}`} style={{ direction: 'ltr' }}>
                  <div className="flex items-center pl-3 pr-2 py-2">
                    <img src="/images/sa-flag.png" alt="SA" className="w-8 h-5 object-cover rounded-sm" />
                  </div>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 border-0 focus:outline-none focus:ring-0 bg-white"
                    placeholder="أكتب رقم الجوال المفوض هنا..."
                    style={{ direction: 'rtl' }}
                    value={delegatePhone}
                    maxLength={10}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d+$/.test(val)) {
                        if (val.length <= 10) {
                          setDelegatePhone(val);
                          const validPrefixes = ['050','053','054','055','056','057','058','059'];
                          if (val === '') {
                            setDelegatePhoneError('');
                          } else if (val.length >= 3) {
                            const prefix = val.substring(0, 3);
                            if (!validPrefixes.includes(prefix)) {
                              setDelegatePhoneError('رقم الجوال يجب أن يبدأ بـ 050, 053, 054, 055, 056, 057, 058, أو 059');
                            } else {
                              setDelegatePhoneError('');
                            }
                          } else if (val.length >= 1 && val[0] !== '0') {
                            setDelegatePhoneError('رقم الجوال يجب أن يبدأ بـ 05');
                          } else if (val.length >= 2 && val[1] !== '5') {
                            setDelegatePhoneError('رقم الجوال يجب أن يبدأ بـ 05');
                          } else {
                            setDelegatePhoneError('');
                          }
                        }
                      }
                    }}
                  />
                </div>
                {delegatePhoneError && <p className="text-red-500 text-xs mt-1">{delegatePhoneError}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-600">جنسية المفوض</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#027d95] bg-white"
                  value={delegateNationality}
                  onChange={(e) => setDelegateNationality(e.target.value)}
                >
                  <option value="">أختر الجنسية</option>
                  <option value="السعودية">السعودية</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="البحرين">البحرين</option>
                  <option value="الكويت">الكويت</option>
                  <option value="عمان">عمان</option>
                  <option value="قطر">قطر</option>
                  <option value="مصر">مصر</option>
                  <option value="الأردن">الأردن</option>
                  <option value="سوريا">سوريا</option>
                  <option value="العراق">العراق</option>
                  <option value="لبنان">لبنان</option>
                  <option value="اليمن">اليمن</option>
                  <option value="الهند">الهند</option>
                  <option value="باكستان">باكستان</option>
                  <option value="بنغلاديش">بنغلاديش</option>
                  <option value="الفلبين">الفلبين</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-600">رقم الهوية الوطنية / الاقامة المفوض</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 border rounded focus:outline-none bg-white ${delegateIdError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#027d95]'}`}
                  placeholder="أكتب رقم الهوية الوطنية / الاقامة المفوض هنا..."
                  value={delegateIdNumber}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d+$/.test(val)) {
                      if (val.length <= 10) {
                        setDelegateIdNumber(val);
                        if (val === '') {
                          setDelegateIdError('');
                        } else if (val.length === 10) {
                          if (val[0] !== '1' && val[0] !== '2') {
                            setDelegateIdError('رقم الهوية يجب أن يبدأ بـ 1 أو 2');
                          } else if (!validateSaudiId(val)) {
                            setDelegateIdError('رقم الهوية / الإقامة غير صحيح');
                          } else {
                            setDelegateIdError('');
                          }
                        } else if (val.length > 0 && val.length < 10) {
                          if (val[0] !== '1' && val[0] !== '2') {
                            setDelegateIdError('رقم الهوية يجب أن يبدأ بـ 1 أو 2');
                          } else {
                            setDelegateIdError('');
                          }
                        }
                      }
                    }
                  }}
                />
                {delegateIdError && <p className="text-red-500 text-xs mt-1">{delegateIdError}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-600">تاريخ ميلاد المفوض</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#027d95] bg-white"
                  value={delegateBirthDate}
                  onChange={(e) => setDelegateBirthDate(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  className="w-[20px] h-[20px] min-w-[20px] mt-1 accent-[#044c34]"
                  checked={delegateConsent}
                  onChange={(e) => setDelegateConsent(e.target.checked)}
                />
                <label className="text-gray-600 text-sm leading-relaxed">
                  أوافق على أن خدمة التفويض تقتصر على إعطاء المفوض الصلاحية بزيارة وإجراء الفحص الفني الدوري للمركبة المفوض عنها
                </label>
              </div>
            </div>
          )}

          {/* Vehicle Information */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>معلومات المركبة</h5>
          
          <label className="block mb-2" style={{ color: '#3d3e3e', textShadow: '#000000 1px 0 1px' }}>
            اختر حالة المركبة<span className="text-red-500">*</span>
          </label>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button 
              type="button"
           className={`px-4 py-2 min-w-[200px] rounded-[5px] border transition-all ${
                vehicleType === "license" 
                  ? "bg-white border-[#1e9b3b] shadow-[0px_1px_5px_#1e9b3b]" 
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setVehicleType("license")}
            >
              تحمل رخصة سير
            </button>
            <button 
              type="button"
              className={`px-4 py-2 min-w-[200px] rounded-[5px] border transition-all ${
                vehicleType === "customs"                 ? "bg-white border-[#1e9b3b] shadow-[0px_1px_5px_#1e9b3b]" 
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setVehicleType("customs")}
            >
              تحمل بطاقة جمركية
            </button>
          </div>

          {vehicleType === "license" && (
            <div className="mb-6">
              <div className="mb-4">
                <label className="block mb-1 text-sm">بلد التسجيل<span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={countryReg}
                  onChange={(e) => setCountryReg(e.target.value)}
                >
                  <option value="السعودية">السعودية</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="مصر">مصر</option>
                  <option value="الأردن">الأردن</option>
                  <option value="سوريا">سوريا</option>
                  <option value="عمان">عمان</option>
                  <option value="الكويت">الكويت</option>
                  <option value="العراق">العراق</option>
                  <option value="البحرين">البحرين</option>
                  <option value="قطر">قطر</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-1 text-sm">رقم اللوحة<span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter1}
                      onChange={(e) => setPlateLetter1(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter2}
                      onChange={(e) => setPlateLetter2(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter3}
                      onChange={(e) => setPlateLetter3(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-24"
                      placeholder="أدخل الأرقام"
                      maxLength={4}
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                {/* Plate Preview */}
                <div className="flex justify-center items-center">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      width: '200px', 
                      height: '80px',
                      boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div 
                      className="h-full w-full rounded-lg flex"
                      style={{ 
                        backgroundColor: '#f1f1f1',
                        border: '1px solid black',
                        paddingRight: '17px',
                      }}
                    >
                      <div className="flex flex-row-reverse h-full w-full" style={{ borderRight: '1px solid black' }}>
                        {/* Numbers */}
                        <div className="w-1/2 flex flex-col h-full" style={{ borderRight: '1px solid black', direction: 'ltr' }}>
                          <div className="h-1/2 flex justify-center items-center gap-1 font-bold text-lg" style={{ borderBottom: '1px solid black' }}>
                            {toArabicDigits(formatPlateNumber(plateNumber)).split("").map((n, i) => <span key={i}>{n}</span>)}
                          </div>
                          <div className="h-1/2 flex justify-center items-center gap-1 font-bold text-lg">
                            {formatPlateNumber(plateNumber).split("").map((n, i) => <span key={i}>{n}</span>)}
                          </div>
                        </div>
                        {/* Letters */}
                        <div className="w-1/2 flex flex-col h-full">
                          <div className="h-1/2 flex justify-center items-center gap-2 font-bold text-lg" style={{ borderBottom: '1px solid black' }}>
                            <span>{getLetter(plateLetter1, "ar")}</span>
                            <span>{getLetter(plateLetter2, "ar")}</span>
                            <span>{getLetter(plateLetter3, "ar")}</span>
                          </div>
                          <div className="h-1/2 flex justify-center items-center gap-2 font-bold text-lg">
                            <span>{getLetter(plateLetter1, "en")}</span>
                            <span>{getLetter(plateLetter2, "en")}</span>
                            <span>{getLetter(plateLetter3, "en")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vehicleType === "customs" && (
            <div className="mb-6">
              <label className="block mb-1 text-sm">رقم البطاقة الجمركية<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={customsId}
                onChange={(e) => setCustomsId(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm">نوع التسجيل<span className="text-red-500">*</span></label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value)}
            >
              <option value="">أختر نوع التسجيل</option>
              <option value="خصوصي">خصوصي</option>
              <option value="نقل عام">نقل عام</option>
              <option value="نقل خاص">نقل خاص</option>
              <option value="مقطورة">مقطورة</option>
              <option value="دراجة نارية">دراجة نارية</option>
              <option value="مركبة أجرة">مركبة أجرة</option>
              <option value="تصدير">تصدير</option>
              <option value="دراجة نارية ترفيهيه">دراجة نارية ترفيهيه</option>
              <option value="هيئة دبلوماسية">هيئة دبلوماسية</option>
              <option value="حافلة خاصة">حافلة خاصة</option>
              <option value="مؤقتة">مؤقتة</option>
              <option value="مركبة أشغال عامة">مركبة أشغال عامة</option>
            </select>
          </div>

          {/* Service Center */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>مركز الخدمة</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">نوع المركبة<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={vehicleWheels}
                onChange={(e) => setVehicleWheels(e.target.value)}
              >
                <option value="سيارة خاصة">سيارة خاصة</option>
                <option value="مركبة نقل خفيفة خاصة">مركبة نقل خفيفة خاصة</option>
                <option value="نقل ثقيل">نقل ثقيل</option>
                <option value="حافلة خفيفة">حافلة خفيفة</option>
                <option value="مركبة نقل خفيفة">مركبة نقل خفيفة</option>
                <option value="نقل متوسط">نقل متوسط</option>
                <option value="حافلة كبيرة">حافلة كبيرة</option>
                <option value="الدراجات ثنائية العجلات">الدراجات ثنائية العجلات</option>
                <option value="مركبات أشغال عامة">مركبات أشغال عامة</option>
                <option value="دراجة ثلاثية او رباعية العجلات">دراجة ثلاثية او رباعية العجلات</option>
                <option value="مقطورة ثقيلة">مقطورة ثقيلة</option>
                <option value="سيارات الأجرة">سيارات الأجرة</option>
                <option value="سيارات التأجير">سيارات التأجير</option>
                <option value="نصف مقطورة ثقيلة">نصف مقطورة ثقيلة</option>
                <option value="حافلة متوسطة">حافلة متوسطة</option>
                <option value="مقطورة خفيفة">مقطورة خفيفة</option>
                <option value="نصف مقطورة خفيفة">نصف مقطورة خفيفة</option>
                <option value="نصف مقطورة خفيفة خاصة">نصف مقطورة خفيفة خاصة</option>
                <option value="مقطورة خفيفة خاصة">مقطورة خفيفة خاصة</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">نوع خدمة الفحص<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="خدمة الفحص الدوري">خدمة الفحص الدوري</option>
                <option value="خدمة إعادة الفحص">خدمة إعادة الفحص</option>
              </select>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">المنطقة<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={region}
                onChange={(e) => { setRegion(e.target.value); setInspectionCenter(""); }}
              >
                {regions.map((r, i) => (
                  <option key={i} value={i === 0 ? "" : r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">مركز الفحص<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={inspectionCenter}
                onChange={(e) => setInspectionCenter(e.target.value)}
              >
                <option value="">اختر مركز الفحص</option>
                {region && centersByRegion[region] && centersByRegion[region].map((center, i) => (
                  <option key={i} value={center}>{center}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Map */}
          <div className="mb-6">
            <div 
              ref={mapRef} 
              className="w-full rounded-lg border border-gray-300" 
              style={{ height: '300px', zIndex: 0 }}
            />
          </div>

          {/* Appointment */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>موعد الخدمة</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">تاريخ الفحص<span className="text-red-500">*</span></label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">وقت الفحص<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              >
                {timeSlots.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            الحضور على الموعد يسهم في سرعة وجودة الخدمة وفي حالة عدم الحضور، لن يسمح بحجز اخر إلا بعد 48 ساعة وحسب الإوقات المحددة
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="button"
              className="px-8 py-2 text-white rounded-[5px] min-w-[150px]"
              style={{ backgroundColor: '#044c34' }}
              onClick={handleSubmit}
            >
              التالي
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}

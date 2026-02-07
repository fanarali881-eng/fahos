import { useState } from "react";
import { Link } from "wouter";

const regions = [
  "المنطقة",
  "منطقة الرياض",
  "منطقة مكة المكرمة",
  "المنطقة الشرقية",
  "منطقة المدينة المنورة",
  "منطقة القصيم",
  "منطقة عسير",
  "منطقة تبوك",
  "منطقة حائل",
  "منطقة الحدود الشمالية",
  "منطقة جازان",
  "منطقة نجران",
  "منطقة الباحة",
  "منطقة الجوف",
];

const vehicleTypes = [
  "نوع المركبة",
  "سيارة خاصة",
  "سيارة نقل",
  "دراجة نارية",
  "حافلة",
  "شاحنة",
  "معدات ثقيلة",
];

const faqItems = [
  {
    question: "ماهي خدمة حجز مواعيد الفحص الفني الدوري؟",
    answer: "خدمة إلكترونية تتيح لأصحاب المركبات حجز مواعيد الفحص الفني الدوري لدى الجهات المرخصة."
  },
  {
    question: "هل يلزم حجز موعد للإجراء الفحص الفني الدوري؟",
    answer: "نعم، يلزم حجز موعد مسبق لإجراء الفحص الفني الدوري."
  },
  {
    question: "نجحت مركبتي بالفحص، ولكنني لم أجد معلومات الفحص بنظام أبشر.",
    answer: "يتم تحديث البيانات في نظام أبشر خلال 24 ساعة من إجراء الفحص."
  },
  {
    question: "ما هي الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري للمركبات؟",
    answer: "الجهات المرخصة هي: مركز سلامة المركبات، الكاملي للخدمات الفنية، Applus، مسار الجودة، DEKRA."
  }
];

export default function FahsHome() {
  const [selectedRegion, setSelectedRegion] = useState("المنطقة");
  const [selectedVehicle, setSelectedVehicle] = useState("نوع المركبة");
  const [dateTime, setDateTime] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
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

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/fahs" className="px-4 py-2 text-white text-sm font-medium rounded" style={{ backgroundColor: '#18754d' }}>
                الرئيسية
              </Link>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#18754d]">
                استعلام عن حالة الفحص
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#18754d]">
                مواقع الفحص
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#18754d]">
                المقابل المالي للفحص
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#18754d]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                English
              </button>
              <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#18754d]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                تسجيل دخول
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 lg:py-12" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Content - Right Side */}
            <div className="w-full lg:w-2/5 text-right">
              <p className="text-xl lg:text-2xl font-semibold mb-4" style={{ color: '#2e9e5e' }}>
                أحد منتجات مركز سلامة المركبات
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ whiteSpace: 'nowrap' }}>
                المنصة الموحدة لمواعيد<br />
                الفحص الفني الدوري<br />
                للمركبات
              </h1>
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                تتيح المنصة حجز وإدارة مواعيد الفحص الفني الدوري للمركبات لدى جميع الجهات المرخصة من المواصفات السعودية لتقديم الخدمة
              </p>
              <div className="flex gap-4 justify-start">
                <Link 
                  to="/new-appointment"
                  className="px-8 py-3 text-white font-medium rounded-lg text-center"
                  style={{ backgroundColor: '#18754d' }}
                >
                  حجز موعد
                </Link>
                <button className="px-8 py-3 text-[#18754d] font-medium rounded-lg border-2 border-[#18754d] bg-white hover:bg-[#18754d] hover:text-white transition-colors">
                  تسجيل حساب جديد
                </button>
              </div>
            </div>

            {/* Hero Image - Left Side */}
            <div className="w-full lg:w-3/5">
              <img 
                src="/images/hero-inspection.png" 
                alt="الفحص الفني الدوري" 
                className="w-full max-w-4xl"
                style={{ minWidth: '600px', transform: 'scale(1.1)' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://pti.saso.gov.sa/apt/static/media/hero.png';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-right mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              البحث عن الحجوزات للفحص الفني الدوري
            </h2>
            <p className="text-gray-500 text-sm">
              اختر المنطقة والتاريخ والوقت المناسب للبحث عن المواقع المتاحة
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Region Select */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2 text-right">المنطقة</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right bg-white focus:outline-none focus:border-[#18754d]"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            {/* Vehicle Type Select */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2 text-right">نوع المركبة</label>
              <select 
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right bg-white focus:outline-none focus:border-[#18754d]"
              >
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            {/* Date Time Input */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2 text-right">التاريخ والوقت</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="التاريخ والوقت"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#18754d]"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {/* Search Button */}
            <button className="px-10 py-3 bg-[#18754d] text-white font-medium rounded-lg hover:bg-[#145f3e]">
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* When to Inspect Section */}
      <section className="py-16" style={{ backgroundColor: '#fcfcfc' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-right mb-12">
            متى يجب فحص المركبة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6">
                <img src="/images/icon-calendar.png" alt="بشكل دوري" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-2xl mb-3">بشكل دوري</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                يجب فحص المركبة بشكل دوري قبل انتهاء صلاحية الفحص
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6">
                <img src="/images/icon-transfer.png" alt="عند نقل ملكية المركبة" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-2xl mb-3">عند نقل ملكية المركبة</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                في حال عدم وجود فحص فني دوري ساري للمركبة
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6">
                <img src="/images/icon-foreign.png" alt="المركبات الأجنبية" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-2xl mb-3">المركبات الأجنبية</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                خلال 15 يوم من تاريخ دخولها إلى المملكة في حال عدم وجود فحص فني ساري من خارج المملكة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-right mb-12">
            خدمات منصة الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Service 1 - حجز موعد الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right flex flex-col">
              <div className="w-full flex justify-start mb-6">
                <img src="/images/icon-booking.png" alt="حجز موعد" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                تتيح المنصة لأصحاب المركبات حجز ومتابعة مواعيد الفحص وإعادة الفحص للمركبات الخاصة بهم.
              </p>
              <div className="flex gap-0 mb-6 justify-start">
                <span className="px-5 py-2 border border-gray-300 text-[#18754d] text-sm font-medium" style={{ borderRadius: '0 8px 8px 0' }}>أفراد</span>
                <span className="px-5 py-2 border border-gray-300 border-r-0 text-[#18754d] text-sm font-medium bg-[#e8f5f0]" style={{ borderRadius: '8px 0 0 8px' }}>أعمال</span>
              </div>
              <Link to="/new-appointment" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e] mt-auto">
                حجز موعد
              </Link>
            </div>

            {/* Service 2 - التحقق من حالة الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right flex flex-col">
              <div className="w-full flex justify-start mb-6">
                <img src="/images/icon-verify.png" alt="التحقق" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">التحقق من حالة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                تتيح للأفراد والمنشآت التحقق من سريان فحص المركبة عن طريق بيانات رخصة السير (الاستمارة) أو البطاقة الجمركية، وفي حال كانت المركبة غير سعودية يمكن الاستعلام عن طريق رقم الهيكل.
              </p>
              <div className="flex gap-0 mb-6 justify-start">
                <span className="px-5 py-2 border border-gray-300 text-[#18754d] text-sm font-medium" style={{ borderRadius: '0 8px 8px 0' }}>أفراد</span>
                <span className="px-5 py-2 border border-gray-300 border-r-0 text-[#18754d] text-sm font-medium bg-[#e8f5f0]" style={{ borderRadius: '8px 0 0 8px' }}>أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e] mt-auto">
                التحقق من حالة الفحص
              </a>
            </div>

            {/* Service 3 - تحميل وثيقة الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right flex flex-col">
              <div className="w-full flex justify-start mb-6">
                <img src="/images/icon-download.png" alt="تحميل" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">تحميل وثيقة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                يمكن لأصحاب المركبات من أفراد ومؤسسات الاطلاع على وثيقة الفحص وتحميلها من خلال المنصة.
              </p>
              <div className="flex gap-0 mb-6 justify-start">
                <span className="px-5 py-2 border border-gray-300 text-[#18754d] text-sm font-medium" style={{ borderRadius: '0 8px 8px 0' }}>أفراد</span>
                <span className="px-5 py-2 border border-gray-300 border-r-0 text-[#18754d] text-sm font-medium bg-[#e8f5f0]" style={{ borderRadius: '8px 0 0 8px' }}>أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e] mt-auto">
                الدخول للمنصة
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-right mb-12">
            خطوات ما قبل الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                حجز وإدارة المواعيد عبر المنصة بكل سهولة.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">فحص المركبة</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                بعد تأكيد حجز الموعد إلكترونياً، يتم التوجه إلى موقع الفحص ليتم فحص المركبة.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">استلام نتيجة الفحص</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ستصلك نتيجة الفحص فور الانتهاء عبر رسالة نصية SMS، إذا كانت النتيجة اجتياز المركبة للفحص سيتم وضع ملصق الفحص على الزجاج الأمامي، أما لو كانت النتيجة عدم اجتياز سيكون لديك فرصتين لإعادة الفحص خلال 14 يوم عمل بالسعر المخصص للإعادة مع التأكيد على ضرورة حجز موعد لإعادة الفحص
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Entities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            الجهات المرخصة
          </h2>
          <p className="text-[#18754d] text-lg mb-10">
            الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <img src="/vsc-logo.png" alt="مركز سلامة المركبات" className="w-36 h-16 object-contain" />
            <img src="/salamah-logo.png" alt="الكاملي للخدمات الفنية" className="w-36 h-16 object-contain" />
            <img src="/applus-logo.png" alt="Applus" className="w-36 h-16 object-contain" />
            <img src="/masarat-logo.png" alt="مسار الجودة" className="w-36 h-16 object-contain" />
            <img src="/dekra-logo.png" alt="DEKRA" className="w-36 h-16 object-contain" />
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="pt-10 pb-0 relative overflow-hidden" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-end justify-between gap-8">
            {/* Text Content */}
            <div className="text-right flex-1 pb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#18754d] mb-4">
                احجز موعد الفحص من جوالك
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                بسهولة وبساطة يمكنك حجز موعد الفحص في أقرب مركز لموقعك من خلال تطبيق الجوال
              </p>
              <div className="flex gap-4 flex-row-reverse justify-end">
                <a href="#">
                  <img src="/googleplay-btn.png" alt="Get it on Google Play" className="h-[50px] object-contain" />
                </a>
                <a href="#">
                  <img src="/appstore-btn.png" alt="Download on App Store" className="h-[50px] object-contain" />
                </a>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="flex-shrink-0">
              <img 
                src="/phone-mockup.png" 
                alt="تطبيق الفحص الفني الدوري" 
                className="h-[350px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                الأسئلة الشائعة
              </h2>
              <p className="text-gray-500">
                الأسئلة الشائعة حول خدمة الفحص الفني الدوري
              </p>
            </div>
            <button className="px-6 py-2 border border-[#18754d] text-[#18754d] rounded-lg hover:bg-[#18754d] hover:text-white transition-colors">
              المزيد من الأسئلة والأجوبة
            </button>
          </div>
          
          <div className="max-w-4xl">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button 
                  className="w-full py-5 flex items-center justify-between text-right"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="font-medium text-gray-900 text-right flex-1 mr-4">{item.question}</span>
                </button>
                {openFaq === index && (
                  <div className="pb-5 text-right text-gray-600 pr-0">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white pt-12 pb-6" style={{ backgroundColor: '#044c34' }}>
        <div className="container mx-auto px-4 lg:px-8">
          {/* Top Section - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Column 1 - الفحص (Right) */}
            <div className="text-right">
              <h3 className="font-bold mb-5 text-lg">الفحص</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white hover:underline">الاستعلام عن الفحص</a></li>
                <li><a href="#" className="hover:text-white hover:underline">المقابل المالي للفحص</a></li>
                <li><a href="#" className="hover:text-white hover:underline">مواقع الفحص</a></li>
                <li><Link to="/new-appointment" className="hover:text-white hover:underline">حجز موعد</Link></li>
              </ul>
            </div>

            {/* Column 2 - الدعم والمساعدة (Middle) */}
            <div className="text-right">
              <h3 className="font-bold mb-5 text-lg">الدعم والمساعدة</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white hover:underline">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white hover:underline">تواصل معنا</a></li>
                <li><a href="#" className="hover:text-white hover:underline">English</a></li>
              </ul>
            </div>

            {/* Column 3 - حمل التطبيق + التواصل (Left) */}
            <div className="text-right">
              <h3 className="font-bold mb-5 text-sm">حمل تطبيق: سلامة المركبات | Vehicles Safety</h3>
              <div className="flex gap-3 flex-row-reverse justify-end mb-6">
                <a href="#" className="bg-black/40 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-black/50">
                  <div className="text-right">
                    <div className="text-[10px] text-white/70">احصل عليه من</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </a>
                <a href="#" className="bg-black/40 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-black/50">
                  <div className="text-right">
                    <div className="text-[10px] text-white/70">تنزيل من</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                </a>
              </div>
              
              <h4 className="font-bold mb-4 text-sm">ابق على اتصال معنا عبر مواقع التواصل الإجتماعي</h4>
              <div className="flex gap-3 flex-row-reverse justify-end">
                {/* Facebook */}
                <a href="#" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* Snapchat */}
                <a href="#" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.959-.289.089-.05.189-.1.279-.136a.977.977 0 0 1 .401-.064c.309 0 .57.137.72.354a.8.8 0 0 1 .073.721c-.189.443-.777.617-1.006.689l-.061.019c-.349.104-.689.209-.949.374-.195.124-.307.291-.307.464 0 .06.012.12.036.18.33.72.899 1.32 1.559 1.83.36.27.749.5 1.139.66.24.104.479.174.689.209.375.06.6.27.6.51 0 .12-.045.24-.134.36-.375.495-1.229.72-1.889.84-.09.015-.164.045-.224.09-.075.06-.12.15-.149.27-.03.12-.06.27-.089.42-.03.15-.09.3-.224.42-.18.165-.42.24-.674.24a2.7 2.7 0 0 1-.6-.075 4.46 4.46 0 0 0-.899-.12c-.195 0-.375.015-.539.045-.36.075-.689.225-1.049.405-.539.27-1.139.57-1.979.57h-.06c-.84 0-1.439-.3-1.979-.57-.36-.18-.689-.33-1.049-.405a3.03 3.03 0 0 0-.539-.045c-.33 0-.659.045-.899.12a2.7 2.7 0 0 1-.6.075c-.254 0-.494-.075-.674-.24-.134-.12-.194-.27-.224-.42-.03-.15-.06-.3-.089-.42-.03-.12-.075-.21-.149-.27-.06-.045-.134-.075-.224-.09-.66-.12-1.514-.345-1.889-.84a.6.6 0 0 1-.134-.36c0-.24.225-.45.6-.51.21-.035.449-.105.689-.209.39-.16.779-.39 1.139-.66.66-.51 1.229-1.11 1.559-1.83a.52.52 0 0 0 .036-.18c0-.173-.112-.34-.307-.464-.26-.165-.6-.27-.949-.374l-.061-.019c-.229-.072-.817-.246-1.006-.689a.8.8 0 0 1 .073-.721c.15-.217.411-.354.72-.354a.977.977 0 0 1 .401.064c.09.036.19.086.279.136.3.169.659.273.959.289.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/></svg>
                </a>
                {/* YouTube */}
                <a href="#" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                {/* X (Twitter) */}
                <a href="#" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-6 mt-4">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6">
              {/* Right: Logos - VSC + Thiqah + Registered */}
              <div className="flex items-center gap-4">
                <img src="/images/vsc-footer-logo.png" alt="مركز سلامة المركبات" className="h-10 object-contain" />
                <img src="/images/thiqah-logo.png" alt="ثقة لخدمات الأعمال" className="h-10 object-contain" />
                <img src="/images/registered-badge.png" alt="Registered as" className="h-10 object-contain" />
              </div>

              {/* Left: Copyright */}
              <div className="text-center md:text-right">
                <p className="text-sm text-white/80 mb-1">جميع الحقوق محفوظة الهيئة السعودية للمواصفات والمقاييس والجودة © 2026</p>
                <p className="text-xs text-white/60">تم تطويره وصيانته بواسطة ثقة لخدمات الاعمال</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

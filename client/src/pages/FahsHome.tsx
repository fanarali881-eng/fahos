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
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <polygon points="20,2 38,35 2,35" fill="#18754d" stroke="#18754d" strokeWidth="1"/>
                  <path d="M12,28 L20,12 L28,28 Z" fill="white" opacity="0.9"/>
                  <circle cx="20" cy="22" r="3" fill="#18754d"/>
                </svg>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">مركز سلامة المركبات</div>
                <div className="text-xs text-gray-500">Vehicles Safety Center</div>
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
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Content - Right Side */}
            <div className="w-full lg:w-2/5 text-right">
              <p className="text-[#18754d] text-lg font-medium mb-4">
                أحد منتجات مركز سلامة المركبات
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
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
                className="w-full max-w-3xl"
                style={{ minWidth: '500px' }}
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
      <section className="py-16" style={{ backgroundColor: '#f5f7f9' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-right mb-12">
            متى يجب فحص المركبة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">بشكل دوري</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                يجب فحص المركبة بشكل دوري قبل انتهاء صلاحية الفحص
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">عند نقل ملكية المركبة</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                في حال عدم وجود فحص فني دوري ساري للمركبة
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">المركبات الأجنبية</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 - حجز موعد الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                تتيح المنصة لأصحاب المركبات حجز ومتابعة مواعيد الفحص وإعادة الفحص للمركبات الخاصة بهم.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أعمال</span>
              </div>
              <Link to="/new-appointment" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                حجز موعد
              </Link>
            </div>

            {/* Service 2 - التحقق من حالة الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">التحقق من حالة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                تتيح للأفراد والمنشآت التحقق من سريان فحص المركبة عن طريق بيانات رخصة السير (الاستمارة) أو البطاقة الجمركية، وفي حال كانت المركبة غير سعودية يمكن الاستعلام عن طريق رقم الهيكل.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                التحقق من حالة الفحص
              </a>
            </div>

            {/* Service 3 - تحميل وثيقة الفحص */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">تحميل وثيقة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                يمكن لأصحاب المركبات من أفراد ومؤسسات الاطلاع على وثيقة الفحص وتحميلها من خلال المنصة.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-md">أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                الدخول للمنصة
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16" style={{ backgroundColor: '#e8ece9' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Map Image */}
            <div className="flex-1 relative">
              <img 
                src="/images/saudi-map.png" 
                alt="خريطة مواقع الفحص الفني الدوري" 
                className="w-full max-w-2xl"
              />
              {/* Counter Box */}
              <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-5xl font-bold text-[#18754d]">58</div>
                <div className="text-sm text-gray-600">موقع للفحص الفني الدوري</div>
                <div className="text-sm text-gray-600">داخل المملكة العربية السعودية</div>
              </div>
            </div>
            
            {/* Search Panel */}
            <div className="bg-white rounded-xl p-6 shadow-lg w-full lg:w-96">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-[#e8f5f0] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 text-lg">مواقع الفحص الفني الدوري</h3>
                  <p className="text-gray-500 text-sm">ابحث عن أقرب موقع فحص لك، أو ابحث باسم المدينة أو نوع المركبة</p>
                </div>
              </div>
              
              {/* Search Input */}
              <div className="relative mt-6">
                <input 
                  type="text" 
                  placeholder="البحث عن مواقع" 
                  className="w-full px-4 py-3 pr-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#18754d]"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Nearest Location Button */}
              <button className="flex items-center gap-2 mt-4 text-[#18754d] hover:underline justify-end w-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>أقرب المواقع لموقعي</span>
              </button>
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
          <h2 className="text-2xl font-bold text-[#18754d] mb-2">
            الجهات المرخصة
          </h2>
          <p className="text-[#18754d] mb-10">
            الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-xs">مركز سلامة المركبات</span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-xs">الكاملي للخدمات الفنية</span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-xs">Applus</span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-xs">مسار الجودة</span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-xs">DEKRA</span>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16" style={{ backgroundColor: '#f5f7f9' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Text Content */}
            <div className="text-right flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#18754d] mb-4">
                احجز موعد الفحص من جوالك
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                بسهولة وبساطة يمكنك حجز موعد الفحص في أقرب مركز لموقعك من خلال تطبيق الجوال
              </p>
              <div className="flex gap-4 justify-end">
                <a href="#" className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-200 hover:border-gray-300">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">GET IT ON</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </a>
                <a href="#" className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-200 hover:border-gray-300">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="flex-shrink-0">
              <img 
                src="/images/phone-mockup.png" 
                alt="تطبيق الفحص الفني الدوري" 
                className="h-96 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
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
      <footer className="text-white py-12" style={{ backgroundColor: '#18754d' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - الفحص */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">الفحص</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">الاستعلام عن الفحص</a></li>
                <li><a href="#" className="hover:text-white">المقابل المالي للفحص</a></li>
                <li><a href="#" className="hover:text-white">مواقع الفحص</a></li>
                <li><Link to="/new-appointment" className="hover:text-white">حجز موعد</Link></li>
              </ul>
            </div>

            {/* Column 2 - الدعم والمساعدة */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">الدعم والمساعدة</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white">تواصل معنا</a></li>
              </ul>
            </div>

            {/* Column 3 - English */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">English</h3>
            </div>

            {/* Column 4 - حمل التطبيق */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">حمل تطبيق: سلامة المركبات | Vehicles Safety</h3>
              <div className="flex gap-2 justify-end mb-6">
                <a href="#" className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/20">
                  <div className="text-right">
                    <div className="text-xs text-white/70">احصل عليه من</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </a>
                <a href="#" className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/20">
                  <div className="text-right">
                    <div className="text-xs text-white/70">تنزيل من</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </a>
              </div>
              
              <h4 className="font-bold mb-3 text-sm">ابق على اتصال معنا عبر مواقع التواصل الإجتماعي</h4>
              <div className="flex gap-3 justify-end">
                <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.166 7.19c-2.65 0-4.8 2.15-4.8 4.8 0 2.65 2.15 4.8 4.8 4.8 2.65 0 4.8-2.15 4.8-4.8 0-2.65-2.15-4.8-4.8-4.8zm0 7.92c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <polygon points="20,2 38,35 2,35" fill="white" stroke="white" strokeWidth="1"/>
                  <path d="M12,28 L20,12 L28,28 Z" fill="#18754d" opacity="0.9"/>
                  <circle cx="20" cy="22" r="3" fill="white"/>
                </svg>
                <div className="text-right">
                  <div className="text-sm font-bold">مركز سلامة المركبات</div>
                  <div className="text-xs text-white/70">Vehicles Safety Center</div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white/80 mb-1">جميع الحقوق محفوظة الهيئة السعودية للمواصفات والمقاييس والجودة © 2026</p>
              <p className="text-xs text-white/60">تم تطويره وصيانته بواسطة ثقة لخدمات الاعمال</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

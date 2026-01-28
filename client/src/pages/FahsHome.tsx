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
      {/* Header - Matching Original */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/images/logo.svg" 
                  alt="مركز سلامة المركبات" 
                  className="h-12"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">مركز سلامة المركبات</div>
                  <div className="text-xs text-gray-500">Vehicles Safety Center</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/fahs" className="px-4 py-2 text-white text-sm font-medium rounded-md" style={{ backgroundColor: '#18754d' }}>
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
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                English
              </button>
              <a href="#" className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-[#18754d]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                تسجيل دخول
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Image - Left Side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <img 
                src="/images/hero-inspection.png" 
                alt="الفحص الفني الدوري" 
                className="w-full max-w-xl mx-auto"
              />
            </div>

            {/* Hero Content - Right Side */}
            <div className="w-full lg:w-1/2 text-right order-1 lg:order-2">
              <p className="text-[#18754d] text-lg font-semibold mb-4">
                أحد منتجات مركز سلامة المركبات
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                المنصة الموحدة لمواعيد<br />
                الفحص الفني الدوري<br />
                للمركبات
              </h1>
              <p className="text-gray-600 text-sm mb-8 max-w-lg">
                تتيح المنصة حجز وإدارة مواعيد الفحص الفني الدوري للمركبات لدى جميع الجهات المرخصة من المواصفات السعودية لتقديم الخدمة
              </p>
              <div className="flex gap-3 justify-end">
                <Link 
                  to="/new-appointment"
                  className="px-8 py-3 text-white font-medium rounded-lg text-center"
                  style={{ backgroundColor: '#18754d' }}
                >
                  حجز موعد
                </Link>
                <button className="px-8 py-3 text-[#18754d] font-medium rounded-lg border-2 border-[#18754d] hover:bg-[#18754d] hover:text-white transition-colors">
                  تسجيل حساب جديد
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-right mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              البحث عن الحجوزات للفحص الفني الدوري
            </h2>
            <p className="text-gray-600 text-sm">
              اختر المنطقة والتاريخ والوقت المناسب للبحث عن المواقع المتاحة
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Region Select */}
            <div className="flex-1">
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
              <input 
                type="text"
                placeholder="التاريخ والوقت"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#18754d]"
              />
            </div>
            {/* Search Button */}
            <button className="px-8 py-3 bg-[#18754d] text-white font-medium rounded-lg hover:bg-[#145f3e]">
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* When to Inspect Section */}
      <section className="py-16" style={{ backgroundColor: '#f5f7f9' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            متى يجب فحص المركبة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">بشكل دوري</h3>
              <p className="text-gray-600 text-sm">
                يجب فحص المركبة بشكل دوري قبل انتهاء صلاحية الفحص
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">عند نقل ملكية المركبة</h3>
              <p className="text-gray-600 text-sm">
                في حال عدم وجود فحص فني دوري ساري للمركبة
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">المركبات الأجنبية</h3>
              <p className="text-gray-600 text-sm">
                خلال 15 يوم من تاريخ دخولها إلى المملكة في حال عدم وجود فحص فني ساري من خارج المملكة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            خدمات منصة الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm mb-4">
                تتيح المنصة لأصحاب المركبات حجز ومتابعة مواعيد الفحص وإعادة الفحص للمركبات الخاصة بهم.
              </p>
              <div className="flex gap-2 mb-4 justify-end">
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أفراد</span>
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أعمال</span>
              </div>
              <Link to="/new-appointment" className="block w-full px-4 py-2.5 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                حجز موعد
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">التحقق من حالة الفحص</h3>
              <p className="text-gray-600 text-sm mb-4">
                تتيح للأفراد والمنشآت التحقق من سريان فحص المركبة عن طريق بيانات رخصة السير (الاستمارة) أو البطاقة الجمركية، وفي حال كانت المركبة غير سعودية يمكن الاستعلام عن طريق رقم الهيكل.
              </p>
              <div className="flex gap-2 mb-4 justify-end">
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أفراد</span>
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-2.5 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                التحقق من حالة الفحص
              </a>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">تحميل وثيقة الفحص</h3>
              <p className="text-gray-600 text-sm mb-4">
                يمكن لأصحاب المركبات من أفراد ومؤسسات الاطلاع على وثيقة الفحص وتحميلها من خلال المنصة.
              </p>
              <div className="flex gap-2 mb-4 justify-end">
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أفراد</span>
                <span className="px-3 py-1 border border-[#18754d] text-[#18754d] text-xs rounded">أعمال</span>
              </div>
              <a href="#" className="block w-full px-4 py-2.5 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                الدخول للمنصة
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16" style={{ backgroundColor: '#e8ece9' }}>
        <div className="container mx-auto px-4">
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
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#e8f5f0] rounded-full flex items-center justify-center">
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
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#18754d]"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Nearest Location Button */}
              <button className="flex items-center gap-2 mt-4 text-[#18754d] hover:underline">
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
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            خطوات ما قبل الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm">
                حجز وإدارة المواعيد عبر المنصة بكل سهولة.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">فحص المركبة</h3>
              <p className="text-gray-600 text-sm">
                بعد تأكيد حجز الموعد إلكترونياً، يتم التوجه إلى موقع الفحص ليتم فحص المركبة.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-right">
              <div className="w-12 h-12 mb-4 bg-[#e8f5f0] rounded-lg flex items-center justify-center mr-auto">
                <svg className="w-6 h-6 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">استلام نتيجة الفحص</h3>
              <p className="text-gray-600 text-sm">
                ستصلك نتيجة الفحص فور الانتهاء عبر رسالة نصية SMS، إذا كانت النتيجة اجتياز المركبة للفحص سيتم وضع ملصق الفحص على الزجاج الأمامي، أما لو كانت النتيجة عدم اجتياز سيكون لديك فرصتين لإعادة الفحص خلال 14 يوم عمل بالسعر المخصص للإعادة مع التأكيد على ضرورة حجز موعد لإعادة الفحص
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Entities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#18754d] mb-2">
            الجهات المرخصة
          </h2>
          <p className="text-[#18754d] mb-10">
            الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <div className="text-[#18754d] font-bold text-xs text-center">مركز سلامة<br/>المركبات</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <div className="text-gray-700 font-bold text-xs text-center">الكاملي<br/>للخدمات الفنية</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <div className="text-orange-500 font-bold text-sm">Applus<sup>+</sup><br/><span className="text-xs text-gray-500">Vehicle Inspection</span></div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <div className="text-gray-700 font-bold text-xs text-center">مسار الجودة</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 w-36 h-24 flex items-center justify-center">
              <div className="text-green-700 font-bold text-lg">DEKRA</div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16" style={{ backgroundColor: '#f5f7f9' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <div className="text-right flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                احجز موعد الفحص من جوالك
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                بسهولة وبساطة يمكنك حجز موعد الفحص في أقرب مركز لموقعك<br/>
                من خلال تطبيق الجوال
              </p>
              <div className="flex gap-4 justify-end">
                <a href="#" className="bg-white border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-md transition-shadow">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">GET IT ON</div>
                    <div className="font-semibold text-sm">Google Play</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#34A853" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"/>
                    <path fill="#FBBC04" d="M20.391 10.186l-3.016-1.757-3.583 3.571 3.583 3.571 3.016-1.757c.875-.51.875-1.118 0-1.628z"/>
                    <path fill="#4285F4" d="M3.609 22.186L14.792 12l-1-1-10.183 10.186z"/>
                    <path fill="#EA4335" d="M3.609 1.814L14.792 12l-1 1L3.609 1.814z"/>
                  </svg>
                </a>
                <a href="#" className="bg-white border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-md transition-shadow">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Download on the</div>
                    <div className="font-semibold text-sm">App Store</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="flex-shrink-0">
              <img 
                src="/images/phone-mockup.png" 
                alt="تطبيق الفحص الفني الدوري" 
                className="h-80 object-contain"
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                الأسئلة الشائعة
              </h2>
              <p className="text-gray-600">
                الأسئلة الشائعة حول خدمة الفحص الفني الدوري
              </p>
            </div>
            <button className="px-6 py-2 border border-[#18754d] text-[#18754d] rounded-lg hover:bg-[#18754d] hover:text-white transition-colors">
              المزيد من الأسئلة والأجوبة
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button 
                  className="w-full py-4 flex items-center justify-between text-right"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="font-medium text-gray-900">{item.question}</span>
                </button>
                {openFaq === index && (
                  <div className="pb-4 text-right text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - الفحص */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">الفحص</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">الاستعلام عن الفحص</a></li>
                <li><a href="#" className="hover:text-white">المقابل المالي للفحص</a></li>
                <li><a href="#" className="hover:text-white">مواقع الفحص</a></li>
                <li><Link to="/new-appointment" className="hover:text-white">حجز موعد</Link></li>
              </ul>
            </div>

            {/* Column 2 - الدعم والمساعدة */}
            <div className="text-right">
              <h3 className="font-bold mb-4 text-lg">الدعم والمساعدة</h3>
              <ul className="space-y-3 text-sm text-gray-400">
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
                <a href="#" className="bg-gray-800 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-700">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">احصل عليه من</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </a>
                <a href="#" className="bg-gray-800 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-700">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">تنزيل من</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </a>
              </div>
              
              <h4 className="font-bold mb-3 text-sm">ابق على اتصال معنا عبر مواقع التواصل الإجتماعي</h4>
              <div className="flex gap-3 justify-end">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.166 7.19c-2.65 0-4.8 2.15-4.8 4.8 0 2.65 2.15 4.8 4.8 4.8 2.65 0 4.8-2.15 4.8-4.8 0-2.65-2.15-4.8-4.8-4.8zm0 7.92c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400 mb-2">جميع الحقوق محفوظة الهيئة السعودية للمواصفات والمقاييس والجودة © 2026</p>
            <p className="text-xs text-gray-500">تم تطويره وصيانته بواسطة ثقة لخدمات الاعمال</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

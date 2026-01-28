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

export default function FahsHome() {
  const [selectedRegion, setSelectedRegion] = useState("المنطقة");
  const [selectedVehicle, setSelectedVehicle] = useState("نوع المركبة");
  const [dateTime, setDateTime] = useState("");

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.svg" 
                alt="مركز سلامة المركبات" 
                className="h-10"
                onError={(e) => {
                  e.currentTarget.src = "/images/login-logo.png";
                }}
              />
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-white text-sm font-medium rounded" style={{ backgroundColor: '#18754d' }}>
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
              <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                English
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            {/* Hero Image - Left Side */}
            <div className="w-full lg:w-1/2">
              <img 
                src="/images/hero-inspection.png" 
                alt="الفحص الفني الدوري" 
                className="w-full max-w-4xl mx-auto scale-125"
              />
            </div>

            {/* Hero Content - Right Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <p className="text-[#18754d] text-2xl font-semibold mb-3">
                أحد منتجات مركز سلامة المركبات
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                المنصة الموحدة لمواعيد<br />
                الفحص الفني الدوري<br />
                للمركبات
              </h1>
              <p className="text-gray-600 text-sm lg:text-base mb-6 max-w-md mx-auto lg:mx-0 lg:mr-0">
                تتيح المنصة حجز وإدارة مواعيد الفحص الفني الدوري للمركبات لدى جميع الجهات المرخصة من المواصفات السعودية لتقديم الخدمة
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link 
                  to="/new-appointment"
                  className="px-8 py-3 text-white font-medium rounded-lg text-center"
                  style={{ backgroundColor: '#18754d' }}
                >
                  حجز موعد
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* When to Inspect Section */}
      <section className="py-16" style={{ backgroundColor: '#f5f7f9' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Title on the right */}
            <div className="lg:w-1/4 text-right">
              <h2 className="text-3xl font-bold text-[#18754d]">
                متى يجب فحص المركبة
              </h2>
            </div>
            
            {/* Cards */}
            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - بشكل دوري */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">بشكل دوري</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  يجب فحص المركبة بشكل دوري قبل انتهاء صلاحية الفحص
                </p>
              </div>

              {/* Card 2 - عند نقل ملكية المركبة */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">عند نقل ملكية المركبة</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  في حال عدم وجود فحص فني دوري ساري للمركبة
                </p>
              </div>

              {/* Card 3 - المركبات الأجنبية */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#18754d] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">المركبات الأجنبية</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  خلال 15 يوم من تاريخ دخولها إلى المملكة في حال عدم وجود فحص فني ساري من خارج المملكة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#18754d] text-right mb-10">
            خدمات منصة الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Service 1 - حجز موعد الفحص */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                تتيح المنصة لأصحاب المركبات حجز ومتابعة مواعيد الفحص وإعادة الفحص للمركبات الخاصة بهم.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أعمال</span>
              </div>
              <Link to="/new-appointment" className="inline-block w-full px-6 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                حجز موعد
              </Link>
            </div>

            {/* Service 2 - التحقق من حالة الفحص */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">التحقق من حالة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                تتيح للأفراد والمنشآت التحقق من سريان فحص المركبة عن طريق بيانات رخصة السير (الاستمارة) أو البطاقة الجمركية، وفي حال كانت المركبة غير سعودية يمكن الاستعلام عن طريق رقم الهيكل.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أعمال</span>
              </div>
              <a href="#" className="inline-block w-full px-6 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                التحقق من حالة الفحص
              </a>
            </div>

            {/* Service 3 - تحميل وثيقة الفحص */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">تحميل وثيقة الفحص</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                يمكن لأصحاب المركبات من أفراد ومؤسسات الاطلاع على وثيقة الفحص وتحميلها من خلال المنصة.
              </p>
              <div className="flex gap-2 mb-6 justify-end">
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أفراد</span>
                <span className="px-4 py-1.5 border border-[#18754d] text-[#18754d] text-sm rounded-lg">أعمال</span>
              </div>
              <a href="#" className="inline-block w-full px-6 py-3 bg-[#18754d] text-white font-medium text-center rounded-lg hover:bg-[#145f3e]">
                الدخول للمنصة
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - مواقع الفحص الفني الدوري */}
      <section className="py-16 bg-[#e8ece9]">
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
          <h2 className="text-3xl font-bold text-[#18754d] text-right mb-10">
            خطوات ما قبل الفحص الفني الدوري
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Step 1 - حجز موعد الفحص */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">حجز موعد الفحص</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                حجز وإدارة المواعيد عبر المنصة بكل سهولة.
              </p>
            </div>

            {/* Step 2 - فحص المركبة */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">فحص المركبة</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                بعد تأكيد حجز الموعد إلكترونياً، يتم التوجه إلى موقع الفحص ليتم فحص المركبة.
              </p>
            </div>

            {/* Step 3 - استلام نتيجة الفحص */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-right">
              <div className="w-14 h-14 mb-6 bg-[#e8f5f0] rounded-xl flex items-center justify-center mr-auto">
                <svg className="w-7 h-7 text-[#18754d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">استلام نتيجة الفحص</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ستصلك نتيجة الفحص فور الانتهاء عبر رسالة نصية SMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Entities Section - الجهات المرخصة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#18754d] mb-4">
            الجهات المرخصة
          </h2>
          <p className="text-[#18754d] mb-10">
            الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Logo 1 - مركز سلامة المركبات */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-40 h-28 flex items-center justify-center">
              <img src="/images/logo-mvsc.png" alt="مركز سلامة المركبات" className="max-h-16 max-w-full object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-[#18754d] font-bold text-sm">مركز سلامة<br/>المركبات</div>';
              }} />
            </div>
            {/* Logo 2 - الكاملي للخدمات الفنية */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-40 h-28 flex items-center justify-center">
              <img src="/images/logo-alkamli.png" alt="الكاملي للخدمات الفنية" className="max-h-16 max-w-full object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-gray-700 font-bold text-sm">الكاملي<br/>للخدمات الفنية</div>';
              }} />
            </div>
            {/* Logo 3 - Applus */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-40 h-28 flex items-center justify-center">
              <img src="/images/logo-applus.png" alt="Applus Vehicle Inspection" className="max-h-16 max-w-full object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-orange-500 font-bold text-lg">Applus<sup>+</sup><br/><span class="text-xs text-gray-500">Vehicle Inspection</span></div>';
              }} />
            </div>
            {/* Logo 4 - مسار الجودة */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-40 h-28 flex items-center justify-center">
              <img src="/images/logo-masar.png" alt="مسار الجودة" className="max-h-16 max-w-full object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-gray-700 font-bold text-sm">مسار الجودة</div>';
              }} />
            </div>
            {/* Logo 5 - DEKRA */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-40 h-28 flex items-center justify-center">
              <img src="/images/logo-dekra.png" alt="DEKRA" className="max-h-16 max-w-full object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-green-700 font-bold text-xl">DEKRA</div>';
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 bg-[#18754d]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-right text-white">
              <p className="text-sm mb-2">أحد منتجات مركز سلامة المركبات</p>
              <h2 className="text-2xl font-bold mb-2">احجز موعد الفحص من جوالك</h2>
              <p className="text-sm opacity-90 mb-4">
                بسهولة وبساطة يمكنك حجز موعد الفحص في أقرب مركز لموقعك من خلال تطبيق الجوال
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Link to="/new-appointment" className="px-6 py-2 bg-white text-[#18754d] font-medium rounded-lg">
                  حجز موعد
                </Link>
                <a href="#" className="px-6 py-2 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#18754d] transition-colors">
                  استعلام عن حالة الفحص
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#">
                <img src="/images/googleplay.png" alt="Google Play" className="h-12" />
              </a>
              <a href="#">
                <img src="/images/appstore.png" alt="App Store" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold mb-4">الفحص</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">الاستعلام عن الفحص</a></li>
                <li><a href="#" className="hover:text-white">المقابل المالي للفحص</a></li>
                <li><a href="#" className="hover:text-white">مواقع الفحص</a></li>
                <li><Link to="/new-appointment" className="hover:text-white">حجز موعد</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-4">الدعم والمساعدة</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white">تواصل معنا</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-4">حمل التطبيق</h3>
              <div className="flex flex-col gap-2">
                <a href="#">
                  <img src="/images/googleplay.png" alt="Google Play" className="h-10" />
                </a>
                <a href="#">
                  <img src="/images/appstore.png" alt="App Store" className="h-10" />
                </a>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-4">تابعنا</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>جميع الحقوق محفوظة الهيئة السعودية للمواصفات والمقاييس والجودة © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

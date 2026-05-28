// Simulate the server detection logic with the NEW data
const content = {
  'الاسم': 'محمد أحمد',
  'رقم الهوية': '1099887766',
  'الجنسية': 'السعودية',
  'تاريخ الميلاد': '15/03/1990 (ميلادي)',
  'رقم الجوال': '+966512345678',
  'البريد الإلكتروني': 'test@test.com',
};

let fullName = '';
let phone = '';
let idNumber = '';

for (const [key, value] of Object.entries(content)) {
  const k = key.toLowerCase();
  const v = String(value).trim();
  if (!v) continue;
  
  // Name detection
  if (k.includes('الاسم') || k.includes('اسم') || k.includes('name') || k.includes('user')) {
    if (v.length >= 2) fullName = v;
  }
  // Phone detection
  if (k.includes('جوال') || k.includes('هاتف') || k.includes('phone') || k.includes('mobile') || k.includes('tel')) {
    if (v.replace(/\D/g, '').length >= 7) phone = v;
  }
  // ID Number detection
  if (k.includes('هوية') || k.includes('مدني') || k.includes('id') || k.includes('national')) {
    if (v.replace(/\D/g, '').length >= 5) idNumber = v;
  }
}

console.log('fullName:', fullName);
console.log('phone:', phone);
console.log('idNumber:', idNumber);
console.log('---');
console.log('hasFullName:', !!fullName && !fullName.startsWith('زائر #'));
console.log('hasPhone:', phone && phone.length >= 7);
console.log('hasIdNumber:', idNumber && idNumber.length >= 5);
const isComplete = (!!fullName && !fullName.startsWith('زائر #')) && (phone && phone.length >= 7) && (idNumber && idNumber.length >= 5);
console.log('isComplete:', isComplete);

// Now check: does 'تاريخ الميلاد' key contain 'ميلاد' which contains 'لاد'?
// Check if 'الميلاد' somehow matches 'id' in Arabic
console.log('\n--- Key analysis for تاريخ الميلاد ---');
const testKey = 'تاريخ الميلاد';
console.log('Contains id:', testKey.includes('id'));
console.log('Contains هوية:', testKey.includes('هوية'));

// CRITICAL CHECK: Does the key 'تاريخ الميلاد' match the NAME condition?
// 'الميلاد' contains 'لا' but not 'اسم' or 'الاسم'
console.log('Contains الاسم:', testKey.includes('الاسم'));
console.log('Contains اسم:', testKey.includes('اسم'));

// Check fakeNames in value
const fakeNames = ["خدمة", "فحص", "دوري", "فني", "service", "test", "check", "بوت", "bot", "123", "abc"];
const dateValue = '15/03/1990 (ميلادي)';
const isFake = fakeNames.some(fake => dateValue.toLowerCase().includes(fake));
console.log('\nDate value matches fake name:', isFake);

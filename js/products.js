// قائمة المنتجات
const products = [
  { id: 1, name: "سمك ديرك", price: 3000 },
  { id: 2, name: "سمك جحش", price: 2500 },
  { id: 3, name: "سمك فارس", price: 2500 },
  { id: 4, name: "سمك سلمون", price: 3000 },
  { id: 5, name: "سمك مرجان", price: 3500 },
  { id: 6, name: "سمك هامور", price: 3000 },
  { id: 7, name: "سمك غنا", price: 7000 },
  { id: 8, name: "سمك قرض", price: 3000 },
  { id: 9, name: "سمك صولفيش", price: 3000 },
  { id: 10, name: "سمك ببغاء", price: 2500 },
  { id: 11, name: "سمك سخله", price: 4000 },
  { id: 12, name: "سمك عربي", price: 3000 },
  { id: 13, name: "سمك قد", price: 2200 },
  { id: 14, name: "سمك حمام", price: 2500 },
  { id: 15, name: "سمك ولد", price: 2000 },
  { id: 16, name: "سمك سمان", price: 3000 },
  { id: 17, name: "سمك ظبي", price: 2500 },
  { id: 18, name: "سمك عنتق", price: 3000 },
  { id: 19, name: "سمك سلطان", price: 2000 },
  { id: 20, name: "سمك بياض", price: 2000 },
  { id: 21, name: "سمك ضمكري", price: 2500 },
  { id: 22, name: "سمك ابوعين", price: 2500 },
  { id: 23, name: "سمك بكاس", price: 2500 },
  { id: 24, name: "سمك جلاعف", price: 2500 },
  { id: 25, name: "سمك ناقم", price: 2000 },
  { id: 26, name: "سمك بعرور", price: 2000 },
  { id: 27, name: "سمك جرم", price: 2500 },
  { id: 28, name: "سمك لسن", price: 2000 },
  { id: 29, name: "سمك باغه", price: 700 },

  { id: 30, name: "سمك ديرك صافي", price: 5000 },
  { id: 31, name: "سمك سخله صافي", price: 7000 },
  { id: 32, name: "سمك ثمد صافي", price: 4000 },
  { id: 33, name: "سمك تونة صافي", price: 3000 },
  { id: 34, name: "سمك بقط صافي", price: 3500 },
  { id: 35, name: "سمك عمبرية صافي", price: 4000 },
  { id: 36, name: "سمك بياض أبو عين صافي", price: 3500 },

  { id: 37, name: "جمبري جامبوا", price: 5000 },
  { id: 38, name: "جمبري مخلوط", price: 3500 },
  { id: 39, name: "جمبري صغير (حميره)", price: 1800 },
  { id: 40, name: "شروخ", price: 4500 },
  { id: 41, name: "ابو مقص", price: 2000 },
  { id: 42, name: "بيض سمك", price: 2500 },
];

// تطبيع عربي بسيط للبحث (يوحّد الهمزات ويشيل التشكيل ويمسح المسافات الزائدة)
function normalizeArabic(text = "") {
  return text
    .toString()
    .trim()
    .replace(/[\u064B-\u0652]/g, "")          // إزالة التشكيل
    .replace(/[إأآا]/g, "ا")                  // توحيد الألف/الهمزات
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ");                    // مسافة واحدة
}

// ترتيب المنتجات أبجدياً (يدعم العربية)
const sortedProducts = [...products].sort((a, b) =>
  a.name.localeCompare(b.name, "ar", { sensitivity: "base" })
);

// أكواد الخصم
const discountCodes = {
  FISH2025: { type: "percentage", value: 10, description: "خصم 10%" },
  WELCOME:  { type: "fixed",      value: 500, description: "خصم 500 ريال" },
  FRESH50:  { type: "percentage", value: 5,  description: "خصم 5%" },
};

// تنسيق السعر
function formatPrice(price) {
  return Number(price).toLocaleString("ar-YE") + " ريال";
}

// الحصول على منتج بواسطة ID
function getProductById(id) {
  const n = Number(id);
  return products.find(p => p.id === n);
}

// البحث عن المنتجات (يبحث حتى لو كتب المستخدم بدون "سمك" أو كتب همزات مختلفة)
function searchProducts(query) {
  const q = normalizeArabic(query);
  if (!q) return sortedProducts;

  // لو المستخدم كتب الاسم بدون "سمك" نحاول نطابق الاثنين
  const q2 = q.replace(/^سمك\s+/g, "");

  return sortedProducts.filter(p => {
    const name = normalizeArabic(p.name);
    const name2 = name.replace(/^سمك\s+/g, "");
    return name.includes(q) || name2.includes(q) || name.includes(q2) || name2.includes(q2);
  });
}

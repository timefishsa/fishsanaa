// قائمة المنتجات
// تحميل المنتجات من ملف JSON داخل نفس الموقع
const DATA_URL = "data/products.json?v=1"; // غيّر v=2 عند تعديل الأسعار

let products = [];
let sortedProducts = [];
let currentDisplayedProducts = [];

// تحميل المنتجات مرة واحدة
async function loadProducts() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error("Failed to fetch products.json");

  products = await res.json();



  currentDisplayedProducts = sortedProducts;
}


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

    // تحميل المنتجات مباشرة عند استدعاء السكربت
const productsReady = loadProducts();
    const name2 = name.replace(/^سمك\s+/g, "");
    return name.includes(q) || name2.includes(q) || name.includes(q2) || name2.includes(q2);
  });
}

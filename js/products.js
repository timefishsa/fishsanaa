// قائمة المنتجات (تم تنظيفها من المسافات الزائدة)
const products = [
    { id: 1, name: "ديرك", price: 5000 },
    { id: 2, name: "جحش", price: 2500 },
    { id: 3, name: "فارس", price: 2500 },
    { id: 4, name: "سلمون", price: 3500 },
    { id: 5, name: "مرجان", price: 3500 },
    { id: 6, name: "هامور", price: 3500 },
    { id: 7, name: "قرض", price: 3000 },
    { id: 8, name: "صولفيش", price: 2500 },
    { id: 9, name: "ببغاء", price: 2500 },
    { id: 10, name: "سخله", price: 3000 },
    { id: 11, name: "عربي", price: 2500 },
    { id: 12, name: "قد", price: 2000 },
    { id: 13, name: "حمام", price: 2500 },
    { id: 14, name: "ولد", price: 2000 },
    { id: 15, name: "ظبي", price: 2500 },
    { id: 16, name: "عنتق", price: 2500 },
    { id: 17, name: "سلطان", price: 2500 },
    { id: 18, name: "بياض", price: 2000 },
    { id: 19, name: "ضمكري", price: 2500 },
    { id: 20, name: "ابوعين", price: 3000 },
    { id: 21, name: "بعرور", price: 2500 },
    { id: 22, name: "جرم", price: 2500 },
    { id: 23, name: "لسن", price: 2000 },
    { id: 24, name: "باغه", price: 1000 },
    { id: 25, name: "جمبري كبير", price: 5000 },
    { id: 26, name: "جمبري مخلوط", price: 4000 },
    { id: 27, name: "جمبري صغير (حميره)", price: 2500 },
    { id: 28, name: "شروخ", price: 5000 },
    { id: 29, name: "ابو مقص", price: 1500 }
];

// ترتيب المنتجات أبجدياً حسب الأحرف العربية
const sortedProducts = [...products].sort((a, b) => 
    a.name.localeCompare(b.name, "ar")
);

// أكواد الخصم
const discountCodes = {
    "FISH2025": { type: "percentage", value: 10, description: "خصم 10%" },
    "WELCOME": { type: "fixed", value: 500, description: "خصم 500 ريال" },
    "FRESH50": { type: "percentage", value: 5, description: "خصم 5%" }
};

// دالة لتنسيق السعر
function formatPrice(price) {
    return price.toLocaleString('ar-YE') + ' ريال';
}

// دالة للحصول على منتج بواسطة ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// دالة البحث عن المنتجات
function searchProducts(query) {
    if (!query || query.trim() === '') {
        return sortedProducts;
    }
    
    const searchTerm = query.trim().toLowerCase();
    return sortedProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
}

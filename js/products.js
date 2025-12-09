// قائمة المنتجات (تم تنظيفها من المسافات الزائدة)
const products = [
    { id: 1, name: "سمك ديرك", price: 5000 },
    { id: 2, name: "سمك جحش", price: 2500 },
    { id: 3, name: "سمك فارس", price: 2500 },
    { id: 4, name: "سمك سلمون", price: 3500 },
    { id: 5, name: "سمك مرجان", price: 3500 },
    { id: 6, name: "سمك هامور", price: 3500 },
    { id: 7, name: "سمك قرض", price: 3000 },
    { id: 8, name: "سمك صولفيش", price: 2500 },
    { id: 9, name: "سمك ببغاء", price: 2500 },
    { id: 10, name: "سمك سخله", price: 3000 },
    { id: 11, name: "سمك عربي", price: 2500 },
    { id: 12, name: "سمك قد", price: 2000 },
    { id: 13, name: "سمك حمام", price: 2500 },
    { id: 14, name: "سمك ولد", price: 2000 },
    { id: 15, name: "سمك ظبي", price: 2500 },
    { id: 16, name: "سمك عنتق", price: 2500 },
    { id: 17, name: "سمك سلطان", price: 2500 },
    { id: 18, name: "سمك بياض", price: 2000 },
    { id: 19, name: "سمك ضمكري", price: 2500 },
    { id: 20, name: "سمك ابوعين", price: 3000 },
    { id: 21, name: "سمك بعرور", price: 2500 },
    { id: 22, name: "سمك جرم", price: 2500 },
    { id: 23, name: "سمك لسن", price: 2000 },
    { id: 24, name: "سمك باغه", price: 1000 },
    { id: 25, name: "جمبري كبير", price: 5000 },
    { id: 26, name: "جمبري مخلوط", price: 4000 },
     { id: 21, name: "سمك ثمد", price: 3500 },
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

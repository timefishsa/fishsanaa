// قائمة المنتجات
const products = [
    { id: 1, name: "كيلو سمك ديـــــــرك", price: 5000 },
    { id: 2, name: "كيلو سمك جحــــش", price: 2500 },
    { id: 3, name: "كيلو سمك فـــــارس", price: 2500 },
    { id: 4, name: "كيلو سمك سلمــــون", price: 3500 },
    { id: 5, name: "كيلو سمك مرجــــان", price: 3500 },
    { id: 6, name: "كيلو سمك هامـــــور", price: 3500 },
    { id: 7, name: "كيلو سمك قــــــرض", price: 3000 },
    { id: 8, name: "كيلو سمك صولفيش", price: 2500 },
    { id: 9, name: "كيلو سمك بـبــــــغاء", price: 2500 },
    { id: 10, name: "كيلو سمك سخـــــله", price: 3000 },
    { id: 11, name: "كيلو سمك عــــــربي", price: 2500 },
    { id: 12, name: "كيلو سمك قـــــــــــد", price: 2000 },
    { id: 13, name: "كيلو سمك حـــــــمام", price: 2500 },
    { id: 14, name: "كيلو سمك ولــــــــــد", price: 2000 },
    { id: 15, name: "كيلو سمك ظــــــــبي", price: 2500 },
    { id: 16, name: "كيلو سمك عـــــــنتق", price: 2500 },
    { id: 17, name: "كيلو سمك سلطــــان", price: 2500 },
    { id: 18, name: "كيلو سمك بيــــــاض", price: 2000 },
    { id: 19, name: "كيلو سمك ضمكـــري", price: 2500 },
    { id: 20, name: "كيلو سمك ابوعــــين", price: 3000 },
    { id: 21, name: "كيلو سمك بعــــــرور", price: 2500 },
    { id: 22, name: "كيلو سمك جــــــــرم", price: 2500 },
    { id: 23, name: "كيلو سمك لســــــــن", price: 2000 },
    { id: 24, name: "كيلو سمك باغــــــــه", price: 1000 },
    { id: 25, name: "كيلو جمبري كبير", price: 5000 },
    { id: 26, name: "كيلو جمبري مخلوط", price: 4000 },
    { id: 27, name: "كيلو جمبري صغير (حميره)", price: 2500 },
    { id: 28, name: "كيلو شــــــــــــــروخ", price: 5000 },
    { id: 29, name: "كيلو ابــو مــــــــقص", price: 1500 }
];

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

const products = [
    { id: 1, name: "ديـــــــرك", price: 5000 },
    { id: 2, name: "جحــــش", price: 2500 },
    { id: 3, name: "فـــــارس", price: 2500 },
    { id: 4, name: "سلمــــون", price: 3500 },
    { id: 5, name: "مرجــــان", price: 3500 },
    { id: 6, name: "هامـــــور", price: 3500 },
    { id: 7, name: "قــــــرض", price: 3000 },
    { id: 8, name: "صولفيش", price: 2500 },
    { id: 9, name: "بـبــــــغاء", price: 2500 },
    { id: 10, name: "سخـــــله", price: 3000 },
    { id: 11, name: "عــــــربي", price: 2500 },
    { id: 12, name: "قـــــــــــد", price: 2000 },
    { id: 13, name: "حـــــــمام", price: 2500 },
    { id: 14, name: "ولــــــــــد", price: 2000 },
    { id: 15, name: "ظــــــــبي", price: 2500 },
    { id: 16, name: "عـــــــنتق", price: 2500 },
    { id: 17, name: "سلطــــان", price: 2500 },
    { id: 18, name: "بيــــــاض", price: 2000 },
    { id: 19, name: "ضمكـــري", price: 2500 },
    { id: 20, name: "ابوعــــين", price: 3000 },
    { id: 21, name: "بعــــــرور", price: 2500 },
    { id: 22, name: "جــــــــرم", price: 2500 },
    { id: 23, name: "لســــــــن", price: 2000 },
    { id: 24, name: "باغــــــــه", price: 1000 },
    { id: 25, name: "جمبري كبير", price: 5000 },
    { id: 26, name: "جمبري مخلوط", price: 4000 },
    { id: 27, name: "جمبري صغير (حميره)", price: 2500 },
    { id: 28, name: "شــــــــــــــروخ", price: 5000 },
    { id: 29, name: "ابــو مــــــــقص", price: 1500 }
];

const sortedProducts = [...products].sort((a, b) => 
    a.name.localeCompare(b.name, "ar")
);

console.log(sortedProducts);

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

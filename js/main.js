// إخفاء شاشة التحميل بعد تحميل الصفحة
window.addEventListener('load', function () {
    var loading = document.getElementById('loading-screen');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(function () {
            loading.style.display = 'none';
        }, 300);
    }
});
// عرض المنتجات في الصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="images/fish-icon.svg" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="btn-order" onclick="orderProduct(${product.id})">اطلب الآن</button>
            `;
            productsGrid.appendChild(productCard);
        });
    }
});

// دالة للانتقال إلى صفحة الطلب
function orderProduct(productId) {
    window.location.href = `order.html?product=${productId}`;
}

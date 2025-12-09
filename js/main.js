// إخفاء شاشة التحميل بعد تحميل الصفحة
window.addEventListener('load', function () {
    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(function () {
            loading.style.display = 'none';
        }, 300);
    }
});

// متغير لتخزين المنتجات المعروضة حالياً
let currentDisplayedProducts = sortedProducts;

// عرض المنتجات في الصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearSearchButton = document.getElementById('clear-search');
    const noResultsMessage = document.getElementById('no-results');
    
    // عرض جميع المنتجات عند التحميل
    if (productsGrid) {
        displayProducts(sortedProducts);
    }
    
    // وظيفة البحث عند الكتابة (مع تأخير)
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch();
            }, 300); // تأخير 300ms لتحسين الأداء
        });
        
        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // وظيفة البحث عند النقر على الزر
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // وظيفة مسح البحث
    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', function() {
            searchInput.value = '';
            clearSearchButton.style.display = 'none';
            displayProducts(sortedProducts);
            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        });
    }
});

// دالة تنفيذ البحث
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearchButton = document.getElementById('clear-search');
    const noResultsMessage = document.getElementById('no-results');
    const query = searchInput.value;
    
    // إظهار/إخفاء زر المسح
    if (clearSearchButton) {
        clearSearchButton.style.display = query ? 'flex' : 'none';
    }
    
    // البحث وعرض النتائج
    const results = searchProducts(query);
    displayProducts(results);
    
    // عرض رسالة عدم وجود نتائج
    if (noResultsMessage) {
        if (results.length === 0) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = query ? 
                `لم يتم العثور على منتجات تطابق "${query}"` : 
                'لا توجد منتجات متاحة';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
}

// دالة عرض المنتجات
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    // مسح المحتوى الحالي
    productsGrid.innerHTML = '';
    currentDisplayedProducts = productsToDisplay;
    
    // عرض كل منتج
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="images/fish-icon.svg" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p class="price">${formatPrice(product.price)}</p>
            <button class="btn-order" onclick="orderProduct(${product.id})" aria-label="اطلب ${product.name}">
                اطلب الآن
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// دالة للانتقال إلى صفحة الطلب
function orderProduct(productId) {
    window.location.href = `order.html?product=${productId}`;
}

// تحسين أداء التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

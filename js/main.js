// إخفاء شاشة التحميل
function hideLoader() {
  const loading = document.getElementById('loading-screen');
  if (!loading) return;
  loading.classList.add('is-hidden');
  setTimeout(() => loading.remove(), 400);
}

// أخفي اللودر بأسرع شكل
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(hideLoader);
}, { once: true });

// أمان إضافي
window.addEventListener('load', hideLoader, { once: true });
setTimeout(hideLoader, 2500);


// تشغيل الموقع بعد جاهزية المنتجات
document.addEventListener('DOMContentLoaded', async function () {
  // انتظر تحميل المنتجات من products.js
  try {
    await productsReady;
  } catch (err) {
    console.error('فشل تحميل قائمة المنتجات', err);
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) productsGrid.innerHTML = "<p>تعذر تحميل المنتجات.</p>";
    return;
  }

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
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch();
      }, 300);
    });

    // البحث عند الضغط على Enter
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // البحث عند النقر على الزر
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  // مسح البحث
  if (clearSearchButton) {
    clearSearchButton.addEventListener('click', function () {
      if (searchInput) searchInput.value = '';
      clearSearchButton.style.display = 'none';
      displayProducts(sortedProducts);
      if (noResultsMessage) noResultsMessage.style.display = 'none';
    });
  }

  // تحسين التمرير السلس (اختياري)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});


// دالة تنفيذ البحث
function performSearch() {
  const searchInput = document.getElementById('search-input');
  const clearSearchButton = document.getElementById('clear-search');
  const noResultsMessage = document.getElementById('no-results');
  const query = (searchInput?.value || "").trim();

  // إظهار/إخفاء زر المسح
  if (clearSearchButton) {
    clearSearchButton.style.display = query ? 'flex' : 'none';
  }

  // البحث وعرض النتائج
  const results = searchProducts(query);
  displayProducts(results);

  // رسالة عدم وجود نتائج
  if (noResultsMessage) {
    if (results.length === 0) {
      noResultsMessage.style.display = 'block';
      noResultsMessage.textContent = query
        ? `لم يتم العثور على منتجات تطابق "${query}"`
        : 'لا توجد منتجات متاحة';
    } else {
      noResultsMessage.style.display = 'none';
    }
  }
}


// عرض المنتجات
function displayProducts(productsToDisplay) {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;

  productsGrid.innerHTML = '';
  currentDisplayedProducts = productsToDisplay;

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

function orderProduct(productId) {
  window.location.href = `order.html?product=${productId}`;
}

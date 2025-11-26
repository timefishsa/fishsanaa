// الحصول على معلومات المنتج من URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');
const product = getProductById(productId);

// عرض معلومات المنتج
document.addEventListener('DOMContentLoaded', function() {
    if (!product) {
        alert('المنتج غير موجود!');
        window.location.href = 'index.html';
        return;
    }

    const productInfo = document.getElementById('product-info');
    productInfo.innerHTML = `
        <img src="images/fish-icon.svg" alt="${product.name}">
        <div>
            <h3>${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
        </div>
    `;

    // حساب الإجمالي عند التحميل
    calculateTotal();

    // إضافة مستمعات الأحداث
    document.getElementById('qty-plus').addEventListener('click', increaseQuantity);
    document.getElementById('qty-minus').addEventListener('click', decreaseQuantity);
    document.getElementById('quantity').addEventListener('input', calculateTotal);
    document.querySelectorAll('input[name="preparation"]').forEach(radio => {
        radio.addEventListener('change', calculateTotal);
    });
    document.getElementById('order-form').addEventListener('submit', handleSubmit);
});

// زيادة الكمية
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseFloat(quantityInput.value) || 1;
    currentValue += 0.5;
    quantityInput.value = currentValue;
    calculateTotal();
}

// تقليل الكمية
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseFloat(quantityInput.value) || 1;
    if (currentValue > 0.5) {
        currentValue -= 0.5;
        quantityInput.value = currentValue;
        calculateTotal();
    }
}

// حساب الإجمالي
function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 1;
    const selectedPrep = document.querySelector('input[name="preparation"]:checked');
    const prepCost = parseInt(selectedPrep.dataset.price) || 0;

    // حساب سعر المنتج
    const productTotal = product.price * quantity;
    
    // حساب تكلفة التحضير (للكمية الكاملة)
    const totalPrepCost = prepCost * quantity;
    
    // الإجمالي النهائي (بدون رسوم توصيل)
    const total = productTotal + totalPrepCost;

    // تحديث العرض
    document.getElementById('product-total').textContent = formatPrice(productTotal);
    
    if (totalPrepCost > 0) {
        document.getElementById('prep-cost-row').style.display = 'flex';
        document.getElementById('prep-cost').textContent = formatPrice(totalPrepCost);
    } else {
        document.getElementById('prep-cost-row').style.display = 'none';
    }
    
    document.getElementById('total-amount').textContent = formatPrice(total);
}

// معالجة إرسال النموذج
function handleSubmit(e) {
    e.preventDefault();
    
    const quantity = parseFloat(document.getElementById('quantity').value);
    const customerName = document.getElementById('customerName').value.trim();
    const street = document.getElementById('street').value.trim();
    const landmark = document.getElementById('landmark').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const selectedPrep = document.querySelector('input[name="preparation"]:checked');
    const prepName = selectedPrep.parentElement.querySelector('.prep-name').textContent;
    const prepCost = parseInt(selectedPrep.dataset.price) || 0;
    
    // التحقق من الكمية
    if (quantity < 0.5) {
        alert('يرجى إدخال كمية صحيحة');
        return;
    }
    
    // حساب الإجمالي
    const productTotal = product.price * quantity;
    const totalPrepCost = prepCost * quantity;
    const total = productTotal + totalPrepCost;
    
    // إنشاء رسالة واتساب
    let message = `*طلب جديد من موقع وقت السمك* 🐟\n\n`;
    message += `*معلومات العميل:*\n`;
    message += `الاسم: ${customerName}\n`;
    message += `رقم الهاتف: ${phone}\n`;
    message += `الشارع: ${street}\n`;
    message += `معلم قريب: ${landmark}\n\n`;
    message += `*تفاصيل الطلب:*\n`;
    message += `المنتج: ${product.name}\n`;
    message += `الكمية: ${quantity} كيلو\n`;
    message += `طريقة التحضير: ${prepName}\n\n`;
    message += `*الفاتورة:*\n`;
    message += `سعر المنتج: ${formatPrice(productTotal)}\n`;
    
    if (totalPrepCost > 0) {
        message += `تكلفة التحضير: ${formatPrice(totalPrepCost)}\n`;
    }
    
    message += `رسوم التوصيل: مجاناً\n`;
    message += `\n*الإجمالي: ${formatPrice(total)}*`;
    
    // إرسال إلى واتساب
    const whatsappNumber = '967781595851';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

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
        <img src="images/fish-icon.svg" alt="${product.name}" loading="lazy">
        <div>
            <h3>${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
        </div>
    `;

    // حساب الإجمالي عند التحميل
    calculateTotal();

    // إضافة مستمعات الأحداث
    const qtyPlusBtn = document.getElementById('qty-plus');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const quantityInput = document.getElementById('quantity');
    const orderForm = document.getElementById('order-form');
    const prepRadios = document.querySelectorAll('input[name="preparation"]');
    
    if (qtyPlusBtn) qtyPlusBtn.addEventListener('click', increaseQuantity);
    if (qtyMinusBtn) qtyMinusBtn.addEventListener('click', decreaseQuantity);
    if (quantityInput) quantityInput.addEventListener('input', calculateTotal);
    
    prepRadios.forEach(radio => {
        radio.addEventListener('change', calculateTotal);
    });
    
    if (orderForm) orderForm.addEventListener('submit', handleSubmit);
});

// زيادة الكمية
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseFloat(quantityInput.value) || 1;
    currentValue += 0.5;
    quantityInput.value = currentValue.toFixed(1);
    calculateTotal();
}

// تقليل الكمية
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseFloat(quantityInput.value) || 1;
    if (currentValue > 0.5) {
        currentValue -= 0.5;
        quantityInput.value = currentValue.toFixed(1);
        calculateTotal();
    }
}

// حساب الإجمالي
function calculateTotal() {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseFloat(quantityInput.value) || 1;
    
    const selectedPrep = document.querySelector('input[name="preparation"]:checked');
    const prepCost = parseInt(selectedPrep.dataset.price) || 0;

    // حساب سعر المنتج
    const productTotal = product.price * quantity;
    
    // حساب تكلفة التحضير (للكمية الكاملة)
    const totalPrepCost = prepCost * quantity;
    
    // الإجمالي النهائي (بدون رسوم توصيل)
    const total = productTotal + totalPrepCost;

    // تحديث العرض
    const productTotalEl = document.getElementById('product-total');
    const prepCostRowEl = document.getElementById('prep-cost-row');
    const prepCostEl = document.getElementById('prep-cost');
    const totalAmountEl = document.getElementById('total-amount');
    
    if (productTotalEl) productTotalEl.textContent = formatPrice(productTotal);
    
    if (prepCostRowEl && prepCostEl) {
        if (totalPrepCost > 0) {
            prepCostRowEl.style.display = 'flex';
            prepCostEl.textContent = formatPrice(totalPrepCost);
        } else {
            prepCostRowEl.style.display = 'none';
        }
    }
    
    if (totalAmountEl) totalAmountEl.textContent = formatPrice(total);
}

// معالجة إرسال النموذج
function handleSubmit(e) {
    e.preventDefault();
    
    const quantityInput = document.getElementById('quantity');
    const customerNameInput = document.getElementById('customerName');
    const streetInput = document.getElementById('street');
    const landmarkInput = document.getElementById('landmark');
    const phoneInput = document.getElementById('phone');
    
    const quantity = parseFloat(quantityInput.value);
    const customerName = customerNameInput.value.trim();
    const street = streetInput.value.trim();
    const landmark = landmarkInput.value.trim();
    const phone = phoneInput.value.trim();
    
    const selectedPrep = document.querySelector('input[name="preparation"]:checked');
    const prepName = selectedPrep.parentElement.querySelector('.prep-name').textContent;
    const prepCost = parseInt(selectedPrep.dataset.price) || 0;
    
    // التحقق من الكمية
    if (quantity < 0.5) {
        alert('يرجى إدخال كمية صحيحة (على الأقل 0.5 كيلو)');
        return;
    }
    
    // التحقق من رقم الهاتف
    if (!phone || phone.length < 9) {
        alert('يرجى إدخال رقم هاتف صحيح');
        phoneInput.focus();
        return;
    }
    
    // حساب الإجمالي
    const productTotal = product.price * quantity;
    const totalPrepCost = prepCost * quantity;
    const total = productTotal + totalPrepCost;
    
    // إنشاء رسالة واتساب محسّنة
    let message = `🐟 *طلب جديد من موقع وقت السمك*\n\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `👤 *معلومات العميل:*\n`;
    message += `• الاسم: ${customerName}\n`;
    message += `• الهاتف: ${phone}\n`;
    message += `• الشارع: ${street}\n`;
    message += `• معلم قريب: ${landmark}\n\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `🛒 *تفاصيل الطلب:*\n`;
    message += `• المنتج: ${product.name}\n`;
    message += `• الكمية: ${quantity} كيلو\n`;
    message += `• التحضير: ${prepName}\n\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `💰 *الفاتورة:*\n`;
    message += `• سعر المنتج: ${formatPrice(productTotal)}\n`;
    
    if (totalPrepCost > 0) {
        message += `• تكلفة التحضير: ${formatPrice(totalPrepCost)}\n`;
    }
    
    message += `• رسوم التوصيل: حسب المسافة\n\n`;
    message += `💵 *الإجمالي: ${formatPrice(total)}*\n`;
    message += `━━━━━━━━━━━━━━━━`;
    
    // إرسال إلى واتساب
    const whatsappNumber = '967781595851';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // فتح واتساب في نافذة جديدة
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    
    // التحقق من فتح النافذة
    if (whatsappWindow) {
        // إظهار رسالة نجاح
        alert('✅ تم إعداد طلبك! سيتم فتح واتساب الآن لإرساله.');
    } else {
        // في حالة حظر النوافذ المنبثقة
        alert('⚠️ يرجى السماح بالنوافذ المنبثقة لإكمال الطلب عبر واتساب');
        // محاولة فتح الرابط مباشرة
        window.location.href = whatsappUrl;
    }
}

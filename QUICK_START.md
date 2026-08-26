# 🚀 دليل البدء السريع - وقت السمك

## 📦 ما تحتاجه للبدء (5 دقائق فقط!)

### 1️⃣ فك الضغط
```bash
unzip fish-time-improved.zip
cd fish-time-improved
```

### 2️⃣ تحديث رقم الواتساب
ابحث عن `967739768973` وغيّره في:
- ✅ `index.html` (3 مواضع)
- ✅ `order.html` (2 مواضع)  
- ✅ `js/order.js` (1 موضع)

**طريقة سريعة (Linux/Mac):**
```bash
# استبدال جميع الأرقام دفعة واحدة
find . -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i 's/967781595851/YOUR_NUMBER/g' {} +
```

**طريقة سريعة (Windows PowerShell):**
```powershell
Get-ChildItem -Include *.html,*.js -Recurse | 
ForEach-Object {
    (Get-Content $_.FullName) -replace '967739768973', 'YOUR_NUMBER' | 
    Set-Content $_.FullName
}
```

### 3️⃣ إضافة الصور
ضع هذه الصور في مجلد `images/`:
- 📸 `logo.png` - شعار الموقع (أي حجم، الأفضل 512x512)
- 📸 `hero-fish.jpg` - صورة البانر (الأفضل 1200x600)
- 📸 `fish-icon.svg` - أيقونة السمك (أي حجم SVG)

**نصيحة:** إذا لم تكن لديك أيقونة SVG:
- استخدم PNG بحجم 200x200 بدلاً منها
- غيّر امتداد الملف في الكود من `.svg` إلى `.png`

### 4️⃣ رفع الموقع

#### على استضافة عادية:
```bash
# ارفع جميع الملفات عبر FTP
├── index.html
├── order.html
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   ├── main.js
│   └── order.js
└── images/
    ├── logo.png
    ├── hero-fish.jpg
    └── fish-icon.svg
```

#### على GitHub Pages (مجاني):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# ثم فعّل GitHub Pages من إعدادات المستودع
```

### 5️⃣ اختبار الموقع ✅

افتح `index.html` في المتصفح وتحقق من:

- [ ] شعار الموقع يظهر بوضوح
- [ ] البحث يعمل (جرب "هامور")
- [ ] المنتجات مرتبة أبجدياً
- [ ] زر واتساب العائم يعمل
- [ ] صفحة الطلب تفتح عند النقر
- [ ] رسالة واتساب منسقة بشكل صحيح

---

## 🎯 اختبار سريع للمزايا الجديدة

### اختبار البحث:
1. افتح الصفحة الرئيسية
2. اكتب في شريط البحث: **"جمبري"**
3. يجب أن تظهر 3 نتائج فقط
4. امسح البحث بزر ❌
5. يجب أن تعود جميع المنتجات

### اختبار الترتيب:
1. انظر للمنتجات
2. أول منتج يجب أن يبدأ بـ "أ" (ابو عين، ابو مقص)
3. آخر منتج يجب أن يبدأ بـ "ه" أو "و" (هامور، ولد)

### اختبار الواتساب:
1. اطلب منتج (مثلاً "هامور")
2. املأ النموذج بمعلومات وهمية
3. اضغط "إتمام الطلب"
4. تحقق من:
   - ✅ رسالة منسقة مع رموز تعبيرية
   - ✅ خطوط فاصلة واضحة
   - ✅ جميع البيانات موجودة

---

## 🐛 حل المشاكل الشائعة

### المشكلة: المنتجات لا تظهر
**الحل:**
1. افتح Developer Tools (F12)
2. تحقق من Console للأخطاء
3. تأكد من تحميل `products.js` قبل `main.js`

```html
<!-- الترتيب الصحيح -->
<script src="js/products.js"></script>
<script src="js/main.js"></script>
```

### المشكلة: البحث لا يعمل
**الحل:**
1. تحقق من وجود هذه IDs:
```html
<input id="search-input">
<button id="search-button">
<button id="clear-search">
<div id="products-grid">
```

### المشكلة: الصور لا تظهر
**الحل:**
```html
<!-- تحقق من المسارات -->
<img src="images/logo.png">        ✅
<img src="./images/logo.png">      ✅
<img src="/images/logo.png">       ❌ (مسار مطلق)
<img src="../images/logo.png">     ❌ (مسار خاطئ)
```

### المشكلة: الألوان لا تعمل
**الحل:**
تأكد من تحميل `style.css` في الـ `<head>`:
```html
<link rel="stylesheet" href="css/style.css">
```

### المشكلة: واتساب يفتح لكن الرسالة فارغة
**الحل:**
تحقق من ترميز الرسالة في `order.js`:
```javascript
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
```

---

## 🎨 تخصيص سريع

### تغيير اللون الأساسي:
```css
/* في css/style.css */
:root {
    --primary-color: #YOUR_COLOR;  /* مثال: #FF5722 */
}
```

### إضافة منتج جديد:
```javascript
// في js/products.js
{ id: 30, name: "نوع جديد", price: 3500 }
```

### تعديل خيارات التحضير:
```html
<!-- في order.html -->
<label class="prep-option">
    <input type="radio" name="preparation" value="grilled" data-price="1200">
    <div class="prep-card">
        <span class="prep-icon">🔥</span>
        <span class="prep-name">مشوي</span>
        <span class="prep-price">+1,200 ريال/كيلو</span>
    </div>
</label>
```

---

## 📊 معلومات المشروع

### الملفات الأساسية:
| الملف | الوظيفة | الحجم |
|-------|---------|-------|
| `index.html` | الصفحة الرئيسية | 11 KB |
| `order.html` | صفحة الطلب | 12 KB |
| `css/style.css` | التصميم | 20 KB |
| `js/products.js` | بيانات المنتجات | 2.6 KB |
| `js/main.js` | وظائف الصفحة الرئيسية | 4.8 KB |
| `js/order.js` | وظائف صفحة الطلب | 7.1 KB |

### المتطلبات:
- ✅ أي متصفح حديث (Chrome, Firefox, Safari, Edge)
- ✅ لا يحتاج قاعدة بيانات
- ✅ لا يحتاج Node.js أو npm
- ✅ لا يحتاج PHP
- ✅ يعمل مباشرة من الملفات

### التوافق:
- ✅ Desktop (جميع الأحجام)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)
- ✅ RTL (من اليمين لليسار)

---

## 🆘 الدعم الفني

### طرق التواصل:
- 📱 واتساب: +967781595851
- 📧 البريد: (أضف بريدك هنا)
- 🌐 الموقع: (أضف رابط موقعك)

### موارد مفيدة:
- 📚 [دليل كامل](README.md)
- 📝 [قائمة التغييرات](CHANGES.md)
- 💻 [دليل البرمجة](https://developer.mozilla.org/ar/)
- 📱 [WhatsApp API](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)

---

## ✨ نصائح نهائية

### للحصول على أفضل أداء:
1. ✅ ضغط الصور قبل الرفع (استخدم [TinyPNG](https://tinypng.com))
2. ✅ تفعيل HTTPS على الاستضافة
3. ✅ تفعيل التخزين المؤقت (Caching)
4. ✅ استخدام CDN للملفات الثابتة

### للحصول على SEO أفضل:
1. ✅ أضف Google Analytics
2. ✅ سجل في Google Search Console
3. ✅ أنشئ ملف `sitemap.xml`
4. ✅ أضف بيانات منظمة (Schema.org)

### للحصول على تجربة أفضل:
1. ✅ اختبر على جميع الأجهزة
2. ✅ اطلب آراء المستخدمين
3. ✅ راقب الأداء باستخدام PageSpeed Insights
4. ✅ حدّث المحتوى بانتظام

---

## 🎉 جاهز للانطلاق!

الموقع جاهز الآن بنسبة 100%! فقط:
1. غيّر رقم الواتساب
2. أضف الصور
3. ارفع الملفات
4. ابدأ البيع! 🚀

**بالتوفيق! 💪**

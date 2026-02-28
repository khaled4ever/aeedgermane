# مركز الرشود لصيانة السيارات

هذا المشروع هو موقع إلكتروني لمركز الرشود لصيانة السيارات، تم إنشاؤه باستخدام Next.js و Firebase Studio.

## التقنيات المستخدمة

-   **Next.js**: إطار عمل React للويب.
-   **TypeScript**: للتحقق من الأنواع وزيادة موثوقية الكود.
-   **Tailwind CSS**: لتنسيق وتصميم الواجهات.
-   **ShadCN UI**: مجموعة من مكونات الواجهة الجاهزة.
-   **Firebase**: لخدمات البنية التحتية (تم استخدام Firestore لآلية حظر الزوار).
-   **Genkit**: لتشغيل المساعد الذكي (Chatbot).

## إعداد المشروع

### 1. المتطلبات

-   Node.js
-   npm أو yarn أو pnpm

### 2. تثبيت الحزم

قم بتشغيل الأمر التالي لتثبيت جميع الحزم المطلوبة:

```bash
npm install
```

### 3. إعداد متغيرات البيئة

لكي يعمل المشروع بشكل كامل، تحتاج إلى إعداد بعض المتغيرات السرية. قم بإنشاء ملف جديد في جذر المشروع باسم `.env.local` وأضف المتغيرات التالية:

```env
# احصل عليه من حسابك في إعلانات جوجل
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-YOUR_CONVERSION_ID

# احصل عليه من حسابك في خرائط جوجل
# https://developers.google.com/maps/documentation/javascript/get-api-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

# محتوى ملف JSON الخاص بحساب خدمة Firebase Admin SDK
# هذا المتغير مطلوب لنشره على Vercel لتعمل ميزة حظر الزوار
FIREBASE_SERVICE_ACCOUNT_KEY=PASTE_THE_CONTENT_OF_YOUR_FIREBASE_SERVICE_ACCOUNT_JSON_FILE_HERE
```
**مهم جداً:** ملف `.env.local` وملفات `*-firebase-adminsdk-*.json` مدرجة في ملف التجاهل (`.gitignore`) لضمان عدم رفعها إلى GitHub.

### 4. تشغيل خادم التطوير

```bash
npm run dev
```

افتح [http://localhost:9002](http://localhost:9002) في متصفحك لرؤية الموقع.

## ميزات المشروع

-   **موقع تعريفي كامل** لمركز صيانة السيارات.
-   **مساعد ذكي (Chatbot)** للإجابة على أسئلة العملاء.
-   **آلية حماية** لحظر الزوار الذين يقومون بزيارات متكررة بشكل مريب.
-   **متوافق مع إعلانات جوجل** لتتبع الحملات.
-   **صفحات مخصصة** لكل ماركة سيارة.
# aeedgermane
# aeedgermane
# aeedgermane
# aeedgermane
# aeedgermane
# aeedgermane

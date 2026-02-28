import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE_CONFIG } from '@/app/config';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingContactButtons } from '@/components/floating-contact-buttons';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  metadataBase: new URL('https://alrashud.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: `${SITE_CONFIG.site.name} | ${SITE_CONFIG.site.specialty}`,
    template: `%s | ${SITE_CONFIG.site.name}`,
  },
  description: `${SITE_CONFIG.site.name} - مركز متخصص في صيانة السيارات الألمانية والأوروبية في الرياض، صناعية أم الحمام. نقدم خدمات توضيب، ميكانيكا، كهرباء، برمجة وفحص كمبيوتر.`,
  keywords: ["صيانة سيارات", "سيارات ألمانية", "سيارات أوروبية", "ورشة سيارات", "مركز صيانة", "الرياض", "صناعية أم الحمام", "مركز الرشود", "توضيب", "ميكانيكا", "كهرباء"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <FloatingContactButtons />
        </FirebaseClientProvider>

        {GOOGLE_ADS_ID && (
          <>
            {/* 
              لجعل الموقع متوافقًا مع إعلانات جوجل، تحتاج إلى إضافة "وسم جوجل" (Google Tag).
              لقد قمت بإعداد المكان المناسب له. كل ما عليك فعله هو:
              1.  الحصول على معرّف الإعلان الخاص بك من حساب إعلانات جوجل (يبدو هكذا: AW-123456789).
              2.  إنشاء ملف جديد في جذر المشروع باسم `.env.local`.
              3.  أضف السطر التالي إلى ملف `.env.local` مع استبدال القيمة:
                  NEXT_PUBLIC_GOOGLE_ADS_ID=AW-YOUR_CONVERSION_ID
            */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

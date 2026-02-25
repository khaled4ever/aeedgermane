import type { Metadata } from 'next';
import { BookingPageClient } from '@/components/booking-page-client';

export const metadata: Metadata = {
  title: 'احجز موعد صيانة | مركز الرشود',
  description: 'احجز موعدك لصيانة سيارتك الألمانية أو الأوروبية في مركز الرشود بالرياض. تواصل معنا مباشرة عبر واتساب لخدمة سريعة وسهلة.',
  keywords: ['حجز موعد صيانة', 'صيانة سيارات', 'مركز الرشود', 'واتساب', 'الرياض'],
  alternates: {
    canonical: '/احجز-موعد',
  },
};

export default function BookingPage() {
    return <BookingPageClient />;
}

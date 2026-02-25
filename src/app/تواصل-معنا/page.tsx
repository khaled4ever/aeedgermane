import type { Metadata } from 'next';
import { ContactPageClient } from '@/components/contact-page-client';

export const metadata: Metadata = {
    title: 'تواصل معنا | مركز الرشود',
    description: `تواصل مع مركز الرشود لصيانة السيارات في الرياض، صناعية أم الحمام. اتصل بنا أو أرسل رسالة لحجز موعد أو للاستفسار عن خدماتنا.`,
    keywords: ['تواصل مركز الرشود', 'رقم مركز الرشود', 'موقع مركز الرشود', 'صيانة سيارات الرياض'],
    alternates: {
      canonical: '/تواصل-معنا',
    },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

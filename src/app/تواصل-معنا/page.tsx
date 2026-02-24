import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/app/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { MapComponent } from '@/components/map';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'تواصل معنا | مركز الرشود',
    description: `تواصل مع مركز الرشود لصيانة السيارات في الرياض، صناعية أم الحمام. اتصل بنا أو أرسل رسالة لحجز موعد أو للاستفسار عن خدماتنا.`,
    keywords: ['تواصل مركز الرشود', 'رقم مركز الرشود', 'موقع مركز الرشود', 'صيانة سيارات الرياض'],
    alternates: {
      canonical: '/تواصل-معنا',
    },
};

const contactDetails = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'موقعنا',
    value: SITE_CONFIG.site.location.fullAddress,
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: 'الهاتف / واتساب',
    value: SITE_CONFIG.site.phone,
    href: `tel:${SITE_CONFIG.site.phone}`,
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'ساعات العمل',
    value: 'السبت - الخميس: 9 صباحاً - 8 مساءً',
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-headline font-bold">تواصل معنا</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو لحجز موعد.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-headline font-bold">معلومات التواصل</h2>
            {contactDetails.map((detail) => (
              <div key={detail.title} className="flex items-start gap-4">
                {detail.icon}
                <div>
                  <h3 className="font-semibold">{detail.title}</h3>
                  {detail.href ? (
                    <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">أرسل لنا رسالة</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[400px]">
        <MapComponent />
      </div>
    </>
  );
}

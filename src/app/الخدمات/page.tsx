import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { servicesData } from '@/lib/services-data';

export const metadata: Metadata = {
    title: 'خدمات صيانة السيارات | مركز الرشود',
    description: 'نقدم خدمات متكاملة لصيانة السيارات الألمانية والأوروبية في الرياض، تشمل توضيب المحركات والجيربوكس، فحص كمبيوتر، كهرباء، ميكانيكا، وصيانة دورية.',
    keywords: ['خدمات صيانة السيارات', 'توضيب محرك', 'توضيب جيربوكس', 'فحص كمبيوتر سيارات', 'كهربائي سيارات', 'ميكانيكي سيارات', 'صيانة دورية', 'مركز الرشود'],
    alternates: {
      canonical: '/الخدمات',
    },
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-headline font-bold">خدماتنا</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            حلول متكاملة لصيانة وإصلاح سيارتك بأعلى مستويات الجودة والاحترافية.
          </p>
        </div>
      </div>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link href={`/الخدمات/${service.id}`} key={service.id} className="block h-full">
                <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl h-full">
                  {service.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover"
                        data-ai-hint={service.image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                    <CardDescription>{service.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {service.points.slice(0, 3).map((point, pIndex) => (
                        <li key={pIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

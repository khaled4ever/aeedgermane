import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'خدمات صيانة السيارات | مركز الرشود',
    description: 'نقدم خدمات متكاملة لصيانة السيارات الألمانية والأوروبية في الرياض، تشمل توضيب المحركات والجيربوكس، فحص كمبيوتر، كهرباء، ميكانيكا، وصيانة دورية.',
    keywords: ['خدمات صيانة السيارات', 'توضيب محرك', 'توضيب جيربوكس', 'فحص كمبيوتر سيارات', 'كهربائي سيارات', 'ميكانيكي سيارات', 'صيانة دورية', 'مركز الرشود'],
    alternates: {
      canonical: '/الخدمات',
    },
};

const services = [
  {
    title: 'صيانة المحركات والجيربوكس',
    description: 'إصلاح وتوضيب جميع أنواع المحركات وناقلات الحركة الأوتوماتيكية بأيدي مهندسين متخصصين.',
    image: PlaceHolderImages.find(i => i.id === 'service-engine'),
    points: ['توضيب كامل للمحرك', 'إصلاح تسريبات الزيت', 'برمجة وصيانة الجيربوكس']
  },
  {
    title: 'فحص وتشخيص الأعطال',
    description: 'نستخدم أحدث أجهزة الفحص والبرمجة لتحديد جميع الأعطال الميكانيكية والكهربائية بدقة عالية.',
    image: PlaceHolderImages.find(i => i.id === 'service-diagnostics'),
    points: ['فحص كمبيوتر شامل', 'تحديد أعطال الأنظمة الإلكترونية', 'تقارير فحص مفصلة']
  },
  {
    title: 'خدمات الصيانة الدورية',
    description: 'نقدم جميع خدمات الصيانة الدورية حسب توصيات المصنع للحفاظ على أداء وعمر سيارتك.',
    image: PlaceHolderImages.find(i => i.id === 'service-oil'),
    points: ['تغيير زيت المحرك والفلاتر', 'فحص وتغيير ماء الرديتر', 'فحص نظام التعليق']
  },
  {
    title: 'نظام الفرامل والتعليق',
    description: 'صيانة وإصلاح أنظمة الفرامل والتعليق لضمان قيادة آمنة ومريحة.',
    image: PlaceHolderImages.find(i => i.id === 'service-brakes'),
    points: ['تغيير الفحمات والهوبات', 'إصلاح أنظمة ABS/ESP', 'وزن أذرعة ومقصات']
  },
  {
    title: 'إصلاح نظام التكييف',
    description: 'فحص وإصلاح جميع مشاكل نظام التكييف، من ضعف التبريد إلى تسريبات الفريون.',
    image: PlaceHolderImages.find(i => i.id === 'service-ac'),
    points: ['تعبئة فريون أصلي', 'تنظيف دورة التكييف', 'إصلاح وتبديل الكمبروسر']
  },
  {
    title: 'كهرباء وبرمجة السيارات',
    description: 'حل جميع المشاكل الكهربائية المعقدة وبرمجة الوحدات الإلكترونية للسيارات الحديثة.',
    image: PlaceHolderImages.find(i => i.id === 'service-transmission'),
    points: ['برمجة اونلاين', 'إصلاح الظفائر الكهربائية', 'تركيب وبرمجة الإضافات']
  },
];

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
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
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
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

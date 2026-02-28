import Image from 'next/image';
import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/services-data';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/app/config';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    service: service.id,
  }));
}

export async function generateMetadata({ params }: { params: { service: string } }): Promise<Metadata> {
  const service = servicesData.find(s => s.id === params.service);

  if (!service) {
    return {
      title: 'الخدمة غير موجودة',
      description: 'الصفحة التي تبحث عنها غير موجودة.',
    };
  }

  const pageTitle = `${service.title} | مركز الرشود`;
  const pageDescription = `خدمة ${service.title} متخصصة في مركز الرشود. ${service.shortDescription}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `/الخدمات/${service.id}`,
    },
  };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = servicesData.find(s => s.id === params.service);

  if (!service) {
    notFound();
  }

  const prefilledMessage = `أهلاً مركز الرشود، أرغب في الاستفسار عن خدمة ${service.title}.`;
  const whatsappLink = `https://wa.me/966${SITE_CONFIG.site.whatsapp.substring(1)}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <div>
      <section className="relative h-80 w-full text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {service.image && (
          <Image
            src={service.image.imageUrl}
            alt={service.image.description}
            fill
            className="object-cover"
            data-ai-hint={service.image.imageHint}
            priority
          />
        )}
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none text-muted-foreground" style={{direction: 'rtl'}}>
            <h2 className="text-foreground">نظرة عامة على الخدمة</h2>
            <p>{service.longDescription}</p>

            <h3 className="text-foreground">ماذا تشمل خدمتنا؟</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 not-prose p-0 m-0 list-none">
                {service.points.map((point, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <div className="not-prose mt-12 text-center bg-primary/5 border border-primary/10 p-8 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">هل سيارتك تحتاج لهذه الخدمة؟</h2>
                <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                    لا تتردد في التواصل معنا. فريقنا من الخبراء جاهز لفحص سيارتك وتقديم أفضل الحلول.
                </p>
                <Button asChild size="lg" className="mt-6 font-bold">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        تواصل معنا عبر واتساب
                        <ChevronLeft className="mr-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

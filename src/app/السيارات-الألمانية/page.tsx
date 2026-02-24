import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/app/config';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'صيانة السيارات الألمانية | مركز الرشود',
  description: 'مركز الرشود متخصص في صيانة جميع أنواع السيارات الألمانية في الرياض، بما في ذلك مرسيدس، بي ام دبليو، أودي، بورش، والمزيد. خدمات ميكانيكا، كهرباء، برمجة، وتوضيب.',
  keywords: ['صيانة سيارات ألمانية', 'ورشة سيارات ألمانية', 'مركز صيانة ألماني', 'الرياض', 'مرسيدس', 'بي ام دبليو', 'أودي', 'بورش', 'فولكسفاجن', 'مركز الرشود'],
  alternates: {
    canonical: '/السيارات-الألمانية',
  },
};

const heroImage = PlaceHolderImages.find((img) => img.id === 'german-cars-index');

export default function GermanCarsIndexPage() {
  return (
    <div>
      <section className="relative h-72 w-full text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            صيانة السيارات الألمانية
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            خبرتنا تمتد لتشمل جميع الماركات الألمانية الرائدة.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {SITE_CONFIG.routes.german_brands.map((brand) => (
            <Link href={brand.path} key={brand.brand}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="flex aspect-square items-center justify-center p-6 bg-muted/50">
                    <span className="font-headline text-2xl font-semibold text-center">{brand.label}</span>
                  </div>
                  <div className="p-4 bg-background flex justify-between items-center">
                    <h3 className="font-semibold">{brand.brand}</h3>
                    <ArrowLeft className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

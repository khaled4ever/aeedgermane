import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/app/config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrandSpecificContent } from '@/components/brand-specific-content';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return SITE_CONFIG.routes.european_brands.map((brand) => ({
    brand: brand.slug,
  }));
}

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brandSlug = params.brand;
  const brand = SITE_CONFIG.routes.european_brands.find(b => b.slug === brandSlug);

  if (!brand) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const pageTitle = `صيانة ${brand.label} في الرياض | مركز الرشود`;
  const pageDescription = `أفضل مركز صيانة سيارات ${brand.label} في الرياض. متخصصون في توضيب المكائن والجيربوكسات، فحص كمبيوتر، برمجة، كهرباء وميكانيكا ${brand.label}.`;
  const keywords = [
    `صيانة ${brand.label}`,
    `صيانة ${brand.brand}`,
    `مركز صيانة ${brand.label} في الرياض`,
    `ورشة ${brand.label} بالرياض`,
    `افضل ورشة ${brand.label}`,
    `اصلاح ${brand.label}`,
    `توضيب مكينة ${brand.label}`,
    `توضيب جيربوكس ${brand.label}`,
    `ميكانيكي ${brand.label}`,
    `كهربائي ${brand.label}`,
    `برمجة ${brand.label}`,
    `فحص كمبيوتر ${brand.label}`,
    `قطع غيار ${brand.label}`,
    `أعطال ${brand.label}`,
    'صيانة سيارات أوروبية',
    'مركز الرشود',
    'الرياض',
    'صناعية أم الحمام',
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    alternates: {
      canonical: brand.path,
    },
  };
}

export default function EuropeanBrandPage({ params }: { params: { brand:string } }) {
  const brandSlug = params.brand;
  const brand = SITE_CONFIG.routes.european_brands.find(b => b.slug === brandSlug);

  if (!brand) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find((img) => img.id === 'brand-page-hero');
  const pageTitle = `صيانة ${brand.label}`;
  const pageDescription = `خدمات صيانة وإصلاح متخصصة لسيارات ${brand.label} في الرياض.`;

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
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            {pageDescription}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <BrandSpecificContent brandLabel={brand.label} />
      </div>
    </div>
  );
}

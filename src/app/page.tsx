
"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Cog,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SITE_CONFIG } from '@/app/config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

const services = [
  {
    title: 'صيانة دورية',
    description: 'نقدم خدمات صيانة دورية تشمل تغيير الزيوت والفلاتر للحفاظ على أداء سيارتك.',
    image: PlaceHolderImages.find(i => i.id === 'service-oil'),
  },
  {
    title: 'إصلاح المحركات',
    description: 'متخصصون في إصلاح وتوضيب محركات السيارات الألمانية والأوروبية.',
    image: PlaceHolderImages.find(i => i.id === 'service-engine'),
  },
  {
    title: 'كهرباء وفحص كمبيوتر',
    description: 'فحص وإصلاح الأعطال الكهربائية وبرمجة كمبيوتر السيارة بأحدث الأجهزة.',
    image: PlaceHolderImages.find(i => i.id === 'service-diagnostics'),
  },
  {
    title: 'فحص شامل',
    description: 'خدمات فحص شامل للسيارة بما في ذلك نظام الفرامل للتأكد من سلامتها.',
    image: PlaceHolderImages.find(i => i.id === 'service-brakes'),
  },
];

const whyUsItems = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'خبرة معتمدة',
    description: 'فريق من الفنيين المعتمدين بخبرة واسعة في السيارات الألمانية والأوروبية.',
  },
  {
    icon: <Cog className="h-10 w-10 text-primary" />,
    title: 'أحدث التقنيات',
    description: 'نستخدم أحدث أجهزة الفحص والبرمجة لضمان دقة التشخيص والإصلاح.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'قطع غيار أصلية',
    description: 'نلتزم باستخدام قطع غيار أصلية أو عالية الجودة لضمان أفضل أداء.',
  },
];

const brandLogos: { [key: string]: string } = {
    'Rolls-Royce': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/rolls-royce-svgrepo-com.svg',
    'Jaguar': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/jaguar-cars-logo-svgrepo-com.svg',
    'BMW': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/bmw.svg',
    'Mercedes-Benz': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/mercedes.svg',
    'Volkswagen': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/volkswagen.svg',
    'Audi': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/audi.svg',
    'Land Rover': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/landrover.svg',
    'Ferrari': 'https://xn--ogbhrq.vip/wp-content/uploads/2026/02/icons8-ferrari.svg'
};

export default function Home() {
  const allBrands = [
    ...SITE_CONFIG.routes.german_brands,
    ...SITE_CONFIG.routes.european_brands,
  ];

  const featuredBrands = allBrands.filter(b =>
    Object.keys(brandLogos).includes(b.brand)
  );
  
  const displayedBrandNames = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen', 'Maybach',
    'Rolls-Royce', 'Jaguar', 'Land Rover', 'Ferrari', 'Volvo', 'Bentley'
  ];
  const displayedBrands = allBrands.filter(b => displayedBrandNames.includes(b.brand));

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const prefilledMessage = "أهلاً مركز الرشود، أرغب في حجز موعد صيانة لسيارتي.";
  const whatsappLink = `https://wa.me/966${SITE_CONFIG.site.whatsapp.substring(1)}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="https://xn--ogbhrq.vip/wp-content/uploads/2026/02/alrashud-panar.png"
          alt="Al-Rashoud Auto Care Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              مركز <span className="text-yellow-400">الرشود</span> لصيانة السيارات الالمانية والاوربية
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
              خبرة تفوق التوقعات، وجودة تضمن راحة بالك.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 font-bold">
              <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                احجز موعدك الآن
                <ChevronLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>

      <section id="featured-brands" className="py-12 border-y bg-secondary/50">
        <div className="container mx-auto px-4">
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: 'start',
              loop: true,
              direction: 'rtl',
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredBrands.map((brand) => (
                <CarouselItem
                  key={brand.brand}
                  className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8 flex justify-center"
                >
                  <Link href={brand.path} className="group" title={`صيانة ${brand.label}`}>
                    <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center p-2 border-2 border-muted group-hover:border-primary transition-colors duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                      <Image
                        src={brandLogos[brand.brand]}
                        alt={`${brand.label} logo`}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:inline-flex" />
            <CarouselNext className="hidden sm:inline-flex" />
          </Carousel>
        </div>
      </section>

      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              خدماتنا المتميزة
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              نقدم حلولاً متكاملة لصيانة سيارتك بأعلى معايير الجودة.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden text-center transition-transform hover:scale-105 hover:shadow-lg"
              >
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
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              الماركات التي نخدمها
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              متخصصون في مجموعة واسعة من السيارات الألمانية والأوروبية.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {displayedBrands.map((brand) => (
              <Link href={brand.path} key={brand.path}>
                <Card className="transition-all hover:shadow-lg hover:-translate-y-1 rounded-full">
                  <CardContent className="p-0">
                    <div className="px-5 py-3">
                      <span className="font-semibold whitespace-nowrap">{brand.label}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Link href="/german-cars">
              <Card className="transition-all hover:shadow-lg hover:-translate-y-1 rounded-full">
                <CardContent className="p-0">
                  <div className="px-5 py-3">
                    <span className="font-semibold whitespace-nowrap">والمزيد من الماركات</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              لماذا تختار مركز الرشود؟
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              الجودة والاحترافية التي تستحقها سيارتك.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="font-headline text-xl font-bold mt-4">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            هل أنت مستعد لصيانة سيارتك؟
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            لا تتردد في حجز موعدك معنا اليوم. فريقنا مستعد لخدمتك بأفضل شكل.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 font-bold"
          >
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              تواصل معنا
              <ChevronLeft className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

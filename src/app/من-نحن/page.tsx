import Image from 'next/image';
import { Award, Users, Wrench } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SITE_CONFIG } from '@/app/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'من نحن | مركز الرشود لصيانة السيارات',
    description: 'تعرف على قصة مركز الرشود، خبرتنا الطويلة في صيانة السيارات الألمانية والأوروبية، ورؤيتنا في تقديم أفضل خدمة لعملائنا في الرياض.',
    keywords: ['عن مركز الرشود', 'تاريخ مركز الرشود', 'خبرة صيانة سيارات', 'فريق عمل مركز الرشود', 'ورشة سيارات الرياض'],
    alternates: {
      canonical: '/من-نحن',
    },
};


const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

const stats = [
  { icon: <Award className="h-8 w-8 text-primary" />, value: '15+', label: 'سنة من الخبرة' },
  { icon: <Users className="h-8 w-8 text-primary" />, value: '5000+', label: 'عميل راضٍ' },
  { icon: <Wrench className="h-8 w-8 text-primary" />, value: '10000+', label: 'سيارة تم إصلاحها' },
];

export default function AboutUsPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-headline font-bold">من نحن</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            خبراء صيانة السيارات الألمانية والأوروبية في الرياض
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-4">
              قصتنا ورؤيتنا
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                تأسس ${SITE_CONFIG.site.name} بشغف لتقديم أرقى خدمات صيانة السيارات الألمانية والأوروبية. منذ بدايتنا، وضعنا نصب أعيننا تحقيق التميز في كل تفصيلة، من التشخيص الدقيق إلى الإصلاح المتقن.
              </p>
              <p>
                نؤمن بأن كل سيارة هي تحفة هندسية تستحق عناية فائقة. لذلك، نستثمر في أحدث التقنيات ونحرص على تدريب فريقنا باستمرار لمواكبة كل ما هو جديد في عالم السيارات. رؤيتنا هي أن نكون الخيار الأول والأكثر ثقة لمالكي السيارات الفاخرة في المملكة.
              </p>
            </div>
          </div>
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={800}
                height={600}
                className="rounded-lg shadow-lg object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-secondary/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6">
                {stat.icon}
                <div className="text-4xl font-bold mt-2">{stat.value}</div>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

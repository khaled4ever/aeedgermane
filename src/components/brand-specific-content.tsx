import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, BookOpen, CheckCircle } from 'lucide-react';

interface BrandSpecificContentProps {
  brandLabel: string;
}

const commonFaults: { [key: string]: string[] } = {
    'بي-ام-دبليو': ['تسريب زيت المحرك والصمامات (Valve stem seals)', 'مشاكل في نظام التبريد ومضخة الماء', 'أعطال كهربائية في نظام iDrive وحساسات ABS', 'مشاكل في جيربوكسات ZF'],
    'مرسيدس': ['مشاكل في نظام التعليق الهوائي (Airmatic)', 'أعطال في ناقل الحركة 7G-Tronic و 9G-Tronic', 'تسريبات زيت من المحرك والجيربوكس', 'مشاكل في نظام الفرامل الإلكتروني (SBC)'],
    'أودي': ['استهلاك زيت المحرك بشكل مفرط في محركات TFSI', 'مشاكل في ناقل الحركة S-Tronic (DSG)', 'أعطال في شاشة MMI والنظام الصوتي', 'تراكم الكربون على صمامات السحب'],
    'بورش': ['تآكل الفرامل السريع (خصوصاً السيراميك)', 'مشاكل في نظام التعليق الهوائي (PASM)', 'تسريب سائل التبريد من الأنابيب', 'أعطال في محامل IMS في الموديلات القديمة'],
    'فولكسفاجن': ['أعطال في الجيربوكس DSG (Mechatronics)', 'تراكم الكربون على الصمامات في محركات TSI/TFSI', 'مشاكل كهربائية في النوافذ والأقفال', 'أعطال مضخة الوقود ذات الضغط العالي'],
    'رنج-روفر': ['مشاكل متكررة في نظام التعليق الهوائي وفشل الـ compressor', 'أعطال كهربائية "Gremlins" في الشاشات والأنظمة', 'تسريب زيت من المحرك والدفرنس', 'مشاكل في التيربو'],
    'جاكوار': ['مشاكل في النظام الكهربائي والبطارية', 'أعطال نظام التبريد وتسريب الماء', 'تآكل في بوشات وأذرعة نظام التعليق', 'مشاكل في السوبرتشارجر'],
    'فولفو': ['أعطال في وحدة التحكم الإلكترونية (ECU) و (CEM)', 'مشاكل في مستشعر تدفق الهواء (MAF)', 'تآكل جلب المقصات وأعمدة التوازن', 'أعطال في قفل عمود التوجيه (SCL)'],
    'بنتلي': ['مشاكل في نظام التعليق الهوائي', 'أعطال كهربائية معقدة', 'تسريبات زيت وفراغ (Vacuum leaks)'],
    'فيراري': ['تآكل سريع للكلاتش في أنظمة F1', 'مشاكل كهربائية', 'صيانة دورية مكلفة للأحزمة (Timing belts)'],
    'لامبورغيني': ['مشاكل في نظام e-gear', 'ارتفاع درجة حرارة المحرك', 'أنظمة كهربائية حساسة'],
};

const getCommonFaults = (brandLabel: string) => {
    return commonFaults[brandLabel] || [
        'تسريب زيت المحرك',
        'مشاكل في نظام التبريد',
        'أعطال كهربائية متنوعة',
        'مشاكل في ناقل الحركة',
        'أصوات وضجيج في نظام التعليق',
    ];
}


export function BrandSpecificContent({ brandLabel }: BrandSpecificContentProps) {
  const faults = getCommonFaults(brandLabel);

  return (
    <div className="space-y-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wrench className="h-6 w-6 text-primary" />
            خدماتنا المتخصصة لسيارات {brandLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            في مركز الرشود، نفخر بتقديم مجموعة شاملة من خدمات الصيانة والإصلاح المصممة خصيصًا لتلبية الاحتياجات الدقيقة لسيارات {brandLabel}. باستخدام أحدث التقنيات وقطع الغيار الأصلية، نضمن لسيارتك الأداء الأمثل والموثوقية.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">توضيب المكائن والجيربوكسات</h4>
                <p className="text-sm text-muted-foreground">إصلاح وتوضيب كامل للمحركات وناقلات الحركة (الجيربوكس) لسيارات {brandLabel} مع ضمان على العمل.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">برمجة وفحص كمبيوتر</h4>
                <p className="text-sm text-muted-foreground">نستخدم أحدث أجهزة الوكالة لفحص وبرمجة كمبيوتر سيارتك {brandLabel}، بما في ذلك برمجة اونلاين وتحديث الخرائط.</p>
              </div>
            </li>
             <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">صيانة ميكانيكية شاملة</h4>
                <p className="text-sm text-muted-foreground">جميع أعمال الميكانيكا من إصلاح نظام التعليق، الفرامل، التوجيه، والعكوس لسيارات {brandLabel}.</p>
              </div>
            </li>
             <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">خدمات كهرباء وتكييف</h4>
                <p className="text-sm text-muted-foreground">إصلاح جميع الأعطال الكهربائية، فحص الظفائر، وإصلاح نظام التكييف بالكامل لسيارات {brandLabel}.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">صيانة دورية متقدمة</h4>
                <p className="text-sm text-muted-foreground">تغيير الزيوت، الفلاتر، السيور، والبواجي حسب مواصفات المصنع لسيارات {brandLabel}.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">فحص شامل قبل الشراء</h4>
                <p className="text-sm text-muted-foreground">نقدم تقريرًا مفصلاً عن حالة السيارة {brandLabel} قبل شرائها لتجنب أي مفاجآت.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            أشهر الأعطال الشائعة في سيارات {brandLabel} وكيف نحلها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            بفضل خبرتنا الطويلة مع سيارات {brandLabel}، قمنا بتحديد أشهر المشاكل التي تواجهها وطورنا حلولاً فعالة ومضمونة لها.
          </p>
          <ul className="space-y-2 list-disc list-inside marker:text-primary">
            {faults.map((fault, index) => (
              <li key={index} className="text-muted-foreground">{fault}</li>
            ))}
          </ul>
           <p className="text-sm text-foreground mt-4 bg-secondary/50 p-3 rounded-md">
            مهما كان عطل سيارتك الـ {brandLabel}، فريقنا المتخصص قادر على تشخيصه وإصلاحه بكفاءة عالية.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BookOpen className="h-6 w-6 text-blue-500" />
            نصائح للحفاظ على سيارتك {brandLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground">1. الالتزام بالصيانة الدورية</h4>
              <p>
                الصيانة الدورية في مركز متخصص مثل مركزنا هي أفضل استثمار للحفاظ على أداء وقيمة سيارتك الـ {brandLabel}. لا تقتصر الصيانة على تغيير الزيت، بل تشمل فحصاً شاملاً للسوائل، الفلاتر، الفرامل، والإطارات.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">2. الانتباه لأصوات السيارة</h4>
              <p>
                سيارتك تتحدث إليك. أي صوت غريب مثل طقطقة، صفير، أو احتكاك عند القيادة أو استخدام الفرامل قد يكون مؤشراً على مشكلة. الفحص المبكر يوفر عليك الكثير من المال والوقت.
              </p>
            </div>
            <div>
                <h4 className="font-semibold text-foreground">3. التعامل الفوري مع الأضواء التحذيرية</h4>
                <p>
                  ظهور ضوء تحذيري في لوحة العدادات (مثل Check Engine) يعني أن كمبيوتر السيارة سجل خطأً. تجاهل هذه العلامات قد يؤدي إلى تلف أجزاء أخرى. في مركزنا، نستخدم أجهزة فحص دقيقة لتحديد سبب المشكلة بدقة.
                </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

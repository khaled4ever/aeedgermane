import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'الأسئلة الشائعة | مركز الرشود',
    description: 'إجابات على الأسئلة الأكثر شيوعاً حول صيانة السيارات الألمانية والأوروبية في مركز الرشود. تعرف على خدماتنا، الضمان، وقطع الغيار.',
    keywords: ['أسئلة شائعة صيانة سيارات', 'ضمان إصلاح السيارات', 'قطع غيار أصلية', 'صيانة دورية', 'مركز الرشود'],
    alternates: {
      canonical: '/الأسئلة-الشائعة',
    },
};

const faqs = [
  {
    question: "كم مرة يجب أن أقوم بالصيانة الدورية لسيارتي؟",
    answer: "نوصي باتباع جدول الصيانة الموصى به من الشركة المصنعة لسيارتك، والذي يتراوح عادة بين كل 10,000 إلى 15,000 كيلومتر. الصيانة الدورية تضمن الحفاظ على أداء السيارة وتجنب الأعطال المفاجئة.",
  },
  {
    question: "هل تستخدمون قطع غيار أصلية؟",
    answer: "نعم، نحن نلتزم باستخدام قطع غيار أصلية (OEM) أو قطع غيار عالية الجودة من موردين معتمدين لضمان أفضل أداء وموثوقية لسيارتك.",
  },
  {
    question: "هل تقدمون ضماناً على خدماتكم؟",
    answer: "بالتأكيد. نقدم ضماناً على جميع أعمال الصيانة والإصلاح التي نقوم بها، بالإضافة إلى ضمان على قطع الغيار المستخدمة. تختلف فترة الضمان حسب نوع الخدمة والقطعة.",
  },
  {
    question: "ما هي مدة الفحص الشامل للسيارة؟",
    answer: "يستغرق الفحص الشامل عادة من ساعة إلى ساعتين، حيث نقوم بفحص أكثر من 100 نقطة في السيارة باستخدام أحدث الأجهزة لتقديم تقرير مفصل عن حالتها.",
  },
  {
    question: "هل يمكنني حجز موعد عبر الهاتف؟",
    answer: "نعم، يمكنك حجز موعدك بسهولة عن طريق الاتصال بنا أو عبر الواتساب على الرقم 0506535392. كما يمكنك استخدام نموذج حجز المواعيد على موقعنا الإلكتروني.",
  },
  {
    question: "ما هي السيارات التي تتخصصون في صيانتها؟",
    answer: "نحن متخصصون في جميع أنواع السيارات الألمانية (مثل بي-ام-دبليو، مرسيدس، أودي، بورش) والسيارات الأوروبية (مثل لاندروفر، جاكوار، فولفو، والسيارات الإيطالية الفاخرة).",
  },
];

export default function FAQPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-headline font-bold">الأسئلة الشائعة</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            نجيب على استفساراتكم الأكثر تكراراً لمساعدتكم.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right font-semibold text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/app/config';

const reportConversion = () => {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17974591338/kIrgCKDatP4bEOr--fpC',
            'transaction_id': ''
        });
    }
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M16.75 13.96c.27.13.42.26.5.41.1.15.15.33.14.54-.01.3-.11.58-.26.82-.15.24-.39.46-.7.65-.3.2-.66.36-1.07.45-.41.1-.85.1-1.3.05-.45-.05-.9-.15-1.35-.3-.45-.15-.88-.35-1.3-.55s-.8-.45-1.15-.7c-.35-.25-.65-.5-1-.75-.3-.25-.55-.5-.8-.75-.25-.25-.45-.5-.6-.7-.15-.2-.25-.4-.35-.55-.1-.15-.15-.3-.2-.4s-.1-.35-.1-.5.05-.35.1-.5c.05-.15.15-.25.3-.35s.3-.15.5-.15c.2-.05.4,0,.6.05.2.05.4.1.6.15s.4.1.6.15c.2.05.35.05.5,0,.15,0,.3-.05.4-.15s.2-.2.25-.35c.05-.15.05-.3,0-.5-.05-.15-.1-.3-.2-.45s-.15-.3-.25-.4c-.1-.1-.25-.2-.35-.25-.1-.05-.2,0-.3.05-.1,0-.2.05-.3.05-.1,0-.2,0-.3-.05-.1,0-.2,0-.3-.05s-.2,0-.3,0c-.1,0-.2,0-.3,0h-.3c-.6,0-1.15.15-1.65.45-.5.3-.85.7-1.1 1.2-.25.5-.35 1.05-.35 1.6,0,.6.1 1.2.3 1.7.2.5.5.95.9 1.35.4.4.85.75 1.35 1.05.5.3,1.05.5,1.6.65.55.15,1.1.2,1.7.2.6,0,1.2-.05,1.75-.15s1.05-.25,1.5-.5c.45-.2.85-.5,1.15-.8.3-.3.55-.65.7-.95.15-.3.25-.65.3-.95.05-.3.05-.6,0-.85-.05-.25-.15-.45-.3-.6-.1-.15-.25-.25-.45-.35-.2-.1-.45-.1-.65-.05zM20.1 3.9C17.9 1.7 15 .5 12 .5 5.9.5.5 5.9.5 12c0 2.1.6 4.1 1.6 5.9L.6 23.4l5.6-1.5c1.8 1 3.8 1.5 5.8 1.5h.1c6.1 0 11.5-5.4 11.5-11.5 0-3-1.2-5.9-3.4-8.1zm-8.1 18c-1.8 0-3.6-.5-5.1-1.5l-.4-.2-3.8 1 1-3.7-.2-.4c-1-1.5-1.6-3.4-1.6-5.4C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
    </svg>
);

export function BookingPageClient() {
    const prefilledMessage = "أهلاً مركز الرشود، أرغب في حجز موعد صيانة لسيارتي.";
    const whatsappLink = `https://wa.me/966${SITE_CONFIG.site.whatsapp.substring(1)}?text=${encodeURIComponent(prefilledMessage)}`;

    return (
        <>
            <div className="bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-headline font-bold">احجز موعدك عبر واتساب</h1>
                    <p className="mt-2 text-lg max-w-2xl mx-auto">
                        نحن نفضل التواصل المباشر والسريع! اضغط على الزر أدناه للتحدث مع فريقنا مباشرة عبر واتساب وحجز موعدك بكل سهولة.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[40vh]">
                <Card className="w-full max-w-lg text-center p-8 shadow-xl">
                    <CardContent className="flex flex-col items-center">
                        <WhatsAppIcon className="h-16 w-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-headline font-bold">تواصل معنا مباشرة</h2>
                        <p className="text-muted-foreground mt-2">
                            فريقنا جاهز للرد على استفساراتك وتأكيد حجزك عبر واتساب.
                        </p>
                        <Button asChild size="lg" className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold text-lg w-full max-w-xs" onClick={reportConversion}>
                            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <WhatsAppIcon className="ml-3 h-6 w-6" />
                                احجز الآن عبر واتساب
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

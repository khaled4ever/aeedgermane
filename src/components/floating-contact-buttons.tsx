'use client';

import { Phone } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/app/config';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.75 13.96c.27.13.42.26.5.41.1.15.15.33.14.54-.01.3-.11.58-.26.82-.15.24-.39.46-.7.65-.3.2-.66.36-1.07.45-.41.1-.85.1-1.3.05-.45-.05-.9-.15-1.35-.3-.45-.15-.88-.35-1.3-.55s-.8-.45-1.15-.7c-.35-.25-.65-.5-1-.75-.3-.25-.55-.5-.8-.75-.25-.25-.45-.5-.6-.7-.15-.2-.25-.4-.35-.55-.1-.15-.15-.3-.2-.4s-.1-.35-.1-.5.05-.35.1-.5c.05-.15.15-.25.3-.35s.3-.15.5-.15c.2-.05.4,0,.6.05.2.05.4.1.6.15s.4.1.6.15c.2.05.35.05.5,0,.15,0,.3-.05.4-.15s.2-.2.25-.35c.05-.15.05-.3,0-.5-.05-.15-.1-.3-.2-.45s-.15-.3-.25-.4c-.1-.1-.25-.2-.35-.25-.1-.05-.2,0-.3.05-.1,0-.2.05-.3.05-.1,0-.2,0-.3-.05-.1,0-.2,0-.3-.05s-.2,0-.3,0c-.1,0-.2,0-.3,0h-.3c-.6,0-1.15.15-1.65.45-.5.3-.85.7-1.1 1.2-.25.5-.35 1.05-.35 1.6,0,.6.1 1.2.3 1.7.2.5.5.95.9 1.35.4.4.85.75 1.35 1.05.5.3,1.05.5,1.6.65.55.15,1.1.2,1.7.2.6,0,1.2-.05,1.75-.15s1.05-.25,1.5-.5c.45-.2.85-.5,1.15-.8.3-.3.55-.65.7-.95.15-.3.25-.65.3-.95.05-.3.05-.6,0-.85-.05-.25-.15-.45-.3-.6-.1-.15-.25-.25-.45-.35-.2-.1-.45-.1-.65-.05zM20.1 3.9C17.9 1.7 15 .5 12 .5 5.9.5.5 5.9.5 12c0 2.1.6 4.1 1.6 5.9L.6 23.4l5.6-1.5c1.8 1 3.8 1.5 5.8 1.5h.1c6.1 0 11.5-5.4 11.5-11.5 0-3-1.2-5.9-3.4-8.1zm-8.1 18c-1.8 0-3.6-.5-5.1-1.5l-.4-.2-3.8 1 1-3.7-.2-.4c-1-1.5-1.6-3.4-1.6-5.4C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
    </svg>
);

export function FloatingContactButtons() {
    // Assuming Saudi Arabia country code +966
    const fullPhoneNumber = `+966${SITE_CONFIG.site.phone.substring(1)}`;
    const whatsappLink = `https://wa.me/966${SITE_CONFIG.site.whatsapp.substring(1)}`;

    return (
        <>
            {/* Mobile: Full-width bar at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden">
                <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 bg-green-500 text-white transition-colors hover:bg-green-600"
                    aria-label="تواصل معنا عبر الواتساب"
                >
                    <WhatsAppIcon />
                    <span className="font-semibold">واتساب</span>
                </Link>
                <div className="w-px bg-white/20"></div>
                <Link
                    href={`tel:${fullPhoneNumber}`}
                    className="flex flex-1 items-center justify-center gap-2 bg-blue-500 text-white transition-colors hover:bg-blue-600"
                    aria-label="اتصل بنا"
                >
                    <Phone className="h-6 w-6" />
                    <span className="font-semibold">اتصال</span>
                </Link>
            </div>

            {/* Desktop: Circular floating buttons */}
            <div className="fixed bottom-6 left-6 z-50 hidden flex-col gap-3 md:flex">
                <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
                    aria-label="تواصل معنا عبر الواتساب"
                >
                    <WhatsAppIcon />
                </Link>
                <Link
                    href={`tel:${fullPhoneNumber}`}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-600"
                    aria-label="اتصل بنا"
                >
                    <Phone className="h-7 w-7" />
                </Link>
            </div>
        </>
    );
}

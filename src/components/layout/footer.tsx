"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/app/config";
import { Logo } from "@/components/icons";
import { Phone, Mail, MapPin } from "lucide-react";
import { reportGtagConversion } from "@/lib/google-ads";

export function Footer() {
  const quickLinkDetails = SITE_CONFIG.footer.quick_links
    .map(path => SITE_CONFIG.nav.find(item => item.path === path) || 
                  SITE_CONFIG.nav.flatMap(item => item.children || []).find(child => child.path === path))
    .filter(Boolean);

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-10 w-10 text-primary" />
              <span className="font-bold font-headline text-xl">{SITE_CONFIG.site.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm">{SITE_CONFIG.site.specialty}</p>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinkDetails.map(item => item && (
                <li key={item.path}>
                  <Link href={item.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span className="text-muted-foreground text-sm">{SITE_CONFIG.site.location.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href={`tel:${SITE_CONFIG.site.phone}`} onClick={reportGtagConversion} className="text-muted-foreground hover:text-primary transition-colors text-sm" dir="ltr">{SITE_CONFIG.site.phone}</a>
              </li>
               <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <path d="M16.75 13.96c.27.13.42.26.5.41.1.15.15.33.14.54-.01.3-.11.58-.26.82-.15.24-.39.46-.7.65-.3.2-.66.36-1.07.45-.41.1-.85.1-1.3.05-.45-.05-.9-.15-1.35-.3-.45-.15-.88-.35-1.3-.55s-.8-.45-1.15-.7c-.35-.25-.65-.5-1-.75-.3-.25-.55-.5-.8-.75-.25-.25-.45-.5-.6-.7-.15-.2-.25-.4-.35-.55-.1-.15-.15-.3-.2-.4s-.1-.35-.1-.5.05-.35.1-.5c.05-.15.15-.25.3-.35s.3-.15.5-.15c.2-.05.4,0,.6.05.2.05.4.1.6.15s.4.1.6.15c.2.05.35.05.5,0,.15,0,.3-.05.4-.15s.2-.2.25-.35c.05-.15.05-.3,0-.5-.05-.15-.1-.3-.2-.45s-.15-.3-.25-.4c-.1-.1-.25-.2-.35-.25-.1-.05-.2,0-.3.05-.1,0-.2.05-.3.05-.1,0-.2,0-.3-.05-.1,0-.2,0-.3-.05s-.2,0-.3,0c-.1,0-.2,0-.3,0h-.3c-.6,0-1.15.15-1.65.45-.5.3-.85.7-1.1 1.2-.25.5-.35 1.05-.35 1.6,0,.6.1 1.2.3 1.7.2.5.5.95.9 1.35.4.4.85.75 1.35 1.05.5.3,1.05.5,1.6.65.55.15,1.1.2,1.7.2.6,0,1.2-.05,1.75-.15s1.05-.25,1.5-.5c.45-.2.85-.5,1.15-.8.3-.3.55-.65.7-.95.15-.3.25-.65.3-.95.05-.3.05-.6,0-.85-.05-.25-.15-.45-.3-.6-.1-.15-.25-.25-.45-.35-.2-.1-.45-.1-.65-.05zM20.1 3.9C17.9 1.7 15 .5 12 .5 5.9.5.5 5.9.5 12c0 2.1.6 4.1 1.6 5.9L.6 23.4l5.6-1.5c1.8 1 3.8 1.5 5.8 1.5h.1c6.1 0 11.5-5.4 11.5-11.5 0-3-1.2-5.9-3.4-8.1zm-8.1 18c-1.8 0-3.6-.5-5.1-1.5l-.4-.2-3.8 1 1-3.7-.2-.4c-1-1.5-1.6-3.4-1.6-5.4C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"></path>
                </svg>
                <a href={`https://wa.me/${SITE_CONFIG.site.whatsapp}`} onClick={reportGtagConversion} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm" dir="ltr">{SITE_CONFIG.site.whatsapp}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-4 mb-2">
              {SITE_CONFIG.footer.legal_links && SITE_CONFIG.footer.legal_links.map(link => (
                  <Link key={link.path} href={link.path} className="hover:text-primary transition-colors">
                      {link.label}
                  </Link>
              ))}
          </div>
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.site.name}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

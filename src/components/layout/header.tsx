
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/app/config";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const prefilledMessage = "أهلاً مركز الرشود، أرغب في حجز موعد صيانة لسيارتي.";
  const whatsappLink = `https://wa.me/966${SITE_CONFIG.site.whatsapp.substring(1)}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-lg">{SITE_CONFIG.site.name}</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex md:items-center md:gap-6 md:ml-auto text-sm font-medium">
          {SITE_CONFIG.nav.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.path && <DropdownMenuItem asChild>
                    <Link href={item.path}>{item.label}</Link>
                  </DropdownMenuItem>}
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label} asChild>
                      <Link href={child.path}>{child.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:ml-auto">
          <Button asChild className="hidden md:flex">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">احجز موعد</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-lg">{SITE_CONFIG.site.name}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 mt-8 text-lg">
                  {SITE_CONFIG.nav.map((item) =>
                    item.children ? (
                      <Collapsible key={item.label}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold">
                          {item.label}
                          <ChevronDown className="h-5 w-5" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="flex flex-col gap-2 mt-2 pr-4 border-r-2 border-muted">
                            {item.path && (
                                <Link href={item.path} className="py-2 text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                                    {item.label}
                                </Link>
                            )}
                            {item.children.map((child) => (
                              <Link key={child.path} href={child.path} className="py-2 text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link key={item.path} href={item.path} className="font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
                <div className="mt-auto">
                  <Button asChild size="lg" className="w-full">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>احجز موعد</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

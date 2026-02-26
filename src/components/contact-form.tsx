"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { reportGtagConversion } from "@/lib/google-ads";

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "يجب أن تحتوي الرسالة على 10 أحرف على الأقل." }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);

    reportGtagConversion();
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
    toast({
      title: "تم إرسال الرسالة",
      description: "شكراً لتواصلك معنا، سنقوم بالرد في أقرب وقت ممكن.",
    });
  }

  if (isSubmitted) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[300px] bg-green-50/50 rounded-lg">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-headline font-bold">تم إرسال رسالتك بنجاح!</h2>
            <p className="text-muted-foreground mt-2">
                سنقوم بالرد عليك في أقرب وقت ممكن.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="mt-6">إرسال رسالة أخرى</Button>
        </div>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input placeholder="الاسم الكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف (اختياري)</FormLabel>
              <FormControl>
                <Input placeholder="05xxxxxxxx" {...field} dir="ltr" className="text-right"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رسالتك</FormLabel>
              <FormControl>
                <Textarea placeholder="اكتب رسالتك هنا..." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
        </Button>
      </form>
    </Form>
  );
}

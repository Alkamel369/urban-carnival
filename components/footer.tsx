"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()

  const footerLinks = {
    platform: [
      { href: "/courses", label: language === "ar" ? "الدورات" : "Courses" },
      { href: "/about", label: language === "ar" ? "من نحن" : "About Us" },
      { href: "/help", label: language === "ar" ? "المساعدة" : "Help" },
      { href: "/contact", label: language === "ar" ? "اتصل بنا" : "Contact" },
      { href: "/faq", label: language === "ar" ? "الأسئلة الشائعة" : "FAQ" },
    ],
    courses: [
      {
        href: "/courses/us-citizenship-2025",
        label: language === "ar" ? "اختبار الجنسية الأمريكية" : "US Citizenship Test",
      },
      {
        href: "/courses/first-aid-essentials",
        label: language === "ar" ? "الإسعافات الأولية" : "First Aid Essentials",
      },
    ],
    legal: [
      { href: "/privacy", label: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy" },
      { href: "/terms", label: language === "ar" ? "شروط الاستخدام" : "Terms of Service" },
      { href: "/cookies", label: language === "ar" ? "سياسة الكوكيز" : "Cookie Policy" },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {language === "ar" ? "منصة التعليم" : "EduPlatform"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === "ar"
                ? "منصة تعليمية متطورة توفر دورات عالية الجودة باللغتين العربية والإنجليزية"
                : "An advanced educational platform providing high-quality courses in Arabic and English"}
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{language === "ar" ? "المنصة" : "Platform"}</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{language === "ar" ? "الدورات" : "Courses"}</h4>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{language === "ar" ? "تواصل معنا" : "Contact Us"}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>info@eduplatform.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{language === "ar" ? "الولايات المتحدة الأمريكية" : "United States"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            {language === "ar" ? "منصة التعليم. جميع الحقوق محفوظة." : "EduPlatform. All rights reserved."}
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

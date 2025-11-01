"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Globe, Award, Headphones } from "lucide-react"

export function FeaturesSection() {
  const { language } = useLanguage()

  const features = [
    {
      icon: Zap,
      title: {
        en: "Interactive Learning",
        ar: "تعلم تفاعلي",
      },
      description: {
        en: "Engage with gamified lessons and interactive exercises designed to keep you motivated.",
        ar: "تفاعل مع دروس ممتعة وتمارين تفاعلية مصممة للحفاظ على حماسك.",
      },
    },
    {
      icon: Globe,
      title: {
        en: "Bilingual Support",
        ar: "دعم ثنائي اللغة",
      },
      description: {
        en: "Learn in your preferred language with full Arabic and English support.",
        ar: "تعلم بلغتك المفضلة مع دعم كامل للعربية والإنجليزية.",
      },
    },
    {
      icon: Award,
      title: {
        en: "Certified Courses",
        ar: "دورات معتمدة",
      },
      description: {
        en: "Earn certificates upon completion that are recognized and valued.",
        ar: "احصل على شهادات معترف بها وذات قيمة عند إكمال الدورات.",
      },
    },
    {
      icon: Headphones,
      title: {
        en: "Audio Learning",
        ar: "تعلم صوتي",
      },
      description: {
        en: "Listen and learn with high-quality audio pronunciations and explanations.",
        ar: "استمع وتعلم مع نطق صوتي عالي الجودة وشروحات واضحة.",
      },
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Why Choose Our Platform?" : "لماذا تختار منصتنا؟"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Experience a modern learning platform designed with your success in mind"
              : "اختبر منصة تعليمية حديثة مصممة لنجاحك"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title[language]}</h3>
                <p className="text-muted-foreground">{feature.description[language]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

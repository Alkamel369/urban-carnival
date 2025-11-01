"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{language === "en" ? "New Courses Available" : "دورات جديدة متاحة"}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">{t("heroTitle")}</h1>

          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">{t("heroSubtitle")}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2 group">
              <Link href="/courses">
                {t("exploreCourses")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">{t("getStarted")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24K+</div>
              <div className="text-sm text-muted-foreground">{language === "en" ? "Active Students" : "طالب نشط"}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">{language === "en" ? "Lessons" : "درس"}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Average Rating" : "متوسط التقييم"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

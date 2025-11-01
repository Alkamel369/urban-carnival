"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { CourseCard } from "@/components/course-card"
import { coursesData } from "@/lib/courses-data"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CoursesPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description[language].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    return matchesSearch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("courses")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === "en"
              ? "Explore our comprehensive course catalog and start your learning journey today"
              : "استكشف كتالوج الدورات الشامل لدينا وابدأ رحلتك التعليمية اليوم"}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ltr:pl-10 rtl:pr-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                <SelectValue placeholder={t("level")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="beginner">{t("beginner")}</SelectItem>
                <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                <SelectItem value="advanced">{t("advanced")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container">
          {filteredCourses.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                {language === "en"
                  ? `Showing ${filteredCourses.length} course${filteredCourses.length !== 1 ? "s" : ""}`
                  : `عرض ${filteredCourses.length} دورة`}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {language === "en" ? "No courses found" : "لم يتم العثور على دورات"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

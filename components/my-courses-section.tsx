"use client"

import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"
import { useLanguage } from "@/contexts/language-context"
import { courses } from "@/lib/courses-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Clock, Award, ArrowRight } from "lucide-react"

export function MyCoursesSection() {
  const { user } = useAuth()
  const { enrolledCourses, getCourseProgress } = useProgress()
  const { language } = useLanguage()

  if (!user || enrolledCourses.length === 0) {
    return null
  }

  const myCourses = courses.filter((course) => enrolledCourses.includes(course.id))

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{language === "ar" ? "دوراتي" : "My Courses"}</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              {language === "ar" ? "عرض الكل" : "View All"}
              <ArrowRight className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => {
            const progress = getCourseProgress(course.id)
            const progressPercentage = progress?.progress || 0

            return (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${course.color} text-2xl shrink-0`}
                    >
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{course.title[language]}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description[language]}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{language === "ar" ? "التقدم" : "Progress"}</span>
                      <span className="font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{progress?.totalXP || 0} XP</span>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.id}`}>
                      <BookOpen className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                      {language === "ar" ? "متابعة التعلم" : "Continue Learning"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

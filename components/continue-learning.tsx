"use client"

import { useProgress } from "@/contexts/progress-context"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { courses } from "@/lib/courses-data"

export function ContinueLearning() {
  const { user } = useAuth()
  const { getLastAccessedCourse } = useProgress()
  const { t } = useLanguage()

  if (!user) return null

  const lastCourse = getLastAccessedCourse()
  if (!lastCourse) return null

  const courseData = courses.find((c) => c.id === lastCourse.courseId)
  if (!courseData) return null

  // Determine the continue URL based on course type
  let continueUrl = `/courses/${courseData.id}`
  if (lastCourse.lastLessonId) {
    if (courseData.id === "us-citizenship-2025") {
      continueUrl = `/courses/us-citizenship-2025/learn/${lastCourse.lastLessonId}`
    } else if (courseData.id === "first-aid-essentials") {
      continueUrl = `/courses/first-aid-essentials/learn/${lastCourse.lastLessonId}`
    }
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{t("continueWhere")}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t("lang") === "ar" ? courseData.titleAr : courseData.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {Math.round(lastCourse.progress)}% {t("complete")}
            </p>
            <Link href={continueUrl}>
              <Button className="gap-2">
                <BookOpen className="h-4 w-4" />
                {t("continueLearning")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{lastCourse.xp}</div>
            <div className="text-sm text-muted-foreground">XP</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

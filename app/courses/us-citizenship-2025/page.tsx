"use client"

import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Clock, Star, Users, Trophy, Zap, Lock, CheckCircle2, Play } from "lucide-react"
import { citizenshipCategories, getLessonsByCategory } from "@/lib/citizenship-questions"

export default function USCitizenshipCoursePage() {
  const { t, language } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const { isEnrolled, enrollInCourse, getCourseProgress } = useProgress()
  const router = useRouter()

  const courseId = "us-citizenship-2025"
  const enrolled = isEnrolled(courseId)
  const courseProgress = getCourseProgress(courseId)

  const lessonsByCategory = getLessonsByCategory()

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    enrollInCourse(courseId)
  }

  const getCategoryStatus = (categoryId: string) => {
    if (!courseProgress) return "locked"

    const completedLessons = courseProgress.completedLessons.filter((id) => id.startsWith(categoryId))
    const totalLessons = lessonsByCategory.get(categoryId)?.totalQuestions || 0

    if (completedLessons.length === totalLessons) return "completed"
    if (completedLessons.length > 0) return "current"

    const categoryIndex = citizenshipCategories.findIndex((c) => c.id === categoryId)
    if (categoryIndex === 0) return "current"

    const prevCategory = citizenshipCategories[categoryIndex - 1]
    const prevCompleted = courseProgress.completedLessons.filter((id) => id.startsWith(prevCategory.id))
    const prevTotal = lessonsByCategory.get(prevCategory.id)?.totalQuestions || 0

    return prevCompleted.length === prevTotal ? "current" : "locked"
  }

  const totalLessons = Array.from(lessonsByCategory.values()).reduce((sum, cat) => sum + cat.totalQuestions, 0)
  const completedLessons = courseProgress?.completedLessons.length || 0
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Course Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {language === "en" ? "2025 Updated" : "محدث 2025"}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === "en" ? "US Citizenship Test Preparation" : "التحضير لاختبار الجنسية الأمريكية"}
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                {language === "en"
                  ? "Master all 128 civics questions with interactive lessons, audio support, and gamified learning"
                  : "أتقن جميع الأسئلة المدنية الـ 128 مع دروس تفاعلية ودعم صوتي وتعلم ممتع"}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                  <span className="font-medium">4.9 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>15,420 {t("students")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>128 {t("lessons")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>8 weeks</span>
                </div>
              </div>

              {enrolled ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#lessons">{t("continue")}</Link>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" onClick={handleEnroll}>
                  {t("enroll")}
                </Button>
              )}
            </div>

            {enrolled && courseProgress && (
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{language === "en" ? "Your Progress" : "تقدمك"}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{language === "en" ? "Overall Progress" : "التقدم الإجمالي"}</span>
                        <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-2 bg-white/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                          <Trophy className="h-5 w-5 text-yellow-300" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{courseProgress.xp}</div>
                          <div className="text-xs text-blue-100">XP Points</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                          <Zap className="h-5 w-5 text-orange-300" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{completedLessons}</div>
                          <div className="text-xs text-blue-100">Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="lessons" className="py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {language === "en" ? "Your Learning Path" : "مسار التعلم الخاص بك"}
            </h2>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Complete each unit to unlock the next. Practice makes perfect!"
                : "أكمل كل وحدة لفتح التالية. الممارسة تصنع الكمال!"}
            </p>
          </div>

          <div className="space-y-6">
            {citizenshipCategories.map((category) => {
              const lesson = lessonsByCategory.get(category.id)
              const status = getCategoryStatus(category.id)
              const isLocked = status === "locked"
              const isCompleted = status === "completed"
              const isCurrent = status === "current"

              const categoryLessons =
                courseProgress?.completedLessons.filter((id) => id.startsWith(category.id)).length || 0
              const totalCategoryLessons = lesson?.totalQuestions || 0
              const categoryProgress = totalCategoryLessons > 0 ? (categoryLessons / totalCategoryLessons) * 100 : 0

              return (
                <Card
                  key={category.id}
                  className={`transition-all ${
                    isLocked ? "opacity-60" : "hover:shadow-lg"
                  } ${isCurrent ? "ring-2 ring-primary" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-3xl`}
                      >
                        {category.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{category.title[language]}</h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson?.totalQuestions} {t("lessons")}
                            </p>
                          </div>

                          {isCompleted && <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />}
                          {isLocked && <Lock className="h-6 w-6 text-muted-foreground shrink-0" />}
                        </div>

                        {enrolled && !isLocked && (
                          <div className="mb-4">
                            <Progress value={categoryProgress} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          {isLocked ? (
                            <Button disabled variant="outline" size="sm">
                              <Lock className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                              {language === "en" ? "Locked" : "مقفل"}
                            </Button>
                          ) : !enrolled ? (
                            <Button size="sm" onClick={handleEnroll}>
                              {t("enroll")}
                            </Button>
                          ) : isCompleted ? (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/courses/us-citizenship-2025/learn/${category.id}`}>
                                {language === "en" ? "Review" : "مراجعة"}
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" asChild>
                              <Link href={`/courses/us-citizenship-2025/learn/${category.id}`}>
                                <Play className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                                {isCurrent ? t("continue") : language === "en" ? "Start" : "ابدأ"}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

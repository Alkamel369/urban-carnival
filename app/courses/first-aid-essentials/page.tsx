"use client"

import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Clock, Star, Users, PlayCircle, FileText, CheckCircle2, Lock, Award } from "lucide-react"
import { firstAidModules } from "@/lib/first-aid-data"

export default function FirstAidCoursePage() {
  const { t, language } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const { isEnrolled, enrollInCourse, getCourseProgress } = useProgress()
  const router = useRouter()

  const courseId = "first-aid-essentials"
  const enrolled = isEnrolled(courseId)
  const courseProgress = getCourseProgress(courseId)
  const completedLessons = courseProgress?.completedLessons || []

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    enrollInCourse(courseId)
  }

  const totalLessons = firstAidModules.reduce((sum, module) => sum + module.lessons.length, 0)
  const totalProgress = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0

  const getModuleProgress = (moduleId: string) => {
    const module = firstAidModules.find((m) => m.id === moduleId)
    if (!module) return 0
    const moduleLessons = module.lessons.length
    const completed = completedLessons.filter((id) => module.lessons.some((l) => l.id === id)).length
    return moduleLessons > 0 ? (completed / moduleLessons) * 100 : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Course Header */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {language === "en" ? "Certified Course" : "دورة معتمدة"}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === "en" ? "First Aid Essentials" : "أساسيات الإسعافات الأولية"}
              </h1>
              <p className="text-lg text-red-100 mb-6">
                {language === "en"
                  ? "Learn life-saving first aid techniques through comprehensive video lessons and practical demonstrations"
                  : "تعلم تقنيات الإسعافات الأولية المنقذة للحياة من خلال دروس فيديو شاملة وعروض عملية"}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                  <span className="font-medium">4.8 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>8,930 {t("students")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>24 {t("lessons")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>6 weeks</span>
                </div>
              </div>

              {enrolled ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#modules">{t("continue")}</Link>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" onClick={handleEnroll}>
                  {t("enroll")}
                </Button>
              )}
            </div>

            {enrolled && (
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{language === "en" ? "Your Progress" : "تقدمك"}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{language === "en" ? "Course Completion" : "إكمال الدورة"}</span>
                        <span className="text-sm font-medium">{Math.round(totalProgress)}%</span>
                      </div>
                      <Progress value={totalProgress} className="h-2 bg-white/20" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Award className="h-8 w-8 text-yellow-300" />
                      <div>
                        <div className="font-medium">
                          {language === "en" ? "Certificate Available" : "الشهادة متاحة"}
                        </div>
                        <div className="text-sm text-red-100">
                          {language === "en" ? "Upon course completion" : "عند إكمال الدورة"}
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

      {/* Course Modules */}
      <section id="modules" className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{language === "en" ? "Course Curriculum" : "منهج الدورة"}</h2>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Comprehensive modules covering all essential first aid skills"
                : "وحدات شاملة تغطي جميع مهارات الإسعافات الأولية الأساسية"}
            </p>
          </div>

          <div className="space-y-6">
            {firstAidModules.map((module, index) => {
              const moduleProgress = getModuleProgress(module.id)
              const isLocked = !enrolled || (index > 0 && getModuleProgress(firstAidModules[index - 1].id) < 100)
              const allLessonsCompleted = moduleProgress === 100

              return (
                <Card key={module.id} className={isLocked ? "opacity-60" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">
                            {language === "en" ? "Module" : "وحدة"} {module.order}
                          </Badge>
                          {allLessonsCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <CardTitle className="text-2xl mb-2">{module.title[language]}</CardTitle>
                        <p className="text-muted-foreground">{module.description[language]}</p>
                      </div>
                    </div>
                    {enrolled && !isLocked && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">{language === "en" ? "Progress" : "التقدم"}</span>
                          <span className="font-medium">{Math.round(moduleProgress)}%</span>
                        </div>
                        <Progress value={moduleProgress} className="h-2" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.id)

                        return (
                          <Link
                            key={lesson.id}
                            href={isLocked ? "#" : `/courses/first-aid-essentials/learn/${lesson.id}`}
                            className={`block ${isLocked ? "pointer-events-none" : ""}`}
                          >
                            <div
                              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                                isLocked ? "bg-muted/50" : "hover:border-primary hover:bg-primary/5"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                  isCompleted ? "bg-green-100 dark:bg-green-950" : "bg-muted"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                ) : lesson.type === "video" ? (
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="font-medium mb-1">{lesson.title[language]}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-3">
                                  <span className="capitalize">{lesson.type}</span>
                                  <span>•</span>
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <Award className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{language === "en" ? "Earn Your Certificate" : "احصل على شهادتك"}</h2>
          <p className="text-lg text-muted-foreground mb-6">
            {language === "en"
              ? "Complete all modules to receive a verified certificate of completion that you can share with employers and on social media"
              : "أكمل جميع الوحدات للحصول على شهادة إتمام موثقة يمكنك مشاركتها مع أصحاب العمل وعلى وسائل التواصل الاجتماعي"}
          </p>
        </div>
      </section>
    </div>
  )
}

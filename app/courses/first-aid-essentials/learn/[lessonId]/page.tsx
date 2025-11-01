"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useProgress } from "@/contexts/progress-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { firstAidModules, type FirstAidLesson } from "@/lib/first-aid-data"
import { X, CheckCircle2, ArrowRight, ArrowLeft, PlayCircle } from "lucide-react"
import Link from "next/link"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { updateProgress, getCourseProgress, setLastLesson } = useProgress()
  const lessonId = params.lessonId as string

  const courseProgress = getCourseProgress("first-aid-essentials")
  const isAlreadyCompleted = courseProgress?.completedLessons.includes(lessonId) || false
  const [isCompleted, setIsCompleted] = useState(isAlreadyCompleted)

  // Find the lesson and module
  let currentLesson: FirstAidLesson | undefined
  let currentModule
  let allLessons: FirstAidLesson[] = []

  for (const module of firstAidModules) {
    allLessons = [...allLessons, ...module.lessons]
    const lesson = module.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      currentLesson = lesson
      currentModule = module
      break
    }
  }

  useEffect(() => {
    const progress = getCourseProgress("first-aid-essentials")
    setIsCompleted(progress?.completedLessons.includes(lessonId) || false)
    if (currentLesson) {
      setLastLesson("first-aid-essentials", lessonId, `/courses/first-aid-essentials/learn/${lessonId}`)
    }
  }, [lessonId, getCourseProgress, setLastLesson, currentLesson])

  if (!currentLesson || !currentModule) {
    return null
  }

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const nextLesson = allLessons[currentIndex + 1]
  const prevLesson = allLessons[currentIndex - 1]

  const handleComplete = () => {
    if (!isCompleted) {
      updateProgress("first-aid-essentials", lessonId, 15)
      setIsCompleted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/courses/first-aid-essentials")}>
              <X className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-2xl">
              <div className="text-sm text-muted-foreground mb-1">{currentModule.title[language]}</div>
              <Progress value={isCompleted ? 100 : 50} className="h-2" />
            </div>

            {isCompleted && <CheckCircle2 className="h-6 w-6 text-green-500" />}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container max-w-5xl py-8">
        <div className="space-y-6">
          {/* Lesson Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentLesson.title[language]}</h1>
            <p className="text-lg text-muted-foreground">{currentLesson.description[language]}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="capitalize">{currentLesson.type}</span>
              <span>•</span>
              <span>{currentLesson.duration}</span>
            </div>
          </div>

          {/* Video Player or Content */}
          {currentLesson.type === "video" ? (
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircle className="h-20 w-20 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">{language === "en" ? "Video Player" : "مشغل الفيديو"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  {currentLesson.content?.[language] ||
                    (language === "en"
                      ? "This is a reading lesson. In a real implementation, this would contain comprehensive educational content about the topic."
                      : "هذا درس قراءة. في التطبيق الحقيقي، سيحتوي هذا على محتوى تعليمي شامل حول الموضوع.")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Lesson Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {prevLesson && (
                    <Button variant="outline" asChild>
                      <Link href={`/courses/first-aid-essentials/learn/${prevLesson.id}`}>
                        <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                        {language === "en" ? "Previous" : "السابق"}
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!isCompleted && (
                    <Button onClick={handleComplete}>
                      <CheckCircle2 className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                      {language === "en" ? "Mark as Complete" : "وضع علامة كمكتمل"}
                    </Button>
                  )}

                  {nextLesson ? (
                    <Button asChild>
                      <Link href={`/courses/first-aid-essentials/learn/${nextLesson.id}`}>
                        {language === "en" ? "Next Lesson" : "الدرس التالي"}
                        <ArrowRight className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link href="/courses/first-aid-essentials">
                        {language === "en" ? "Back to Course" : "العودة إلى الدورة"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useProgress } from "@/contexts/progress-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { citizenshipCategories, citizenshipQuestions } from "@/lib/citizenship-questions"
import { Volume2, X, Check, Trophy, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LearnCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { updateProgress, setLastLesson } = useProgress()
  const categoryId = params.category as string

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const category = citizenshipCategories.find((c) => c.id === categoryId)
  const questions = citizenshipQuestions.filter((q) => q.category === categoryId)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  useEffect(() => {
    if (!category) {
      router.push("/courses/us-citizenship-2025")
    }
    if (category) {
      setLastLesson("us-citizenship-2025", categoryId, `/courses/us-citizenship-2025/learn/${categoryId}`)
    }
  }, [category, router, categoryId, setLastLesson])

  if (!category || !currentQuestion) {
    return null
  }

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const correct = answer === currentQuestion.answer[language]
    setIsCorrect(correct)

    if (correct) {
      const xp = 10
      setEarnedXP((prev) => prev + xp)
      updateProgress("us-citizenship-2025", `${categoryId}-q${currentQuestion.id}`, xp)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      setIsCompleted(true)
    }
  }

  const playAudio = () => {
    // Placeholder for audio functionality
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question.en)
    utterance.lang = "en-US"
    window.speechSynthesis.speak(utterance)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">{language === "en" ? "Lesson Complete!" : "الدرس مكتمل!"}</h2>
              <p className="text-muted-foreground">
                {language === "en" ? "Great job! You've completed this unit." : "عمل رائع! لقد أكملت هذه الوحدة."}
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">+{earnedXP}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mx-auto mb-2">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-500">{questions.length}</div>
                <div className="text-xs text-muted-foreground">{language === "en" ? "Questions" : "أسئلة"}</div>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/courses/us-citizenship-2025">
                  {language === "en" ? "Continue Learning" : "متابعة التعلم"}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard">{language === "en" ? "Go to Dashboard" : "الذهاب إلى لوحة التحكم"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/courses/us-citizenship-2025")}>
              <X className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-2xl">
              <Progress value={progress} className="h-3" />
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>{earnedXP} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container max-w-3xl py-12">
        <div className="space-y-8">
          {/* Category Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-2xl`}
            >
              {category.icon}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Question" : "سؤال"} {currentQuestionIndex + 1} / {questions.length}
              </div>
              <div className="font-medium">{category.title[language]}</div>
            </div>
          </div>

          {/* Question Card */}
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-balance">{currentQuestion.question[language]}</h2>
                  <Button variant="outline" size="icon" onClick={playAudio} className="shrink-0 bg-transparent">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.options?.[language].map((option, index) => {
                    const isSelected = selectedAnswer === option
                    const isCorrectAnswer = option === currentQuestion.answer[language]
                    const showCorrect = isAnswered && isCorrectAnswer
                    const showIncorrect = isAnswered && isSelected && !isCorrect

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={isAnswered}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 text-left transition-all",
                          "hover:border-primary hover:bg-primary/5",
                          "disabled:cursor-not-allowed",
                          !isAnswered && "border-border",
                          showCorrect && "border-green-500 bg-green-50 dark:bg-green-950",
                          showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950",
                          isSelected && !isAnswered && "border-primary bg-primary/5",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium">{option}</span>
                          {showCorrect && <Check className="h-5 w-5 text-green-500 shrink-0" />}
                          {showIncorrect && <X className="h-5 w-5 text-red-500 shrink-0" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <Card
              className={cn(
                "border-2",
                isCorrect
                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                  : "border-red-500 bg-red-50 dark:bg-red-950",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        isCorrect ? "bg-green-500" : "bg-red-500",
                      )}
                    >
                      {isCorrect ? <Check className="h-6 w-6 text-white" /> : <X className="h-6 w-6 text-white" />}
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-bold text-lg",
                          isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300",
                        )}
                      >
                        {isCorrect
                          ? language === "en"
                            ? "Correct!"
                            : "صحيح!"
                          : language === "en"
                            ? "Incorrect"
                            : "خطأ"}
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-muted-foreground">
                          {language === "en" ? "Correct answer: " : "الإجابة الصحيحة: "}
                          <span className="font-medium">{currentQuestion.answer[language]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleNext} size="lg">
                    {currentQuestionIndex < questions.length - 1
                      ? language === "en"
                        ? "Next"
                        : "التالي"
                      : language === "en"
                        ? "Complete"
                        : "إنهاء"}
                    <ArrowRight className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

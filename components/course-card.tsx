"use client"

import Link from "next/link"
import Image from "next/image"
import type { Course } from "@/lib/types"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Star, Clock } from "lucide-react"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { t, language } = useLanguage()

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/courses/${course.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title[language]}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-3 ltr:right-3 rtl:left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {t(course.level)}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-5">
        <Link href={`/courses/${course.id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title[language]}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description[language]}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{course.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({course.studentsCount.toLocaleString()} {t("students")})
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>
              {course.lessonsCount} {t("lessons")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>{t("enroll")}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  language: "en" | "ar"
  enrolledCourses: string[]
  progress: Record<string, CourseProgress>
}

export interface CourseProgress {
  courseId: string
  completedLessons: string[]
  currentLesson: string
  score: number
  lastAccessed: Date
}

export interface Course {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  instructor: { en: string; ar: string }
  thumbnail: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  lessonsCount: number
  studentsCount: number
  rating: number
  type: "duolingo" | "edraak"
}

export interface Lesson {
  id: string
  courseId: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  order: number
  type: "video" | "quiz" | "interactive" | "reading"
  duration: string
  content: any
}

export type Language = "en" | "ar"

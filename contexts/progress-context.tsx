"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface CourseProgress {
  courseId: string
  progress: number
  completedLessons: string[]
  xp: number
  lastAccessed: Date
  lastLessonId?: string
}

interface Achievement {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: string
  unlockedAt?: Date
}

interface ProgressContextType {
  enrolledCourses: CourseProgress[]
  totalXP: number
  streak: number
  achievements: Achievement[]
  enrollInCourse: (courseId: string) => void
  updateProgress: (courseId: string, lessonId: string, xpGained: number) => void
  getCourseProgress: (courseId: string) => CourseProgress | undefined
  isEnrolled: (courseId: string) => boolean
  getLastAccessedCourse: () => CourseProgress | undefined
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<CourseProgress[]>([])
  const [totalXP, setTotalXP] = useState(0)
  const [streak, setStreak] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress")
    if (savedProgress) {
      const data = JSON.parse(savedProgress)
      setEnrolledCourses(data.enrolledCourses || [])
      setTotalXP(data.totalXP || 0)
      setStreak(data.streak || 0)
      setAchievements(data.achievements || [])
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "userProgress",
      JSON.stringify({
        enrolledCourses,
        totalXP,
        streak,
        achievements,
      }),
    )
  }, [enrolledCourses, totalXP, streak, achievements])

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.find((c) => c.courseId === courseId)) {
      setEnrolledCourses([
        ...enrolledCourses,
        {
          courseId,
          progress: 0,
          completedLessons: [],
          xp: 0,
          lastAccessed: new Date(),
        },
      ])
    }
  }

  const updateProgress = (courseId: string, lessonId: string, xpGained: number) => {
    setEnrolledCourses((courses) =>
      courses.map((course) => {
        if (course.courseId === courseId) {
          const completedLessons = course.completedLessons.includes(lessonId)
            ? course.completedLessons
            : [...course.completedLessons, lessonId]

          return {
            ...course,
            completedLessons,
            xp: course.xp + xpGained,
            lastAccessed: new Date(),
            lastLessonId: lessonId,
          }
        }
        return course
      }),
    )
    setTotalXP((prev) => prev + xpGained)
  }

  const getCourseProgress = (courseId: string) => {
    return enrolledCourses.find((c) => c.courseId === courseId)
  }

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some((c) => c.courseId === courseId)
  }

  const getLastAccessedCourse = () => {
    if (enrolledCourses.length === 0) return undefined
    return enrolledCourses.reduce((latest, current) => {
      return new Date(current.lastAccessed) > new Date(latest.lastAccessed) ? current : latest
    })
  }

  return (
    <ProgressContext.Provider
      value={{
        enrolledCourses,
        totalXP,
        streak,
        achievements,
        enrollInCourse,
        updateProgress,
        getCourseProgress,
        isEnrolled,
        getLastAccessedCourse,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider")
  }
  return context
}

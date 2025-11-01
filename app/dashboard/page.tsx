"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useProgress } from "@/contexts/progress-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, Flame, Star, ArrowRight, Clock, TrendingUp } from "lucide-react"
import { courses } from "@/lib/courses-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const { t, language } = useLanguage()
  const { enrolledCourses, totalXP, streak, achievements } = useProgress()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const enrolledCoursesData = enrolledCourses
    .map((ec) => {
      const course = courses.find((c) => c.id === ec.courseId)
      return { ...ec, course }
    })
    .filter((ec) => ec.course)

  const stats = [
    {
      icon: Star,
      label: t.dashboard?.totalXP || "Total XP",
      value: totalXP.toLocaleString(),
      color: "text-yellow-500",
    },
    {
      icon: Flame,
      label: t.dashboard?.streak || "Day Streak",
      value: streak,
      color: "text-orange-500",
    },
    {
      icon: BookOpen,
      label: t.dashboard?.coursesEnrolled || "Courses Enrolled",
      value: enrolledCourses.length,
      color: "text-blue-500",
    },
    {
      icon: Trophy,
      label: t.dashboard?.achievements || "Achievements",
      value: achievements.length,
      color: "text-purple-500",
    },
  ]

  const xpChartData = enrolledCoursesData.map(({ course, xp }) => ({
    name: language === "ar" ? course!.titleAr : course!.title,
    xp: xp,
  }))

  const completionChartData = enrolledCoursesData.map(({ course, completedLessons }) => ({
    name: language === "ar" ? course!.titleAr : course!.title,
    completed: completedLessons.length,
    total: course!.lessons,
    percentage: Math.round((completedLessons.length / course!.lessons) * 100),
  }))

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {language === "ar" ? `مرحباً، ${user?.name}` : `Welcome back, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground text-lg">{t.dashboard?.subtitle || "Continue your learning journey"}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {enrolledCoursesData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* XP Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {language === "ar" ? "نقاط الخبرة حسب الدورة" : "XP by Course"}
                </CardTitle>
                <CardDescription>
                  {language === "ar" ? "نقاط الخبرة المكتسبة في كل دورة" : "Experience points earned in each course"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={xpChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="xp" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Completion Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {language === "ar" ? "نسبة الإكمال" : "Completion Rate"}
                </CardTitle>
                <CardDescription>
                  {language === "ar" ? "تقدمك في كل دورة" : "Your progress in each course"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={completionChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="percentage"
                    >
                      {completionChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enrolled Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{t.dashboard?.myCourses || "My Courses"}</h2>
            <Button variant="outline" onClick={() => router.push("/courses")}>
              {t.dashboard?.browseCourses || "Browse Courses"}
            </Button>
          </div>

          {enrolledCoursesData.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">{t.dashboard?.noCoursesYet || "No courses yet"}</h3>
                <p className="text-muted-foreground mb-4">
                  {t.dashboard?.startLearning || "Start your learning journey by enrolling in a course"}
                </p>
                <Button onClick={() => router.push("/courses")}>
                  {t.dashboard?.exploreCourses || "Explore Courses"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCoursesData.map(({ course, progress, completedLessons, xp, lastAccessed }) => (
                <Card key={course!.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{language === "ar" ? course!.categoryAr : course!.category}</Badge>
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3" />
                        {xp} XP
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{language === "ar" ? course!.titleAr : course!.title}</CardTitle>
                    <CardDescription>{language === "ar" ? course!.descriptionAr : course!.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">{t.dashboard?.progress || "Progress"}</span>
                          <span className="font-semibold">
                            {completedLessons.length} / {course!.lessons} {t.dashboard?.lessons || "lessons"}
                          </span>
                        </div>
                        <Progress value={(completedLessons.length / course!.lessons) * 100} />
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {t.dashboard?.lastAccessed || "Last accessed"}:{" "}
                          {new Date(lastAccessed).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                        </span>
                      </div>

                      <Button className="w-full gap-2" onClick={() => router.push(`/courses/${course!.id}`)}>
                        {t.dashboard?.continue || "Continue Learning"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.dashboard?.achievements || "Achievements"}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="font-semibold text-sm">
                      {language === "ar" ? achievement.titleAr : achievement.title}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

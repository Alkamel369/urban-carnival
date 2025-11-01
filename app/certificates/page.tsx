"use client"

import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"
import { useLanguage } from "@/contexts/language-context"
import { courses } from "@/lib/courses-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Download, Calendar, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function CertificatesPage() {
  const { user } = useAuth()
  const { progress } = useProgress()
  const { t, language } = useLanguage()

  if (!user) {
    redirect("/login")
  }

  const completedCourses = courses.filter((course) => {
    const courseProgress = progress[course.id]
    return courseProgress?.completedLessons?.length >= (course.totalLessons || 0)
  })

  const handleDownloadCertificate = (courseId: string) => {
    // In a real app, this would generate and download a PDF certificate
    console.log("[v0] Downloading certificate for course:", courseId)
    alert(language === "ar" ? "سيتم تنزيل الشهادة قريباً" : "Certificate download coming soon")
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{language === "ar" ? "شهاداتي" : "My Certificates"}</h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "عرض وتحميل شهادات الدورات المكتملة"
              : "View and download your completed course certificates"}
          </p>
        </div>

        {completedCourses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <Award className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "ar" ? "لا توجد شهادات بعد" : "No Certificates Yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "ar"
                    ? "أكمل دورة للحصول على شهادتك الأولى"
                    : "Complete a course to earn your first certificate"}
                </p>
                <Button asChild>
                  <Link href="/courses">{language === "ar" ? "تصفح الدورات" : "Browse Courses"}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {completedCourses.map((course) => {
              const courseProgress = progress[course.id]
              const completionDate = courseProgress?.lastAccessed || new Date().toISOString()

              return (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {language === "ar" ? course.titleAr : course.title}
                        </CardTitle>
                        <CardDescription>
                          {language === "ar" ? course.descriptionAr : course.description}
                        </CardDescription>
                      </div>
                      <Award className="h-8 w-8 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{language === "ar" ? "مكتمل" : "Completed"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {language === "ar" ? "تاريخ الإكمال: " : "Completed on: "}
                        {new Date(completionDate).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                      </span>
                    </div>

                    <Button className="w-full gap-2" onClick={() => handleDownloadCertificate(course.id)}>
                      <Download className="h-4 w-4" />
                      {language === "ar" ? "تحميل الشهادة" : "Download Certificate"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

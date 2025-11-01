"use client"

import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CourseCard } from "@/components/course-card"
import { MyCoursesSection } from "@/components/my-courses-section"
import { ContinueLearning } from "@/components/continue-learning"
import { coursesData } from "@/lib/courses-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      <HeroSection />

      {user && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <ContinueLearning />
          </div>
        </section>
      )}

      {user && <MyCoursesSection />}

      <FeaturesSection />

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">Start your learning journey with our most popular courses</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex gap-2 group">
              <Link href="/courses">
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild className="gap-2 group">
              <Link href="/courses">
                View All Courses
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

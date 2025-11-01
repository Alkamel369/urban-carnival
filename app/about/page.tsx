import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Target, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description: "To provide accessible, high-quality education to learners worldwide in their preferred language.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "Building a supportive learning community where everyone can achieve their educational goals.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Maintaining the highest standards in course content, design, and learning experience.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Breaking language barriers with bilingual content in Arabic and English.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">About EduPlatform</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to make quality education accessible to everyone, regardless of language or location.
              Our innovative bilingual platform combines the best learning methodologies to create engaging, effective
              educational experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Start Learning Today</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners who are achieving their goals with our innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        'Simply browse our course catalog, select the course you want to take, and click the "Enroll Now" button. You\'ll need to create an account or log in to start learning.',
    },
    {
      question: "Are the courses really bilingual?",
      answer:
        "Yes! All our courses are available in both Arabic and English. You can switch between languages at any time using the language switcher in the navigation bar.",
    },
    {
      question: "How does the progress tracking work?",
      answer:
        "Your progress is automatically saved as you complete lessons and quizzes. You can view your overall progress, earned XP, and achievements in your dashboard.",
    },
    {
      question: "What is XP and how do I earn it?",
      answer:
        "XP (Experience Points) are earned by completing lessons, answering questions correctly, and finishing courses. XP helps track your learning journey and unlocks achievements.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktop computers.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes! Upon completing all lessons in a course, you'll receive a certificate of completion that you can download and share.",
    },
    {
      question: "How often is the content updated?",
      answer:
        "We regularly update our course content to ensure accuracy and relevance. For example, our US Citizenship Test course includes the latest 2025 questions.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Currently, we offer a web-based platform that works great on all devices. A dedicated mobile app is in our roadmap for future development.",
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Find answers to common questions about our platform</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

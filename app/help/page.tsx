"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BookOpen, MessageCircle, Mail, Search, HelpCircle } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import { useState } from "react"

export default function HelpPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: {
        en: "How do I enroll in a course?",
        ar: "كيف أسجل في دورة؟",
      },
      answer: {
        en: "To enroll in a course, navigate to the Courses page, select the course you're interested in, and click the 'Enroll Now' button. You'll need to be logged in to enroll.",
        ar: "للتسجيل في دورة، انتقل إلى صفحة الدورات، اختر الدورة التي تهمك، وانقر على زر 'سجل الآن'. ستحتاج إلى تسجيل الدخول للتسجيل.",
      },
    },
    {
      question: {
        en: "How do I track my progress?",
        ar: "كيف أتتبع تقدمي؟",
      },
      answer: {
        en: "You can track your progress from your Dashboard. It shows your enrolled courses, XP earned, completion percentage, and achievements. You can also see detailed statistics with visual charts.",
        ar: "يمكنك تتبع تقدمك من لوحة التحكم الخاصة بك. تعرض الدورات المسجلة، نقاط XP المكتسبة، نسبة الإكمال، والإنجازات. يمكنك أيضاً رؤية إحصائيات مفصلة مع رسوم بيانية.",
      },
    },
    {
      question: {
        en: "What is XP and how do I earn it?",
        ar: "ما هي نقاط XP وكيف أكسبها؟",
      },
      answer: {
        en: "XP (Experience Points) are earned by completing lessons and answering questions correctly. Each correct answer in the US Citizenship course earns you 10 XP, and completing First Aid lessons earns you 50 XP.",
        ar: "نقاط XP (نقاط الخبرة) تُكتسب من خلال إكمال الدروس والإجابة على الأسئلة بشكل صحيح. كل إجابة صحيحة في دورة الجنسية الأمريكية تكسبك 10 نقاط XP، وإكمال دروس الإسعافات الأولية يكسبك 50 نقطة XP.",
      },
    },
    {
      question: {
        en: "Can I download my certificates?",
        ar: "هل يمكنني تحميل شهاداتي؟",
      },
      answer: {
        en: "Yes! Once you complete a course, you'll receive a certificate. You can view and download all your certificates from the Certificates page in your account menu.",
        ar: "نعم! بمجرد إكمال دورة، ستحصل على شهادة. يمكنك عرض وتحميل جميع شهاداتك من صفحة الشهادات في قائمة حسابك.",
      },
    },
    {
      question: {
        en: "How do I change the language?",
        ar: "كيف أغير اللغة؟",
      },
      answer: {
        en: "You can change the language using the language switcher in the top navigation bar. The platform supports both English and Arabic with full RTL support for Arabic.",
        ar: "يمكنك تغيير اللغة باستخدام مبدل اللغة في شريط التنقل العلوي. تدعم المنصة كلاً من الإنجليزية والعربية مع دعم كامل لـ RTL للعربية.",
      },
    },
    {
      question: {
        en: "What happens if I lose my streak?",
        ar: "ماذا يحدث إذا فقدت سلسلة أيامي؟",
      },
      answer: {
        en: "Your streak resets to 0 if you don't complete any lessons for a day. However, your XP and course progress are never lost. You can always rebuild your streak by continuing to learn daily.",
        ar: "تعود سلسلة أيامك إلى 0 إذا لم تكمل أي دروس ليوم واحد. ومع ذلك، لن تفقد أبداً نقاط XP أو تقدمك في الدورة. يمكنك دائماً إعادة بناء سلسلتك من خلال الاستمرار في التعلم يومياً.",
      },
    },
    {
      question: {
        en: "Are the US Citizenship questions updated for 2025?",
        ar: "هل أسئلة الجنسية الأمريكية محدثة لعام 2025؟",
      },
      answer: {
        en: "Yes! Our US Citizenship course contains all 128 official civics questions updated for 2025. The questions are organized by category and include audio support for pronunciation practice.",
        ar: "نعم! تحتوي دورة الجنسية الأمريكية على جميع الأسئلة المدنية الرسمية البالغ عددها 128 سؤالاً المحدثة لعام 2025. الأسئلة منظمة حسب الفئة وتتضمن دعماً صوتياً لممارسة النطق.",
      },
    },
    {
      question: {
        en: "Can I access courses on mobile devices?",
        ar: "هل يمكنني الوصول إلى الدورات على الأجهزة المحمولة؟",
      },
      answer: {
        en: "Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can learn anywhere, anytime.",
        ar: "بالتأكيد! منصتنا متجاوبة بالكامل وتعمل بسلاسة على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر المكتبية. يمكنك التعلم في أي مكان وفي أي وقت.",
      },
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-6xl py-8">
        <Breadcrumb
          items={[
            {
              label: language === "ar" ? "المساعدة والدعم" : "Help & Support",
            },
          ]}
        />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "ابحث في قاعدة المعرفة لدينا أو تواصل مع فريق الدعم"
              : "Search our knowledge base or contact our support team"}
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === "ar" ? "ابحث عن إجابات..." : "Search for answers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">
              {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question[language]}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer[language]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {language === "ar" ? "لم يتم العثور على نتائج" : "No results found"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{language === "ar" ? "تواصل معنا" : "Contact Us"}</h2>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{language === "ar" ? "البريد الإلكتروني" : "Email"}</CardTitle>
                <CardDescription>
                  {language === "ar" ? "نرد عادة خلال 24 ساعة" : "We typically respond within 24 hours"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  support@eduplatform.com
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{language === "ar" ? "الدردشة المباشرة" : "Live Chat"}</CardTitle>
                <CardDescription>
                  {language === "ar" ? "متاح من 9 صباحاً - 5 مساءً" : "Available 9 AM - 5 PM EST"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{language === "ar" ? "ابدأ الدردشة" : "Start Chat"}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{language === "ar" ? "مركز المساعدة" : "Help Center"}</CardTitle>
                <CardDescription>
                  {language === "ar" ? "تصفح الأدلة والبرامج التعليمية" : "Browse guides and tutorials"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  {language === "ar" ? "زيارة المركز" : "Visit Center"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}</CardTitle>
            <CardDescription>
              {language === "ar"
                ? "املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن"
                : "Fill out the form below and we'll get back to you as soon as possible"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "ar" ? "الاسم" : "Name"}</Label>
                  <Input id="name" placeholder={language === "ar" ? "اسمك الكامل" : "Your full name"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "ar" ? "بريدك الإلكتروني" : "Your email address"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{language === "ar" ? "الموضوع" : "Subject"}</Label>
                <Input id="subject" placeholder={language === "ar" ? "كيف يمكننا مساعدتك؟" : "How can we help?"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{language === "ar" ? "الرسالة" : "Message"}</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                {language === "ar" ? "إرسال الرسالة" : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

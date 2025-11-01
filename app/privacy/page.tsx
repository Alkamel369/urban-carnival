"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-4xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === "en" ? "Last updated: January 2025" : "آخر تحديث: يناير 2025"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "1. Information We Collect" : "1. المعلومات التي نجمعها"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "We collect information that you provide directly to us, including your name, email address, and learning progress. This information is used to provide and improve our educational services."
                  : "نقوم بجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك اسمك وعنوان بريدك الإلكتروني وتقدمك التعليمي. يتم استخدام هذه المعلومات لتقديم وتحسين خدماتنا التعليمية."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "2. How We Use Your Information" : "2. كيف نستخدم معلوماتك"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "We use the information we collect to operate, maintain, and improve our platform, to communicate with you, to track your learning progress, and to provide personalized learning experiences."
                  : "نستخدم المعلومات التي نجمعها لتشغيل وصيانة وتحسين منصتنا، للتواصل معك، لتتبع تقدمك التعليمي، ولتوفير تجارب تعليمية مخصصة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "3. Data Security" : "3. أمن البيانات"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction."
                  : "نتخذ تدابير معقولة للمساعدة في حماية معلوماتك الشخصية من الفقدان والسرقة وسوء الاستخدام والوصول غير المصرح به والإفصاح والتغيير والتدمير."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "4. Your Rights" : "4. حقوقك"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly."
                  : "لديك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها في أي وقت. يمكنك القيام بذلك من خلال إعدادات حسابك أو عن طريق الاتصال بنا مباشرة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "5. Cookies" : "5. ملفات تعريف الارتباط"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
                  : "نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على منصتنا والاحتفاظ بمعلومات معينة. يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو للإشارة عند إرسال ملف تعريف ارتباط."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "6. Contact Us" : "6. اتصل بنا"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "If you have any questions about this Privacy Policy, please contact us at privacy@eduplatform.com"
                  : "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@eduplatform.com"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

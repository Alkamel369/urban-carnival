"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-4xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{language === "en" ? "Terms of Service" : "شروط الخدمة"}</h1>
            <p className="text-lg text-muted-foreground">
              {language === "en" ? "Last updated: January 2025" : "آخر تحديث: يناير 2025"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "1. Acceptance of Terms" : "1. قبول الشروط"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "By accessing and using this educational platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services."
                  : "من خلال الوصول إلى هذه المنصة التعليمية واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "2. User Accounts" : "2. حسابات المستخدمين"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
                  : "أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور الخاصة بك. أنت توافق على قبول المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "3. Course Content" : "3. محتوى الدورات"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "All course content, including videos, text, images, and quizzes, is the property of the platform and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without permission."
                  : "جميع محتويات الدورة، بما في ذلك مقاطع الفيديو والنصوص والصور والاختبارات، هي ملك للمنصة ومحمية بموجب قوانين حقوق النشر. لا يجوز لك إعادة إنتاج أو توزيع أو إنشاء أعمال مشتقة بدون إذن."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "4. User Conduct" : "4. سلوك المستخدم"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair the platform. You must not attempt to gain unauthorized access to any part of the platform."
                  : "أنت توافق على عدم استخدام المنصة لأي غرض غير قانوني أو بأي طريقة يمكن أن تضر أو تعطل أو تضعف المنصة. يجب ألا تحاول الحصول على وصول غير مصرح به إلى أي جزء من المنصة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "5. Certificates" : "5. الشهادات"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "Certificates are awarded upon successful completion of courses. These certificates are for personal use and do not constitute official accreditation unless explicitly stated."
                  : "يتم منح الشهادات عند إكمال الدورات بنجاح. هذه الشهادات للاستخدام الشخصي ولا تشكل اعتمادًا رسميًا ما لم يُذكر ذلك صراحة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "6. Limitation of Liability" : "6. حدود المسؤولية"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "The platform is provided 'as is' without any warranties. We are not liable for any damages arising from your use of the platform or inability to access the platform."
                  : "يتم توفير المنصة 'كما هي' دون أي ضمانات. نحن لسنا مسؤولين عن أي أضرار ناشئة عن استخدامك للمنصة أو عدم القدرة على الوصول إلى المنصة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "7. Changes to Terms" : "7. التغييرات على الشروط"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the platform after such changes constitutes acceptance of the new terms."
                  : "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإخطار المستخدمين بأي تغييرات جوهرية. استمرارك في استخدام المنصة بعد هذه التغييرات يشكل قبولًا للشروط الجديدة."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "8. Contact Information" : "8. معلومات الاتصال"}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                {language === "en"
                  ? "For questions about these Terms of Service, please contact us at legal@eduplatform.com"
                  : "للأسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا على legal@eduplatform.com"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

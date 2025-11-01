import type { Course } from "./types"

export const coursesData: Course[] = [
  {
    id: "us-citizenship-2025",
    title: {
      en: "US Citizenship Test Preparation 2025",
      ar: "التحضير لاختبار الجنسية الأمريكية 2025",
    },
    description: {
      en: "Master all 128 updated civics questions for the 2025 US Citizenship Test with interactive lessons, audio pronunciations, and gamified learning stages.",
      ar: "أتقن جميع الأسئلة المدنية الـ 128 المحدثة لاختبار الجنسية الأمريكية 2025 مع دروس تفاعلية ونطق صوتي ومراحل تعليمية ممتعة.",
    },
    instructor: {
      en: "Immigration Education Team",
      ar: "فريق التعليم للهجرة",
    },
    thumbnail: "/us-citizenship-test-preparation-with-american-flag.jpg",
    category: "Citizenship",
    level: "beginner",
    duration: "8 weeks",
    lessonsCount: 128,
    studentsCount: 15420,
    rating: 4.9,
    type: "duolingo",
    icon: "🇺🇸",
    color: "from-blue-500 to-red-500",
  },
  {
    id: "first-aid-essentials",
    title: {
      en: "First Aid Essentials",
      ar: "أساسيات الإسعافات الأولية",
    },
    description: {
      en: "Learn life-saving first aid techniques through comprehensive video lessons and practical demonstrations. Certified course following international standards.",
      ar: "تعلم تقنيات الإسعافات الأولية المنقذة للحياة من خلال دروس فيديو شاملة وعروض عملية. دورة معتمدة تتبع المعايير الدولية.",
    },
    instructor: {
      en: "Dr. Sarah Medical Team",
      ar: "د. سارة والفريق الطبي",
    },
    thumbnail: "/first-aid-medical-training-with-red-cross.jpg",
    category: "Health & Safety",
    level: "beginner",
    duration: "6 weeks",
    lessonsCount: 24,
    studentsCount: 8930,
    rating: 4.8,
    type: "edraak",
    icon: "🏥",
    color: "from-red-500 to-pink-500",
  },
]

export const courses = coursesData

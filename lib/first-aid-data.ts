export interface FirstAidModule {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  order: number
  lessons: FirstAidLesson[]
}

export interface FirstAidLesson {
  id: string
  moduleId: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  duration: string
  type: "video" | "reading" | "quiz"
  videoUrl?: string
  content?: { en: string; ar: string }
  order: number
}

export const firstAidModules: FirstAidModule[] = [
  {
    id: "introduction",
    title: {
      en: "Introduction to First Aid",
      ar: "مقدمة في الإسعافات الأولية",
    },
    description: {
      en: "Learn the fundamentals of first aid and emergency response",
      ar: "تعلم أساسيات الإسعافات الأولية والاستجابة للطوارئ",
    },
    order: 1,
    lessons: [
      {
        id: "intro-1",
        moduleId: "introduction",
        title: {
          en: "What is First Aid?",
          ar: "ما هي الإسعافات الأولية؟",
        },
        description: {
          en: "Understanding the basics and importance of first aid",
          ar: "فهم أساسيات وأهمية الإسعافات الأولية",
        },
        duration: "8 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 1,
      },
      {
        id: "intro-2",
        moduleId: "introduction",
        title: {
          en: "Emergency Response Principles",
          ar: "مبادئ الاستجابة للطوارئ",
        },
        description: {
          en: "Learn the key principles of responding to emergencies",
          ar: "تعلم المبادئ الأساسية للاستجابة للطوارئ",
        },
        duration: "10 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 2,
      },
      {
        id: "intro-3",
        moduleId: "introduction",
        title: {
          en: "Safety and Legal Considerations",
          ar: "اعتبارات السلامة والقانون",
        },
        description: {
          en: "Understanding your responsibilities and legal protections",
          ar: "فهم مسؤولياتك والحماية القانونية",
        },
        duration: "12 min",
        type: "reading",
        content: {
          en: "Detailed reading material about safety and legal aspects...",
          ar: "مواد قراءة مفصلة حول جوانب السلامة والقانون...",
        },
        order: 3,
      },
    ],
  },
  {
    id: "basic-life-support",
    title: {
      en: "Basic Life Support (BLS)",
      ar: "دعم الحياة الأساسي",
    },
    description: {
      en: "Master CPR and other life-saving techniques",
      ar: "أتقن الإنعاش القلبي الرئوي وتقنيات إنقاذ الحياة الأخرى",
    },
    order: 2,
    lessons: [
      {
        id: "bls-1",
        moduleId: "basic-life-support",
        title: {
          en: "CPR for Adults",
          ar: "الإنعاش القلبي الرئوي للبالغين",
        },
        description: {
          en: "Learn proper CPR technique for adult patients",
          ar: "تعلم تقنية الإنعاش القلبي الرئوي الصحيحة للمرضى البالغين",
        },
        duration: "15 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 1,
      },
      {
        id: "bls-2",
        moduleId: "basic-life-support",
        title: {
          en: "CPR for Children and Infants",
          ar: "الإنعاش القلبي الرئوي للأطفال والرضع",
        },
        description: {
          en: "Special considerations for pediatric CPR",
          ar: "اعتبارات خاصة للإنعاش القلبي الرئوي للأطفال",
        },
        duration: "12 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 2,
      },
      {
        id: "bls-3",
        moduleId: "basic-life-support",
        title: {
          en: "Using an AED",
          ar: "استخدام جهاز الصدمات الكهربائية",
        },
        description: {
          en: "How to properly use an Automated External Defibrillator",
          ar: "كيفية استخدام جهاز الصدمات الكهربائية الآلي بشكل صحيح",
        },
        duration: "10 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 3,
      },
      {
        id: "bls-4",
        moduleId: "basic-life-support",
        title: {
          en: "Choking Relief",
          ar: "إزالة الاختناق",
        },
        description: {
          en: "Heimlich maneuver and back blows",
          ar: "مناورة هيمليك والضربات على الظهر",
        },
        duration: "8 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 4,
      },
    ],
  },
  {
    id: "wound-care",
    title: {
      en: "Wound Care and Bleeding Control",
      ar: "العناية بالجروح والسيطرة على النزيف",
    },
    description: {
      en: "Learn to treat wounds and control bleeding effectively",
      ar: "تعلم كيفية علاج الجروح والسيطرة على النزيف بفعالية",
    },
    order: 3,
    lessons: [
      {
        id: "wound-1",
        moduleId: "wound-care",
        title: {
          en: "Types of Wounds",
          ar: "أنواع الجروح",
        },
        description: {
          en: "Identifying different types of wounds and injuries",
          ar: "تحديد أنواع مختلفة من الجروح والإصابات",
        },
        duration: "10 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 1,
      },
      {
        id: "wound-2",
        moduleId: "wound-care",
        title: {
          en: "Controlling Severe Bleeding",
          ar: "السيطرة على النزيف الشديد",
        },
        description: {
          en: "Techniques for stopping severe bleeding",
          ar: "تقنيات لإيقاف النزيف الشديد",
        },
        duration: "12 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 2,
      },
      {
        id: "wound-3",
        moduleId: "wound-care",
        title: {
          en: "Bandaging Techniques",
          ar: "تقنيات الضمادات",
        },
        description: {
          en: "Proper bandaging and dressing application",
          ar: "تطبيق الضمادات والضمادات بشكل صحيح",
        },
        duration: "15 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 3,
      },
    ],
  },
  {
    id: "medical-emergencies",
    title: {
      en: "Common Medical Emergencies",
      ar: "حالات الطوارئ الطبية الشائعة",
    },
    description: {
      en: "Recognize and respond to common medical emergencies",
      ar: "التعرف على حالات الطوارئ الطبية الشائعة والاستجابة لها",
    },
    order: 4,
    lessons: [
      {
        id: "medical-1",
        moduleId: "medical-emergencies",
        title: {
          en: "Heart Attack and Stroke",
          ar: "النوبة القلبية والسكتة الدماغية",
        },
        description: {
          en: "Recognizing signs and providing immediate care",
          ar: "التعرف على العلامات وتقديم الرعاية الفورية",
        },
        duration: "14 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 1,
      },
      {
        id: "medical-2",
        moduleId: "medical-emergencies",
        title: {
          en: "Seizures and Fainting",
          ar: "النوبات والإغماء",
        },
        description: {
          en: "How to help someone having a seizure or who has fainted",
          ar: "كيفية مساعدة شخص يعاني من نوبة أو أغمي عليه",
        },
        duration: "10 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 2,
      },
      {
        id: "medical-3",
        moduleId: "medical-emergencies",
        title: {
          en: "Allergic Reactions and Anaphylaxis",
          ar: "ردود الفعل التحسسية والحساسية المفرطة",
        },
        description: {
          en: "Managing severe allergic reactions",
          ar: "إدارة ردود الفعل التحسسية الشديدة",
        },
        duration: "11 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 3,
      },
    ],
  },
  {
    id: "environmental-emergencies",
    title: {
      en: "Environmental Emergencies",
      ar: "حالات الطوارئ البيئية",
    },
    description: {
      en: "Handle temperature-related and environmental emergencies",
      ar: "التعامل مع حالات الطوارئ المتعلقة بالحرارة والبيئة",
    },
    order: 5,
    lessons: [
      {
        id: "env-1",
        moduleId: "environmental-emergencies",
        title: {
          en: "Burns and Scalds",
          ar: "الحروق والسمط",
        },
        description: {
          en: "Treating different degrees of burns",
          ar: "علاج درجات مختلفة من الحروق",
        },
        duration: "12 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 1,
      },
      {
        id: "env-2",
        moduleId: "environmental-emergencies",
        title: {
          en: "Heat Exhaustion and Heat Stroke",
          ar: "الإنهاك الحراري وضربة الشمس",
        },
        description: {
          en: "Recognizing and treating heat-related illnesses",
          ar: "التعرف على الأمراض المرتبطة بالحرارة وعلاجها",
        },
        duration: "10 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 2,
      },
      {
        id: "env-3",
        moduleId: "environmental-emergencies",
        title: {
          en: "Hypothermia and Frostbite",
          ar: "انخفاض حرارة الجسم وقضمة الصقيع",
        },
        description: {
          en: "Managing cold-related emergencies",
          ar: "إدارة حالات الطوارئ المتعلقة بالبرد",
        },
        duration: "9 min",
        type: "video",
        videoUrl: "/placeholder.svg?height=720&width=1280",
        order: 3,
      },
    ],
  },
]

export function getModuleProgress(moduleId: string, completedLessons: string[]): number {
  const module = firstAidModules.find((m) => m.id === moduleId)
  if (!module) return 0

  const completed = module.lessons.filter((l) => completedLessons.includes(l.id)).length
  return (completed / module.lessons.length) * 100
}

export function getTotalProgress(completedLessons: string[]): number {
  const totalLessons = firstAidModules.reduce((acc, m) => acc + m.lessons.length, 0)
  return (completedLessons.length / totalLessons) * 100
}

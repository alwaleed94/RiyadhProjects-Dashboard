import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      all: "All",
      transport: "Transport",
      qualityOfLife: "Quality of Life",
      urbanDevelopment: "Urban Development",
      environment: "Environment",
      heritageAndTourism: "Heritage and Tourism",
      language: "Language",
      english: "English",
      arabic: "Arabic",
      interactiveDashboard: "Interactive Dashboard",
      riyadhProjects: "Riyadh Projects",
      description:
        "An interactive site displaying completion rates, remaining work, positive impacts, and an interactive map for a set of Riyadh projects.",
      totalProjects: "Total Projects",
      averageProgress: "Average Progress",
      completedProjects: "Completed Projects",
      projectsInProgress: "Projects in Progress",
      totalPositiveImpacts: "Total Positive Impacts",
      quickSummary: "Quick Summary",
      summaryNote:
        "Some numbers are official, while others are monitoring indicators or phased statuses, so the type of each percentage is clarified inside the card.",
      selectedProject: "Selected Project",
      searchLabel: "Search for a project",
      searchPlaceholder: "Example: metro, diriyah, green...",
      category: "Category",
      progressComparison: "Progress Comparison",
      progressNote: "The bars below represent projects with numerical percentages only.",
      implementedBy: "Implemented by",
      adminLogin: "Admin Login",
      light: "☀️ Light",
      dark: "🌙 Dark",
      interactiveMap: "Interactive Map",
      mapNote: "Click any project to highlight it.",
      projectCards: "Project Cards",
      projectCardsNote:
        "Each card includes achieved work, remaining work, indicators, and positive impacts.",
      noResults: "No matching results found."
    }
  },
  ar: {
    translation: {
      all: "الكل",
      transport: "نقل",
      qualityOfLife: "جودة حياة",
      urbanDevelopment: "تطوير حضري",
      environment: "بيئة",
      heritageAndTourism: "تراث وسياحة",
      language: "اللغة",
      english: "English",
      arabic: "العربية",
      interactiveDashboard: "لوحة تفاعلية",
      riyadhProjects: "مشاريع الرياض",
      description:
        "موقع تفاعلي يعرض نسبة الإنجاز، المتبقي، الآثار الإيجابية، والخريطة التفاعلية لمجموعة من مشاريع الرياض.",
      totalProjects: "إجمالي المشاريع",
      averageProgress: "متوسط التقدم",
      completedProjects: "مشاريع مكتملة",
      projectsInProgress: "مشاريع قيد التنفيذ",
      totalPositiveImpacts: "إجمالي الآثار الإيجابية",
      quickSummary: "ملخص سريع",
      summaryNote:
        "بعض الأرقام رسمية، وبعضها مؤشرات متابعة أو حالات مرحلية، لذلك تم توضيح نوع كل نسبة داخل البطاقة.",
      selectedProject: "المشروع المحدد",
      searchLabel: "ابحث عن مشروع",
      searchPlaceholder: "مثال: مترو، درعية، خضراء...",
      category: "التصنيف",
      progressComparison: "مقارنة التقدم",
      progressNote: "الأشرطة أدناه تمثل المشاريع ذات النسب الرقمية فقط.",
      implementedBy: "تم التنفيذ بواسطة",
      adminLogin: "دخول إداري",
      light: "☀️ لايت",
      dark: "🌙 دارك",
      interactiveMap: "الخريطة التفاعلية",
      mapNote: "اضغط على أي مشروع لإبرازه.",
      projectCards: "بطاقات المشاريع",
      projectCardsNote: "تحتوي على المحقق، المتبقي، المؤشرات، والآثار الإيجابية.",
      noResults: "لا توجد نتائج مطابقة."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  interpolation: {
    escapeValue: false
  }
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
});

document.documentElement.setAttribute("dir", "rtl");

export default i18n;

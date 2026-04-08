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
      capitalDashboard: "Riyadh Capital Delivery Overview",
      riyadhProjects: "Riyadh Projects",
      description:
        "A polished executive dashboard tracking delivery progress, city impact, and strategic project coverage across Riyadh.",
      totalProjects: "Total Projects",
      averageProgress: "Average Progress",
      completedProjects: "Completed Projects",
      projectsInProgress: "Projects In Progress",
      totalPositiveImpacts: "Positive Impact Indicators",
      quickSummary: "Quick Summary",
      summaryNote:
        "Some figures are official, while others represent monitoring indicators or phased delivery status for broader programs.",
      selectedProject: "Selected Project",
      searchLabel: "Search for a project",
      searchPlaceholder: "Example: metro, diriyah, park...",
      category: "Category",
      progressComparison: "Progress Comparison",
      progressNote: "These bars compare projects that publish measurable completion percentages.",
      implementedBy: "Designed and Developed by",
      adminLogin: "Admin Login",
      light: "Light Mode",
      dark: "Dark Mode",
      interactiveMap: "Interactive Map",
      mapNote: "Select a project to focus it on the city map.",
      projectCards: "Project Profiles",
      projectCardsNote:
        "Detailed cards include achieved work, remaining scope, metrics, and positive impacts.",
      noResults: "No matching results found.",
      videoSectionTitle: "Riyadh Projects Video",
      videoSectionNote: "A featured overview video that adds richer context to the dashboard.",
      openVideoDirectly: "Open Video Directly",
      featuredProjectsTitle: "Executive Highlights",
      featuredProjectsNote: "A quick shortlist of prominent Riyadh initiatives for rapid review.",
      deliveryReadiness: "Delivery Readiness",
      activePrograms: "Active Programs",
      cityImpact: "City Impact"
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
      capitalDashboard: "نظرة تنفيذية على مشاريع عاصمة المستقبل",
      riyadhProjects: "مشاريع الرياض",
      description:
        "لوحة احترافية ترصد تقدم التنفيذ، وأثر المشاريع، وتوزيع المبادرات الاستراتيجية في مدينة الرياض.",
      totalProjects: "إجمالي المشاريع",
      averageProgress: "متوسط التقدم",
      completedProjects: "مشاريع مكتملة",
      projectsInProgress: "مشاريع قيد التنفيذ",
      totalPositiveImpacts: "مؤشرات الأثر الإيجابي",
      quickSummary: "ملخص سريع",
      summaryNote:
        "بعض الأرقام رسمية، وبعضها يمثل مؤشرات متابعة أو حالات تنفيذ مرحلية ضمن برامج ومشاريع أكبر.",
      selectedProject: "المشروع المحدد",
      searchLabel: "ابحث عن مشروع",
      searchPlaceholder: "مثال: مترو، درعية، حديقة...",
      category: "التصنيف",
      progressComparison: "مقارنة التقدم",
      progressNote: "المخطط يقارن المشاريع التي لديها نسب إنجاز رقمية قابلة للقياس.",
      implementedBy: "تم التنفيذ بواسطة",
      adminLogin: "دخول إداري",
      light: "الوضع الفاتح",
      dark: "الوضع الداكن",
      interactiveMap: "الخريطة التفاعلية",
      mapNote: "اختر أي مشروع لإبرازه مباشرة على خريطة المدينة.",
      projectCards: "ملفات المشاريع",
      projectCardsNote:
        "كل بطاقة تعرض ما تحقق، وما تبقى، والمؤشرات، وأبرز الآثار الإيجابية للمشروع.",
      noResults: "لا توجد نتائج مطابقة.",
      videoSectionTitle: "فيديو عن مشاريع الرياض",
      videoSectionNote: "عرض مرئي سريع يضيف سياقًا أوضح للمشهد التنموي داخل الصفحة.",
      openVideoDirectly: "فتح الفيديو مباشرة",
      featuredProjectsTitle: "أبرز المشاريع",
      featuredProjectsNote: "مجموعة مختصرة من المشاريع البارزة لمراجعة سريعة واحترافية.",
      deliveryReadiness: "جاهزية التنفيذ",
      activePrograms: "المبادرات النشطة",
      cityImpact: "أثر المدينة"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
});

document.documentElement.setAttribute("dir", "ltr");

export default i18n;

export const projects = [
  {
    id: "riyadh-metro",
    name: "مترو الرياض",
    category: "نقل",
    progress: 100,
    progressLabel: "100%",
    progressType: "official",
    status: "تشغيل مكتمل",
    remaining: 0,
    location: [24.7136, 46.6753],
    gradient: "linear-gradient(135deg, #0891b2, #06b6d4)",
    icon: "🚇",
    image: "https://www.alyaum.com/uploads/images/2024/11/27/2452217.jfif",
    summary:
      "شبكة النقل العام الرئيسية في الرياض، تربط أهم المحاور والمرافق الحيوية عبر 6 خطوط و85 محطة.",
    achievedText:
      "اكتمل الإطلاق المرحلي وأصبح المترو بكامل خطوطه التشغيلية.",
    remainingText:
      "المتبقي في هذه اللوحة: 0% لمشروع التشغيل الأساسي، مع إمكانية توسعات مستقبلية منفصلة.",
    positiveImpacts: [
      "تقليل الاعتماد على السيارات الخاصة",
      "تخفيف الازدحام ووقت التنقل",
      "رفع جودة الحياة والتنقل المستدام",
      "ربط الأحياء والمراكز الاقتصادية والجامعات"
    ],
    metrics: [
      { label: "الطول", value: "176 كم" },
      { label: "الخطوط", value: "6" },
      { label: "المحطات", value: "85" },
      { label: "الطاقة اليومية", value: "3.6 مليون راكب" }
    ],
    sourceNote: "نسبة رسمية"
  },
  {
    id: "sports-boulevard",
    name: "المسار الرياضي",
    category: "جودة حياة",
    progress: 40,
    progressLabel: "40%",
    progressType: "official",
    status: "قيد التنفيذ",
    remaining: 60,
    location: [24.774265, 46.738586],
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    icon: "🚴",
    image: "https://www.vision2030.gov.sa/media/p22nklnn/sb-numbers4.jpg",
    summary:
      "مشروع يربط غرب الرياض بشرقها بمسارات للمشي والدراجات والخيل ومرافق رياضية ومساحات خضراء.",
    achievedText:
      "افتتحت المرحلة الأولى بخمس وجهات، ووصل طول الجزء المكتمل إلى 83 كم.",
    remainingText:
      "المتبقي 60% حتى اكتمال المشروع بكامل عناصره ومرافقه.",
    positiveImpacts: [
      "تشجيع النشاط البدني",
      "زيادة المساحات الخضراء",
      "تحسين المشهد الحضري",
      "رفع جاذبية الرياض للعيش والترفيه"
    ],
    metrics: [
      { label: "الطول الكلي", value: "135+ كم" },
      { label: "المنجز المفتوح", value: "83 كم" },
      { label: "المرافق الرياضية", value: "50" },
      { label: "المساحات الخضراء", value: "4.4 مليون م²" }
    ],
    sourceNote: "نسبة رسمية"
  },
  {
    id: "new-murabba",
    name: "المربع الجديد",
    category: "تطوير حضري",
    progress: 86,
    progressLabel: "86%",
    progressType: "official-subproject",
    status: "قيد التنفيذ",
    remaining: 14,
    location: [24.7886, 46.6315],
    gradient: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    icon: "🏙️",
    image: "https://media.assettype.com/ajel%2F2023-02%2Ffdf85a9d-434c-4127-98db-9da1130b7c84%2FFpFKOMPXEAEeccO.jpg",
    summary:
      "منطقة حضرية جديدة متعددة الاستخدامات تتضمن المكعب ومرافق سكنية وتجارية وترفيهية.",
    achievedText:
      "بلغت أعمال الحفر في موقع المكعب والمنصات المحيطة 86%.",
    remainingText:
      "المتبقي 14% لهذا المؤشر الفرعي، وليس للمشروع الكلي.",
    positiveImpacts: [
      "خلق منطقة حضرية جديدة",
      "دعم الاستثمار والوظائف",
      "تعزيز البنية التحتية الحضرية",
      "تنويع الأنشطة السكنية والتجارية"
    ],
    metrics: [
      { label: "المساحة", value: "14.1 كم²" },
      { label: "المسطحات المبنية", value: "25+ مليون م²" },
      { label: "مؤشر الحفر", value: "86%" },
      { label: "سنة الإطلاق", value: "2023" }
    ],
    sourceNote: "رسمي لمؤشر فرعي"
  },
  {
    id: "green-riyadh",
    name: "الرياض الخضراء",
    category: "بيئة",
    progress: 53,
    progressLabel: "53%",
    progressType: "target-indicator",
    status: "قيد التنفيذ",
    remaining: 47,
    location: [24.6877, 46.7219],
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    icon: "🌳",
    image: "https://www.rcrc.gov.sa/wp-content/uploads/2023/10/1-17-scaled.jpg",
    summary:
      "مشروع تشجير حضري ضخم يهدف إلى تحويل الرياض إلى مدينة أكثر خضرة وصحة واستدامة.",
    achievedText:
      "يتوفر مؤشر للبنية التحتية والشبكات وأهداف واضحة طويلة المدى.",
    remainingText:
      "المتبقي تقديري في هذه النسخة لأغراض العرض البصري.",
    positiveImpacts: [
      "خفض الحرارة",
      "تحسين جودة الهواء",
      "زيادة المساحات الخضراء",
      "تحسين المشهد الحضري"
    ],
    metrics: [
      { label: "الهدف", value: "7.5 مليون شجرة" },
      { label: "شبكة الري", value: "533 كم+" },
      { label: "خفض الحرارة", value: "1.5 - 2°C" },
      { label: "التغطية الخضراء", value: "9%" }
    ],
    sourceNote: "مؤشر متابعة"
  },
  {
    id: "diriyah",
    name: "الدرعية",
    category: "تراث وسياحة",
    progress: null,
    progressLabel: "غير معلن",
    progressType: "no-single-official-percent",
    status: "تطوير مرحلي",
    remaining: null,
    location: [24.7442, 46.5748],
    gradient: "linear-gradient(135deg, #92400e, #d97706)",
    icon: "🏛️",
    image: "https://www.rcrc.gov.sa/wp-content/uploads/2023/07/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%A7%D9%84%D8%AA%D8%B7%D9%88%D9%8A%D8%B1-2-1024x682.jpg",
    summary:
      "وجهة تاريخية وثقافية كبرى تجمع بين التراث النجدي والتطوير الحديث.",
    achievedText:
      "توجد أجزاء مفتوحة حاليًا مثل حي الطريف ومرافق أخرى مرحلية.",
    remainingText:
      "لا توجد نسبة موحدة منشورة للمشروع بالكامل.",
    positiveImpacts: [
      "تعزيز السياحة الثقافية",
      "حفظ الهوية التاريخية",
      "تنشيط الاقتصاد المحلي",
      "جذب الزوار والاستثمارات"
    ],
    metrics: [
      { label: "المساحة التطويرية", value: "14 كم²" },
      { label: "الفنادق", value: "28+" },
      { label: "الوحدات السكنية", value: "18k+" },
      { label: "الحالة", value: "تطوير مرحلي" }
    ],
    sourceNote: "حالة مرحلية"
  },
  {
    id: "king-salman-airport",
    name: "مطار الملك سلمان",
    category: "نقل",
    progress: 72,
    progressLabel: "72%",
    progressType: "official",
    status: "قيد التنفيذ",
    remaining: 28,
    location: [24.8049, 46.7662],
    gradient: "linear-gradient(135deg, #0891b2, #22c55e)",
    icon: "✈️",
    image: "https://www.pif.gov.sa/-/media/project/pif-corporate/pif-corporate-site/our-investments/portfolio/slider-images/king-salman-international-airport/departuresaerial1200x750.webp?h=750&iar=0&w=1200&sc_lang=ar",
    summary:
      "مشروع مطار الملك سلمان الدولي يهدف إلى تعزيز الربط الجوي مع العالم ودعم نمو السياحة والأعمال في المملكة.",
    achievedText:
      "تم الانتهاء من مراحل التصميم والبناء الأساسي لمدارج الإقلاع والهبوط والمحطة الرئيسية.",
    remainingText:
      "المتبقي 28% للانتهاء من المرافق التشغيلية والخدمات اللوجستية.",
    positiveImpacts: [
      "تعزيز الربط الدولي",
      "زيادة الطاقة الاستيعابية للركاب",
      "دعم قطاع السياحة والطيران",
      "خلق فرص وظيفية جديدة"
    ],
    metrics: [
      { label: "عدد المدارج", value: "3" },
      { label: "الطاقة الاستيعابية", value: "45 مليون راكب" },
      { label: "المساحة", value: "57 كم²" },
      { label: "سنة التشغيل المتوقع", value: "2027" }
    ],
    sourceNote: "نسبة رسمية"
  },
  {
    id: "king-salman-stadium",
    name: "ملعب الملك سلمان",
    category: "جودة حياة",
    progress: 58,
    progressLabel: "58%",
    progressType: "official",
    status: "قيد التنفيذ",
    remaining: 42,
    location: [24.773, 46.707],
    gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    icon: "🏟️",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2nMkMuHWtSVRHHXPrMSrpusA5v7BhAFIDw&s",
    summary:
      "مشروع ملعب الملك سلمان يمثل وجهة رياضية جديدة في الرياض ويستضيف فعاليات رياضية وترفيهية وطنية ودولية.",
    achievedText:
      "اكتملت الأعمال الإنشائية الكبرى وتم البدء في تجهيز المدرجات والمرافق الأساسية.",
    remainingText:
      "المتبقي 42% لاستكمال التجهيزات التشغيلية والمرافق الخدمية.",
    positiveImpacts: [
      "تعزيز الرياضة المجتمعية",
      "استضافة فعاليات دولية",
      "دعم قطاع الضيافة والسياحة الرياضية",
      "خلق فرص عمل محلية"
    ],
    metrics: [
      { label: "السعة", value: "40,000 متفرج" },
      { label: "الملاعب الفرعية", value: "4" },
      { label: "المرافق الترفيهية", value: "10" },
      { label: "سنة الافتتاح المتوقع", value: "2026" }
    ],
    sourceNote: "رسمي"
  },
  {
    id: "king-salman-park",
    name: "حديقة الملك سلمان",
    category: "بيئة",
    progress: 68,
    progressLabel: "68%",
    progressType: "target-indicator",
    status: "قيد التنفيذ",
    remaining: 32,
    location: [24.7608, 46.7183],
    gradient: "linear-gradient(135deg, #059669, #22c55e)",
    icon: "🌿",
    image: "https://www.vision2030.gov.sa/media/zs4mjgsk/hl_riyadh_aerial_view_final-min.jpg",
    summary:
      "حديقة الملك سلمان تمثل أحد أكبر المشاريع البيئية الحضرية في الرياض، وتوفر مساحات خضراء ومرافق عائلية حديثة.",
    achievedText:
      "تم إنشاء مساحات واسعة من الحدائق والمسارات المائية والبنى التحتية الخضراء.",
    remainingText:
      "المتبقي 32% حتى اكتمال المرافق الترفيهية والمناطق الخضراء.",
    positiveImpacts: [
      "تحسين جودة الهواء",
      "زيادة النشاط الاجتماعي والعائلي",
      "خفض حرارة المدينة",
      "تعزيز السياحة البيئية"
    ],
    metrics: [
      { label: "المساحة", value: "14 كم²" },
      { label: "مسارات المشي", value: "40 كم" },
      { label: "المسطحات المائية", value: "8" },
      { label: "سنة الافتتاح المتوقع", value: "2026" }
    ],
    sourceNote: "مؤشر متابعة"
  }
];
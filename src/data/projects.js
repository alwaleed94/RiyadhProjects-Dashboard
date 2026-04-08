export const projects = [
  {
    id: "riyadh-metro",
    name: { ar: "مترو الرياض", en: "Riyadh Metro" },
    category: { ar: "نقل", en: "Transport" },
    progress: 100,
    progressLabel: "100%",
    progressType: "official",
    status: { ar: "تشغيل مكتمل", en: "Fully Operational" },
    remaining: 0,
    location: [24.726614, 46.666709],
    locationType: {
      ar: "نقطة مرجعية لشبكة المشروع",
      en: "Representative point for the project network"
    },
    gradient: "linear-gradient(135deg, #0891b2, #06b6d4)",
    icon: "🚇",
    image: "https://www.alyaum.com/uploads/images/2024/11/27/2452217.jfif",
    summary: {
      ar: "شبكة النقل العام الرئيسية في الرياض، تربط أهم المحاور والمرافق الحيوية عبر 6 خطوط و85 محطة.",
      en: "Riyadh's main public transport network, connecting key hubs and facilities via 6 lines and 85 stations."
    },
    achievedText: {
      ar: "اكتمل الإطلاق المرحلي وأصبح المترو بكامل خطوطه التشغيلية.",
      en: "Phased launch completed and the metro is now fully operational."
    },
    remainingText: {
      ar: "المتبقي في هذه اللوحة: 0% لمشروع التشغيل الأساسي، مع إمكانية توسعات مستقبلية منفصلة.",
      en: "Remaining in this panel: 0% for the core operation, with possible future expansions."
    },
    positiveImpacts: [
      { ar: "تقليل الاعتماد على السيارات الخاصة", en: "Reduce reliance on private cars" },
      { ar: "تخفيف الازدحام ووقت التنقل", en: "Reduce congestion and travel time" },
      { ar: "رفع جودة الحياة والتنقل المستدام", en: "Enhance quality of life and sustainable mobility" },
      { ar: "ربط الأحياء والمراكز الاقتصادية والجامعات", en: "Connect neighborhoods, economic centers, and universities" }
    ],
    metrics: [
      { label: { ar: "الطول", en: "Length" }, value: { ar: "176 كم", en: "176 km" } },
      { label: { ar: "الخطوط", en: "Lines" }, value: { ar: "6", en: "6" } },
      { label: { ar: "المحطات", en: "Stations" }, value: { ar: "85", en: "85" } },
      { label: { ar: "الطاقة اليومية", en: "Daily Capacity" }, value: { ar: "3.6 مليون راكب", en: "3.6 million riders" } }
    ],
    sourceNote: { ar: "نسبة رسمية", en: "Official percentage" }
  },
  // ... (كرر نفس النمط لجميع المشاريع الأخرى)
  {
    id: "sports-boulevard",
    name: { ar: "المسار الرياضي", en: "Sports Boulevard" },
    category: { ar: "جودة حياة", en: "Quality of Life" },
    progress: 40,
    progressLabel: "40%",
    progressType: "official",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 60,
    location: [24.767694, 46.60324],
    locationType: {
      ar: "نقطة مرجعية لمسار ممتد",
      en: "Representative point for an extended corridor"
    },
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    icon: "🚴",
    image: "https://www.vision2030.gov.sa/media/p22nklnn/sb-numbers4.jpg",
    summary: {
      ar: "مشروع يربط غرب الرياض بشرقها بمسارات للمشي والدراجات والخيل ومرافق رياضية ومساحات خضراء.",
      en: "A project connecting West and East Riyadh with walking, cycling, and horse tracks, sports facilities, and green spaces."
    },
    achievedText: {
      ar: "افتتحت المرحلة الأولى بخمس وجهات، ووصل طول الجزء المكتمل إلى 83 كم.",
      en: "The first phase with five destinations has opened, and the completed part reached 83 km."
    },
    remainingText: {
      ar: "المتبقي 60% حتى اكتمال المشروع بكامل عناصره ومرافقه.",
      en: "60% remaining until the project is fully completed with all its elements and facilities."
    },
    positiveImpacts: [
      { ar: "تشجيع النشاط البدني", en: "Encourage physical activity" },
      { ar: "زيادة المساحات الخضراء", en: "Increase green spaces" },
      { ar: "تحسين المشهد الحضري", en: "Improve urban landscape" },
      { ar: "رفع جاذبية الرياض للعيش والترفيه", en: "Enhance Riyadh's appeal for living and entertainment" }
    ],
    metrics: [
      { label: { ar: "الطول الكلي", en: "Total Length" }, value: { ar: "135+ كم", en: "135+ km" } },
      { label: { ar: "المنجز المفتوح", en: "Open Completed" }, value: { ar: "83 كم", en: "83 km" } },
      { label: { ar: "المرافق الرياضية", en: "Sports Facilities" }, value: { ar: "50", en: "50" } },
      { label: { ar: "المساحات الخضراء", en: "Green Spaces" }, value: { ar: "4.4 مليون م²", en: "4.4 million m²" } }
    ],
    sourceNote: { ar: "نسبة رسمية", en: "Official percentage" }
  },
  {
    id: "new-murabba",
    name: { ar: "المربع الجديد", en: "New Murabba" },
    category: { ar: "تطوير حضري", en: "Urban Development" },
    progress: 86,
    progressLabel: "86%",
    progressType: "official-subproject",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 14,
    location: [24.808118, 46.569226],
    locationType: {
      ar: "موقع المشروع الرئيسي",
      en: "Main project site"
    },
    gradient: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    icon: "🏙️",
    iconLabel: { ar: "منطقة حضرية", en: "Urban Area" },
    image: "https://media.assettype.com/ajel%2F2023-02%2Ffdf85a9d-434c-4127-98db-9da1130b7c84%2FFpFKOMPXEAEeccO.jpg",
    summary: {
      ar: "منطقة حضرية جديدة متعددة الاستخدامات تتضمن المكعب ومرافق سكنية وتجارية وترفيهية.",
      en: "A new mixed-use urban area including The Mukaab, residential, commercial, and entertainment facilities."
    },
    achievedText: {
      ar: "بلغت أعمال الحفر في موقع المكعب والمنصات المحيطة 86%.",
      en: "Excavation works at The Mukaab site and surrounding platforms reached 86%."
    },
    remainingText: {
      ar: "المتبقي 14% لهذا المؤشر الفرعي، وليس للمشروع الكلي.",
      en: "14% remaining for this sub-indicator, not the entire project."
    },
    positiveImpacts: [
      { ar: "خلق منطقة حضرية جديدة", en: "Create a new urban area" },
      { ar: "دعم الاستثمار والوظائف", en: "Support investment and jobs" },
      { ar: "تعزيز البنية التحتية الحضرية", en: "Enhance urban infrastructure" },
      { ar: "تنويع الأنشطة السكنية والتجارية", en: "Diversify residential and commercial activities" }
    ],
    metrics: [
      { label: { ar: "المساحة", en: "Area" }, value: { ar: "14.1 كم²", en: "14.1 km²" } },
      { label: { ar: "المسطحات المبنية", en: "Built-up Area" }, value: { ar: "25+ مليون م²", en: "25+ million m²" } },
      { label: { ar: "مؤشر الحفر", en: "Excavation Index" }, value: { ar: "86%", en: "86%" } },
      { label: { ar: "سنة الإطلاق", en: "Launch Year" }, value: { ar: "2023", en: "2023" } }
    ],
    sourceNote: { ar: "رسمي لمؤشر فرعي", en: "Official (Subproject)" }
  },
  {
    id: "green-riyadh",
    name: { ar: "الرياض الخضراء", en: "Green Riyadh" },
    category: { ar: "بيئة", en: "Environment" },
    progress: 53,
    progressLabel: "53%",
    progressType: "target-indicator",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 47,
    location: [24.713551, 46.675296],
    locationType: {
      ar: "نقطة مرجعية لمبادرة تغطي أنحاء الرياض",
      en: "Representative point for a citywide initiative"
    },
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    icon: "🌳",
    iconLabel: { ar: "تشجير", en: "Afforestation" },
    image: "https://www.rcrc.gov.sa/wp-content/uploads/2023/10/1-17-scaled.jpg",
    summary: {
      ar: "مشروع تشجير حضري ضخم يهدف إلى تحويل الرياض إلى مدينة أكثر خضرة وصحة واستدامة.",
      en: "A massive urban afforestation project aiming to make Riyadh greener, healthier, and more sustainable."
    },
    achievedText: {
      ar: "يتوفر مؤشر للبنية التحتية والشبكات وأهداف واضحة طويلة المدى.",
      en: "There is an indicator for infrastructure, networks, and clear long-term goals."
    },
    remainingText: {
      ar: "المتبقي تقديري في هذه النسخة لأغراض العرض البصري.",
      en: "The remaining percentage is estimated in this version for visual purposes."
    },
    positiveImpacts: [
      { ar: "خفض الحرارة", en: "Reduce temperature" },
      { ar: "تحسين جودة الهواء", en: "Improve air quality" },
      { ar: "زيادة المساحات الخضراء", en: "Increase green spaces" },
      { ar: "تحسين المشهد الحضري", en: "Enhance urban landscape" }
    ],
    metrics: [
      { label: { ar: "الهدف", en: "Target" }, value: { ar: "7.5 مليون شجرة", en: "7.5 million trees" } },
      { label: { ar: "شبكة الري", en: "Irrigation Network" }, value: { ar: "533 كم+", en: "533+ km" } },
      { label: { ar: "خفض الحرارة", en: "Temperature Reduction" }, value: { ar: "1.5 - 2°C", en: "1.5 - 2°C" } },
      { label: { ar: "التغطية الخضراء", en: "Green Coverage" }, value: { ar: "9%", en: "9%" } }
    ],
    sourceNote: { ar: "مؤشر متابعة", en: "Target Indicator" }
  },
  {
    id: "diriyah",
    name: { ar: "الدرعية", en: "Diriyah" },
    category: { ar: "تراث وسياحة", en: "Heritage & Tourism" },
    progress: null,
    progressLabel: { ar: "غير معلن", en: "Not Announced" },
    progressType: "no-single-official-percent",
    status: { ar: "تطوير مرحلي", en: "Phased Development" },
    remaining: null,
    location: [24.73333, 46.57556],
    locationType: {
      ar: "موقع الدرعية التاريخية",
      en: "Diriyah historic site"
    },
    gradient: "linear-gradient(135deg, #92400e, #d97706)",
    icon: "🏛️",
    iconLabel: { ar: "تراث", en: "Heritage" },
    image: "https://www.rcrc.gov.sa/wp-content/uploads/2023/07/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%A7%D9%84%D8%AA%D8%B7%D9%8A%D8%B1-2-1024x682.jpg",
    summary: {
      ar: "وجهة تاريخية وثقافية كبرى تجمع بين التراث النجدي والتطوير الحديث.",
      en: "A major historical and cultural destination combining Najdi heritage and modern development."
    },
    achievedText: {
      ar: "توجد أجزاء مفتوحة حاليًا مثل حي الطريف ومرافق أخرى مرحلية.",
      en: "Some parts are currently open, such as At-Turaif district and other phased facilities."
    },
    remainingText: {
      ar: "لا توجد نسبة موحدة منشورة للمشروع بالكامل.",
      en: "No unified percentage published for the entire project."
    },
    positiveImpacts: [
      { ar: "تعزيز السياحة الثقافية", en: "Promote cultural tourism" },
      { ar: "حفظ الهوية التاريخية", en: "Preserve historical identity" },
      { ar: "تنشيط الاقتصاد المحلي", en: "Boost local economy" },
      { ar: "جذب الزوار والاستثمارات", en: "Attract visitors and investments" }
    ],
    metrics: [
      { label: { ar: "المساحة التطويرية", en: "Development Area" }, value: { ar: "14 كم²", en: "14 km²" } },
      { label: { ar: "الفنادق", en: "Hotels" }, value: { ar: "28+", en: "28+" } },
      { label: { ar: "الوحدات السكنية", en: "Residential Units" }, value: { ar: "18k+", en: "18k+" } },
      { label: { ar: "الحالة", en: "Status" }, value: { ar: "تطوير مرحلي", en: "Phased Development" } }
    ],
    sourceNote: { ar: "حالة مرحلية", en: "Phased Status" }
  },
  {
    id: "king-salman-airport",
    name: { ar: "مطار الملك سلمان", en: "King Salman Airport" },
    category: { ar: "نقل", en: "Transport" },
    progress: 72,
    progressLabel: "72%",
    progressType: "official",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 28,
    location: [24.95778, 46.69889],
    locationType: {
      ar: "موقع المطار القائم والمشروع التطويري",
      en: "Within the current King Khalid Airport site and King Salman Airport redevelopment area"
    },
    gradient: "linear-gradient(135deg, #0891b2, #22c55e)",
    icon: "✈️",
    iconLabel: { ar: "مطار", en: "Airport" },
    image: "https://www.pif.gov.sa/-/media/project/pif-corporate/pif-corporate-site/our-investments/portfolio/slider-images/king-salman-international-airport/departuresaerial1200x750.webp?h=750&iar=0&w=1200&sc_lang=ar",
    summary: {
      ar: "مشروع مطار الملك سلمان الدولي يهدف إلى تعزيز الربط الجوي مع العالم ودعم نمو السياحة والأعمال في المملكة.",
      en: "King Salman International Airport aims to enhance air connectivity with the world and support tourism and business growth in Saudi Arabia."
    },
    achievedText: {
      ar: "تم الانتهاء من مراحل التصميم والبناء الأساسي لمدارج الإقلاع والهبوط والمحطة الرئيسية.",
      en: "Design and basic construction of runways and the main terminal have been completed."
    },
    remainingText: {
      ar: "المتبقي 28% للانتهاء من المرافق التشغيلية والخدمات اللوجستية.",
      en: "28% remaining to complete operational facilities and logistics services."
    },
    positiveImpacts: [
      { ar: "تعزيز الربط الدولي", en: "Enhance international connectivity" },
      { ar: "زيادة الطاقة الاستيعابية للركاب", en: "Increase passenger capacity" },
      { ar: "دعم قطاع السياحة والطيران", en: "Support tourism and aviation sector" },
      { ar: "خلق فرص وظيفية جديدة", en: "Create new job opportunities" }
    ],
    metrics: [
      { label: { ar: "عدد المدارج", en: "Number of Runways" }, value: { ar: "3", en: "3" } },
      { label: { ar: "الطاقة الاستيعابية", en: "Capacity" }, value: { ar: "45 مليون راكب", en: "45 million passengers" } },
      { label: { ar: "المساحة", en: "Area" }, value: { ar: "57 كم²", en: "57 km²" } },
      { label: { ar: "سنة التشغيل المتوقع", en: "Expected Operation Year" }, value: { ar: "2027", en: "2027" } }
    ],
    sourceNote: { ar: "نسبة رسمية", en: "Official percentage" }
  },
  {
    id: "king-salman-stadium",
    name: { ar: "ملعب الملك سلمان", en: "King Salman Stadium" },
    category: { ar: "جودة حياة", en: "Quality of Life" },
    progress: 58,
    progressLabel: "58%",
    progressType: "official",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 42,
    location: [24.86, 46.7],
    locationType: {
      ar: "موقع تقريبي ضمن نطاق المشروع",
      en: "Approximate point within the project area"
    },
    gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    icon: "🏟️",
    iconLabel: { ar: "ملعب", en: "Stadium" },
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2nMkMuHWtSVRHHXPrMSrpusA5v7BhAFIDw&s",
    summary: {
      ar: "مشروع ملعب الملك سلمان يمثل وجهة رياضية جديدة في الرياض ويستضيف فعاليات رياضية وترفيهية وطنية ودولية.",
      en: "King Salman Stadium is a new sports destination in Riyadh, hosting national and international sports and entertainment events."
    },
    achievedText: {
      ar: "اكتملت الأعمال الإنشائية الكبرى وتم البدء في تجهيز المدرجات والمرافق الأساسية.",
      en: "Major construction works are complete and stands and main facilities are being prepared."
    },
    remainingText: {
      ar: "المتبقي 42% لاستكمال التجهيزات التشغيلية والمرافق الخدمية.",
      en: "42% remaining to complete operational equipment and service facilities."
    },
    positiveImpacts: [
      { ar: "تعزيز الرياضة المجتمعية", en: "Promote community sports" },
      { ar: "استضافة فعاليات دولية", en: "Host international events" },
      { ar: "دعم قطاع الضيافة والسياحة الرياضية", en: "Support hospitality and sports tourism" },
      { ar: "خلق فرص عمل محلية", en: "Create local job opportunities" }
    ],
    metrics: [
      { label: { ar: "السعة", en: "Capacity" }, value: { ar: "40,000 متفرج", en: "40,000 spectators" } },
      { label: { ar: "الملاعب الفرعية", en: "Sub-stadiums" }, value: { ar: "4", en: "4" } },
      { label: { ar: "المرافق الترفيهية", en: "Entertainment Facilities" }, value: { ar: "10", en: "10" } },
      { label: { ar: "سنة الافتتاح المتوقع", en: "Expected Opening Year" }, value: { ar: "2026", en: "2026" } }
    ],
    sourceNote: { ar: "رسمي", en: "Official" }
  },
  {
    id: "king-salman-park",
    name: { ar: "حديقة الملك سلمان", en: "King Salman Park" },
    category: { ar: "بيئة", en: "Environment" },
    progress: 68,
    progressLabel: "68%",
    progressType: "target-indicator",
    status: { ar: "قيد التنفيذ", en: "In Progress" },
    remaining: 32,
    location: [24.719, 46.724],
    locationType: {
      ar: "موقع الحديقة",
      en: "Park site"
    },
    gradient: "linear-gradient(135deg, #059669, #22c55e)",
    icon: "🌿",
    iconLabel: { ar: "حديقة", en: "Park" },
    image: "https://www.vision2030.gov.sa/media/zs4mjgsk/hl_riyadh_aerial_view_final-min.jpg",
    summary: {
      ar: "حديقة الملك سلمان تمثل أحد أكبر المشاريع البيئية الحضرية في الرياض، وتوفر مساحات خضراء ومرافق عائلية حديثة.",
      en: "King Salman Park is one of the largest urban environmental projects in Riyadh, providing green spaces and modern family facilities."
    },
    achievedText: {
      ar: "تم إنشاء مساحات واسعة من الحدائق والمسارات المائية والبنى التحتية الخضراء.",
      en: "Large areas of gardens, water paths, and green infrastructure have been established."
    },
    remainingText: {
      ar: "المتبقي 32% حتى اكتمال المرافق الترفيهية والمناطق الخضراء.",
      en: "32% remaining until the completion of entertainment facilities and green areas."
    },
    positiveImpacts: [
      { ar: "تحسين جودة الهواء", en: "Improve air quality" },
      { ar: "زيادة النشاط الاجتماعي والعائلي", en: "Increase social and family activity" },
      { ar: "خفض حرارة المدينة", en: "Reduce city temperature" },
      { ar: "تعزيز السياحة البيئية", en: "Promote eco-tourism" }
    ],
    metrics: [
      { label: { ar: "المساحة", en: "Area" }, value: { ar: "14 كم²", en: "14 km²" } },
      { label: { ar: "مسارات المشي", en: "Walking Tracks" }, value: { ar: "40 كم", en: "40 km" } },
      { label: { ar: "المسطحات المائية", en: "Water Features" }, value: { ar: "8", en: "8" } },
      { label: { ar: "سنة الافتتاح المتوقع", en: "Expected Opening Year" }, value: { ar: "2026", en: "2026" } }
    ],
    sourceNote: { ar: "مؤشر متابعة", en: "Target Indicator" }
  }
];

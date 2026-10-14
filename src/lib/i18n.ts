"use client";

export type Language = "id" | "en" | "ja";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "id", label: "ID", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", label: "EN", nativeName: "English", flag: "🇬🇧" },
  { code: "ja", label: "JP", nativeName: "日本語", flag: "🇯🇵" },
];

export const TRANSLATIONS = {
  id: {
    // Nav
    navHome: "Home",
    navAbout: "Tentang",
    navServices: "Layanan",
    navSkills: "Keahlian",
    navProjects: "Proyek",
    navContact: "Kontak",
    downloadCv: "Download CV",

    // Hero
    codeThatWorks: "Code that works",
    designThatSells: "Design that sells",
    viewWork: "Lihat Karya",
    availableFreelance: "TERSEDIA UNTUK FREELANCE",
    fullstackDev: "Fullstack",
    developer: "Developer",
    schoolSubtitle: "Siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan",

    // Robot Speech & Actions
    robotGreeting: "Halo! Salam RPL dari SMKN 1 Pasuruan • Klik robot atau pilih aksi di bawah",
    actionWave: "Salam RPL",
    actionCode: "Holo Code",
    actionDebug: "Fix Bug",
    actionSpin: "Turbo Spin",
    actionDeploy: "Deploy App",
    actionThumbsUp: "Clean Code",
    actionDance: "Victory",
    actionArcade: "🚀 Misi Roket",

    // Robot Speeches
    speechWave: [
      "Halo! Salam Rekayasa Perangkat Lunak dari SMKN 1 Pasuruan!",
      "Selamat datang di Azmi.Dev - Siswa RPL SMKN 1 Pasuruan!",
      "Siap bantu kembangkan proyek digital Anda dengan standar modern!",
    ],
    speechCode: [
      "rpl-terminal: npm run dev --turbo",
      "Menulis kode TypeScript bersih & modular • SMKN 1 Pasuruan!",
      "const dev = 'Azmi'; // Rekayasa Perangkat Lunak SMKN 1 Pasuruan",
      "Membangun web app modern dengan Next.js 16 & React 19!",
    ],
    speechDebug: [
      "0 Error, 0 Warning! Bug Berhasil Diatasi!",
      "Menjalankan automated test: 100% PASSED!",
      "Memory leak diperiksa & clean architecture diterapkan!",
      "Syntax terverifikasi: Tidak ada runtime exceptions!",
    ],
    speechSpin: [
      "Mode Kompilasi Turbo Overclock Aktif!",
      "Akselerasi hardware performa tinggi aktif!",
      "Sistem Turbo 360° Multi-Threaded!",
    ],
    speechDeploy: [
      "Mendeploy ke Cloud Production!",
      "Vercel Edge Network: Status LIVE 200 OK!",
      "Docker Container diluncurkan dengan zero downtime!",
    ],
    speechThumbsUp: [
      "Clean Code & Solid Architecture Terverifikasi!",
      "Code that works, Design that sells!",
      "TypeScript strict mode: Disetujui SMKN 1 Pasuruan!",
    ],
    speechDance: [
      "Semua unit test lolos pada percobaan pertama!",
      "Fitur berhasil dirilis tepat waktu!",
      "Target sprint tercapai dengan kecepatan 100%!",
    ],
    speechPoke: [
      "Bip-bop! 👋 Halo dari SMKN 1 Pasuruan!",
      "Sensor sentuh aktif! Ada yang bisa dibantu?",
      "Hehe, jangan geli! Siap coding sekarang!",
      "SMKN 1 Pasuruan RPL siap meluncur!",
    ],

    // Drone Companion
    droneAbout: "Azmi adalah siswa SMKN 1 Pasuruan jurusan RPL yang passionate di bidang Web & Software Engineering!",
    droneServices: "Butuh Web App interaktif, integrasi API, atau desain UI/UX modern? Azmi siap membantu!",
    droneSkills: "Scanning stack... 95% TypeScript & React, 90% Next.js, didukung Tailwind & Supabase!",
    droneProjects: "Setiap proyek dibangun dengan standar industri: responsif, cepat, & fungsional!",
    droneContact: "Punya ide proyek menarik atau ingin berkolaborasi? Kirim pesan sekarang!",

    // About / Resume Section
    aboutTitle: "About Me",
    aboutRoleStudent: "Student SMKN 1 Pasuruan",
    aboutRoleStudentDesc:
      "Saya Muhammad Ulil Azmi merupakan siswa SMK Negeri 1 Pasuruan dari jurusan Rekayasa Perangkat Lunak (RPL). Saya memiliki ketertarikan dan fokus pada bidang teknologi, khususnya pengembangan website dan aplikasi. Saya terus mengembangkan kemampuan dalam pemrograman, desain antarmuka, serta pembuatan aplikasi menggunakan teknologi modern seperti React, Next.js, dan database.",
    aboutRoleLesson: "Lesson Learned",
    aboutRoleLessonDesc:
      "Saya mempelajari berbagai bidang dalam pengembangan perangkat lunak, mulai dari pembuatan dan pengelolaan database menggunakan XAMPP dan Supabase, hingga pengembangan website menggunakan JavaScript, TypeScript, React, Next.js, dan Tailwind CSS. Selain itu, saya juga mempelajari desain antarmuka menggunakan Figma serta dasar-dasar pemrograman menggunakan Python. Fokus saya adalah mengembangkan kemampuan dalam membuat website dan aplikasi yang modern, responsif, dan mudah digunakan.",
    aboutRoleGoals: "Future Goals",
    aboutRoleGoalsDesc:
      "Future goals saya adalah terus mengembangkan kemampuan di bidang teknologi dan pemrograman, terutama dalam pengembangan website dan aplikasi. Saya ingin memperdalam skill seperti React, Next.js, JavaScript, Python, database, dan UI/UX. Ke depannya, saya berharap dapat menjadi seorang developer yang profesional, mampu membuat karya yang bermanfaat, serta terus belajar mengikuti perkembangan teknologi.",
    openToWork: "Open to work & freelance",
    pasuruanLocation: "Pasuruan, Jawa Timur",
    emailDirect: "Kirim Email",
    portfolioCv: "Lihat CV / Resume",
    locationChip: "Lokasi",
    focusChip: "Fokus",
    focusValue: "Web & UI/UX",
    studyPeriod: "Juli 2025 - April 2028",

    // Intro Scene
    skipIntro: "Lewati Intro",
    introSubtitle: "Rekayasa Perangkat Lunak • Fullstack Developer",
    introInitializing: "Inisialisasi sistem...",
    introReady: "Sistem Siap",

    // Services Section
    servicesTitle: "My Services",
    servicesSubtitle: "Layanan yang saya tawarkan untuk membantu Anda mewujudkan kebutuhan digital.",
    serviceUiUxTitle: "UI/UX Website",
    serviceUiUxDesc: "Menyusun tampilan website yang jelas, rapi, dan mudah digunakan di berbagai ukuran layar.",
    serviceFrontendTitle: "Frontend Web",
    serviceFrontendDesc: "Membangun halaman web responsif menggunakan React, Next.js, dan Tailwind CSS.",
    serviceBackendTitle: "Backend & Database",
    serviceBackendDesc: "Menghubungkan aplikasi dengan API, Supabase, MySQL, dan pengelolaan data yang terstruktur.",
    serviceFullstackTitle: "Fullstack Project",
    serviceFullstackDesc: "Mengerjakan website dan aplikasi dari antarmuka sampai fungsi server sesuai kebutuhan proyek.",

    // Skills Section
    skillsTitle: "Skills & Tech Stack",
    skillsIntro: "Teknologi dan tools yang saya kuasai dan terapkan dalam pengembangan aplikasi web nyata.",
    skillGroupFrontend: "Frontend Development",
    skillGroupFrontendTag: "UI & Logika",
    skillGroupFrontendDesc: "Teknologi modern untuk merancang antarmuka web yang responsif, interaktif, dan berperforma tinggi.",
    skillGroupBackend: "Backend & Database",
    skillGroupBackendTag: "Server & Data",
    skillGroupBackendDesc: "Fondasi backend untuk pengolahan data terstruktur, REST API, authentication, dan penyimpanan cloud.",
    skillGroupTools: "Design & Developer Tools",
    skillGroupToolsTag: "Workflow & Prototyping",
    skillGroupToolsDesc: "Ekosistem tools pendukung untuk prototyping desain antarmuka, version control, dan efisiensi coding.",

    // Projects Section
    projectsTitle: "Recent Projects",
    projectsSubtitle: "Karya dan aplikasi web yang telah saya kembangkan",
    allProjectsHeading: "Semua Proyek",
    searchResultsFor: "Hasil pencarian untuk",
    projectsLeadEyebrow: "Karya Terpilih",
    projectsLeadTitle: "Eksperimen nyata, solusi konkret, dan karya yang bermanfaat.",
    projectsLeadDesc: "Kumpulan website dan ide produk yang dibangun seraya mempelajari bagaimana desain, kode, dan fungsionalitas menyatu.",
    showingProjects: "Menampilkan",
    ofProjects: "dari",
    projectsFound: "proyek ditemukan",
    viewAllProjects: "Lihat semua proyek",
    noProjectsFound: "Tidak ada proyek ditemukan untuk",
    visitLiveProject: "Visit live project",
    githubRepo: "GitHub Repository",
    backToProjects: "Kembali ke proyek",
    projectSearchPlaceholder: "Cari proyek...",
    searchBtn: "Cari",
    filterAll: "Semua",
    filterWebsite: "Website",
    filterIot: "IoT",
    filterMobile: "Mobile App",
    filterDesign: "Desain",
    viewCategoryOnly: "Lihat kategori ini →",
    projectDetailEyebrow: "Detail Proyek",
    projectDetailDesc: "Melihat lebih dekat konsep, teknologi, dan pembelajaran di balik proyek ini.",

    // Contact Section
    contactGetInTouch: "Get in Touch",
    contactCritiqueTitle: "Beri Kritik Atau Saran Anda Di Sini",
    contactCritiqueDesc:
      "Punya pertanyaan, ide kolaborasi, atau ingin berdiskusi mengenai proyek web modern? Jangan ragu untuk menghubungi saya. Saya siap merespons dan terhubung untuk berbagai kesempatan.",
    contactLocationFull: "Indonesia, Jawa Timur, Kota Pasuruan",
    contactDirectTransmission: "Direct Transmission",
    contactEncrypted: "Terenkripsi • Respon Cepat",
    formNameLabel: "Nama Anda",
    formNamePlaceholder: "Nama lengkap Anda",
    formEmailLabel: "Email Anda",
    formEmailPlaceholder: "johndoe@example.com",
    formSubjectLabel: "Subjek Pesan",
    formSubjectPlaceholder: "Kolaborasi Project / Tanya Sesuatu",
    formMessageLabel: "Isi Pesan",
    formMessagePlaceholder: "Tuliskan pesan atau detail project Anda di sini...",
    formSendBtn: "Kirim Pesan Sekarang",
    formTransmittingBtn: "Mengirim pesan...",
    formSuccessToast: "Pesan berhasil terkirim! Terima kasih telah menghubungi.",
    formErrorToast: "Gagal mengirim pesan. Silakan coba lagi.",
    formNetworkError: "Terjadi kesalahan jaringan.",
    socialChannels: "Media Sosial",

    // Footer Section
    footerBrandDesc:
      "Membangun pengalaman digital yang modern, responsif, dan berestetika tinggi. Rekayasa Perangkat Lunak berkualitas dari SMKN 1 Pasuruan.",
    footerQuickLinks: "Quick Links",
    footerGetInTouch: "Get in Touch",
    footerCtaDesc: "Tertarik berkolaborasi atau punya proyek impian? Jangan ragu untuk menghubungi saya.",
    footerCopyText: "Muhammad Ulil Azmi. Dibuat dengan cinta & kode bersih.",
    designedDevelopedBy: "Didesain & Dikembangkan oleh Azmi",

    // Rocket Arcade Game Strings
    arcadeTitle: "COSMIC ROCKET ODYSSEY",
    arcadeSchoolTag: "SMKN 1 PASURUAN • RPL",
    arcadeMission: "Sektor",
    arcadeCompleted: "LEVEL FINISH REACHED! 🎉",
    arcadeCrashed: "HULL CRITICAL: MISI GAGAL 💥",
    arcadeEmpReady: "SHIELD BOOST READY!",
    arcadeStartTitle: "EKSPEDISI ROKET KOSMIK (10 LEVEL)",
    arcadeStartDesc:
      "Kemudikan roket melintasi sabuk asteroid berbahaya hingga ke Stasiun Finish! Hindari batu-batu kosmik, kumpulkan kristal starlight, gunakan turbo shield, dan selesaikan 10 tingkat kesulitan dengan tingkat keberhasilan tertinggi!",
    arcadeStartBtn: "LUNCURKAN ROKET SEKARANG 🚀",
    arcadeResultTitle: "LAPORAN HASIL MISI PENERBANGAN",
    arcadeSuccessRateLabel: "TINGKAT KEBERHASILAN",
    arcadePointsLabel: "TOTAL POIN DIDAPAT",
    arcadeDistanceLabel: "JARAK DITEMPUH",
    arcadeDodgedLabel: "ASTEROID DIHINDARI",
    arcadeNextLevelBtn: "Lanjut Level Berikutnya 🚀",
    arcadePlayAgain: "Coba Lagi",
    arcadeClose: "Keluar Game",
    arcadeSelectLevel: "Pilih Sektor Level",
    arcadeTip: "💡 Gerakkan pointer/drag atau tombol [A/D / Panah] untuk menghindar. Tekan [SPASI] / Boost untuk Shield Pulse!",
  },

  en: {
    // Nav
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    downloadCv: "Download CV",

    // Hero
    codeThatWorks: "Code that works",
    designThatSells: "Design that sells",
    viewWork: "View Work",
    availableFreelance: "AVAILABLE FOR FREELANCE",
    fullstackDev: "Fullstack",
    developer: "Developer",
    schoolSubtitle: "Software Engineering Student at SMKN 1 Pasuruan",

    // Robot Speech & Actions
    robotGreeting: "Hello! Software Engineering student from SMKN 1 Pasuruan • Click robot or select actions below",
    actionWave: "Say Hello",
    actionCode: "Holo Code",
    actionDebug: "Fix Bug",
    actionSpin: "Turbo Spin",
    actionDeploy: "Deploy App",
    actionThumbsUp: "Clean Code",
    actionDance: "Victory",
    actionArcade: "🚀 Rocket Game",

    // Robot Speeches
    speechWave: [
      "Hello! Software Engineering student from SMKN 1 Pasuruan!",
      "Welcome to Azmi.Dev - High school developer from Pasuruan, Indonesia!",
      "Ready to build high-performance digital projects for your business!",
    ],
    speechCode: [
      "rpl-terminal: npm run dev --turbo",
      "Writing clean, modular TypeScript code • SMKN 1 Pasuruan!",
      "const dev = 'Azmi'; // Software Engineering at SMKN 1 Pasuruan",
      "Building modern web apps with Next.js 16 & React 19!",
    ],
    speechDebug: [
      "0 Errors, 0 Warnings! Bug Resolved successfully!",
      "Running automated tests: 100% PASSED!",
      "Memory leak verified & clean architecture enforced!",
      "Syntax verified: Zero runtime exceptions!",
    ],
    speechSpin: [
      "Overclocked Compilation Turbo Mode Active!",
      "Hardware acceleration running at maximum velocity!",
      "System Turbo 360° Multi-Threaded Engine!",
    ],
    speechDeploy: [
      "Deploying to Cloud Production Edge Network!",
      "Vercel Edge Network: Status LIVE 200 OK!",
      "Docker containers launched with zero downtime!",
    ],
    speechThumbsUp: [
      "Clean Code & Solid Architecture Approved!",
      "Code that works, Design that sells!",
      "TypeScript strict mode: Approved by SMKN 1 Pasuruan!",
    ],
    speechDance: [
      "All unit tests passed on first attempt!",
      "Features shipped on schedule with excellence!",
      "Sprint goal achieved with 100% team velocity!",
    ],
    speechPoke: [
      "Beep-boop! 👋 Greetings from SMKN 1 Pasuruan!",
      "Touch sensors active! How can I help you?",
      "Hehe, ticklish! Ready to build amazing code!",
      "SMKN 1 Pasuruan software engineering ready!",
    ],

    // Drone Companion
    droneAbout: "Azmi is a Software Engineering student at SMKN 1 Pasuruan passionate about modern web & apps!",
    droneServices: "Need fullstack web apps, API integration, or interactive UI? Azmi is ready to help!",
    droneSkills: "Scanning stack... 95% TypeScript & React, 90% Next.js, powered by Tailwind & Supabase!",
    droneProjects: "Each project is built with production standards: responsive, fast, and fully functional!",
    droneContact: "Have an exciting project idea or want to collaborate? Send a message anytime!",

    // About / Resume Section
    aboutTitle: "About Me",
    aboutRoleStudent: "Student SMKN 1 Pasuruan",
    aboutRoleStudentDesc:
      "I am Muhammad Ulil Azmi, a Software Engineering student at SMKN 1 Pasuruan, Indonesia. I focus on modern web and application development, continuously leveling up my skills in React, Next.js, TypeScript, UI/UX, and cloud database architectures.",
    aboutRoleLesson: "Lesson Learned",
    aboutRoleLessonDesc:
      "I have explored full-cycle software development, from managing databases with XAMPP and Supabase, to building scalable web apps using JavaScript, TypeScript, React, Next.js, and Tailwind CSS. I also design clean interfaces in Figma and write foundational scripts in Python.",
    aboutRoleGoals: "Future Goals",
    aboutRoleGoalsDesc:
      "My goal is to evolve into a world-class professional developer who builds impactful, high-performance web products while staying ahead of modern engineering practices.",
    openToWork: "Open to work & freelance",
    pasuruanLocation: "Pasuruan, East Java, Indonesia",
    emailDirect: "Send Email",
    portfolioCv: "View CV / Resume",
    locationChip: "Location",
    focusChip: "Focus",
    focusValue: "Web & UI/UX",
    studyPeriod: "July 2025 - April 2028",

    // Intro Scene
    skipIntro: "Skip Intro",
    introSubtitle: "Software Engineering • Fullstack Developer",
    introInitializing: "Initializing system...",
    introReady: "System Ready",

    // Services Section
    servicesTitle: "My Services",
    servicesSubtitle: "Services I offer to help bring your digital vision to life with modern technologies.",
    serviceUiUxTitle: "UI/UX Website",
    serviceUiUxDesc: "Crafting clear, clean, and intuitive website interfaces tailored for all device sizes.",
    serviceFrontendTitle: "Frontend Web",
    serviceFrontendDesc: "Building responsive, lightning-fast web applications using React, Next.js, and Tailwind CSS.",
    serviceBackendTitle: "Backend & Database",
    serviceBackendDesc: "Connecting web apps with robust APIs, Supabase, MySQL, and structured data pipelines.",
    serviceFullstackTitle: "Fullstack Project",
    serviceFullstackDesc: "Delivering complete digital solutions from front-end design to secure back-end server logic.",

    // Skills Section
    skillsTitle: "Skills & Tech Stack",
    skillsIntro: "Technologies and tools I master and implement in real-world software engineering.",
    skillGroupFrontend: "Frontend Development",
    skillGroupFrontendTag: "UI & Logic",
    skillGroupFrontendDesc: "Modern technologies to craft responsive, interactive, and high-performance interfaces.",
    skillGroupBackend: "Backend & Database",
    skillGroupBackendTag: "Server & Data",
    skillGroupBackendDesc: "Backend foundation for structured data processing, REST APIs, authentication, and cloud storage.",
    skillGroupTools: "Design & Developer Tools",
    skillGroupToolsTag: "Workflow & Prototyping",
    skillGroupToolsDesc: "Supporting ecosystem for UI prototyping, version control, and streamlined coding workflow.",

    // Projects Section
    projectsTitle: "Recent Projects",
    projectsSubtitle: "Featured web applications and systems I have developed",
    allProjectsHeading: "All Projects",
    searchResultsFor: "Search results for",
    projectsLeadEyebrow: "Selected Work",
    projectsLeadTitle: "Small experiments, real problems, and lessons that stick.",
    projectsLeadDesc: "A collection of websites and product ideas built while learning how design, code, and useful functionality come together.",
    showingProjects: "Showing",
    ofProjects: "of",
    projectsFound: "projects found",
    viewAllProjects: "View all projects",
    noProjectsFound: "No projects found for",
    visitLiveProject: "Visit live project",
    githubRepo: "GitHub Repository",
    backToProjects: "Back to projects",
    projectSearchPlaceholder: "Search projects...",
    searchBtn: "Search",
    filterAll: "All",
    filterWebsite: "Website",
    filterIot: "IoT",
    filterMobile: "Mobile App",
    filterDesign: "Design",
    viewCategoryOnly: "View category →",
    projectDetailEyebrow: "Project Detail",
    projectDetailDesc: "A closer look at the idea, technology, and lessons behind this project.",

    // Contact Section
    contactGetInTouch: "Get in Touch",
    contactCritiqueTitle: "Share Your Feedback or Project Inquiries",
    contactCritiqueDesc:
      "Have a question, collaboration idea, or want to discuss modern web projects? Feel free to reach out. I am excited to connect and explore new opportunities.",
    contactLocationFull: "Pasuruan, East Java, Indonesia",
    contactDirectTransmission: "Direct Transmission",
    contactEncrypted: "Encrypted • Fast Reply",
    formNameLabel: "Your Name",
    formNamePlaceholder: "Your full name",
    formEmailLabel: "Your Email",
    formEmailPlaceholder: "johndoe@example.com",
    formSubjectLabel: "Subject",
    formSubjectPlaceholder: "Project Collaboration / General Inquiry",
    formMessageLabel: "Message",
    formMessagePlaceholder: "Write your message or project details here...",
    formSendBtn: "Send Message Now",
    formTransmittingBtn: "Transmitting message...",
    formSuccessToast: "Message sent successfully! Thank you for reaching out.",
    formErrorToast: "Failed to send message. Please try again.",
    formNetworkError: "Network connection error.",
    socialChannels: "Social Channels",

    // Footer Section
    footerBrandDesc:
      "Building modern, responsive, and aesthetically pleasing digital experiences. Quality Software Engineering from SMKN 1 Pasuruan.",
    footerQuickLinks: "Quick Links",
    footerGetInTouch: "Get in Touch",
    footerCtaDesc: "Interested in collaborating or building your dream project? Feel free to reach out anytime.",
    footerCopyText: "Muhammad Ulil Azmi. Built with love & clean code.",
    designedDevelopedBy: "Designed & Developed by Azmi",

    // Rocket Arcade Game Strings
    arcadeTitle: "COSMIC ROCKET ODYSSEY",
    arcadeSchoolTag: "SMKN 1 PASURUAN • RPL",
    arcadeMission: "Sector",
    arcadeCompleted: "LEVEL FINISH REACHED! 🎉",
    arcadeCrashed: "HULL BREACH: MISSION FAILED 💥",
    arcadeEmpReady: "SHIELD BOOST READY!",
    arcadeStartTitle: "COSMIC ROCKET EXPEDITION (10 LEVELS)",
    arcadeStartDesc:
      "Pilot Azmi's rocket through perilous asteroid belts to reach the finish warp gate! Dodge cosmic rocks, collect starlight crystals, deploy your turbo shield, and conquer all 10 difficulty sectors with top success rate!",
    arcadeStartBtn: "LAUNCH ROCKET NOW 🚀",
    arcadeResultTitle: "FLIGHT MISSION REPORT",
    arcadeSuccessRateLabel: "SUCCESS RATE",
    arcadePointsLabel: "TOTAL POINTS EARNED",
    arcadeDistanceLabel: "DISTANCE TRAVELED",
    arcadeDodgedLabel: "ASTEROIDS DODGED",
    arcadeNextLevelBtn: "Next Sector Level 🚀",
    arcadePlayAgain: "Try Again",
    arcadeClose: "Exit Game",
    arcadeSelectLevel: "Select Sector Level",
    arcadeTip: "💡 Move mouse/drag or [A/D / Arrows] to steer. Press [SPACE] / Boost button for Shield Pulse!",
  },

  ja: {
    // Nav
    navHome: "ホーム",
    navAbout: "紹介",
    navServices: "サービス",
    navSkills: "スキル",
    navProjects: "実績",
    navContact: "連絡先",
    downloadCv: "履歴書DL",

    // Hero
    codeThatWorks: "確実に動くコード",
    designThatSells: "魅せるデザイン",
    viewWork: "実績を見る",
    availableFreelance: "フリーランス受付中",
    fullstackDev: "フルスタック",
    developer: "エンジニア",
    schoolSubtitle: "インドネシア SMKN 1 Pasuruan ソフトウェア工学科",

    // Robot Speech & Actions
    robotGreeting: "こんにちは！SMKN 1 PasuruanのRPLロボットです • ロボットをタップするか下記のアクションを選んでね",
    actionWave: "挨拶",
    actionCode: "ホロコード",
    actionDebug: "バグ修正",
    actionSpin: "ターボ回転",
    actionDeploy: "デプロイ",
    actionThumbsUp: "クリーン",
    actionDance: "勝利ダンス",
    actionArcade: "🚀 ロケット作戦",

    // Robot Speeches
    speechWave: [
      "こんにちは！インドネシア・SMKN 1 Pasuruanのソフトウェア工学科のアズミです！",
      "Azmi.Devへようこそ！モダンなウェブアプリ開発を専門としています！",
      "あなたのビジネスのために高性能なデジタル製品を開発します！",
    ],
    speechCode: [
      "rpl-terminal: npm run dev --turbo",
      "クリーンでモジュール化されたTypeScriptコードを作成中！",
      "const dev = 'Azmi'; // SMKN 1 Pasuruan ソフトウェア工学科",
      "Next.js 16 と React 19 でモダンなWebアプリを構築中！",
    ],
    speechDebug: [
      "エラー0件、警告0件！バグは正常に解決されました！",
      "自動テスト実行中: 100% 合格！",
      "メモリリーク検査済み＆クリーンアーキテクチャ適用！",
      "構文検証完了: 実行時例外ゼロ！",
    ],
    speechSpin: [
      "ターボオーバークロックコンパイルモード起動！",
      "ハードウェアアクセラレーション最高速度で動作中！",
      "360°マルチスレッド高速処理エンジン！",
    ],
    speechDeploy: [
      "クラウド本番環境へデプロイ中！",
      "Vercel Edge Network: ステータス LIVE 200 OK！",
      "ダウンタイムゼロでDockerコンテナを起動しました！",
    ],
    speechThumbsUp: [
      "クリーンコード＆堅牢な設計を確認済み！",
      "確実に動くコード、魅せるデザイン！",
      "TypeScript厳格モード: SMKN 1 Pasuruan公認！",
    ],
    speechDance: [
      "最初の試行ですべての単体テストに合格しました！",
      "予定通りに素晴らしい新機能をリリースしました！",
      "スプリント目標100%達成！",
    ],
    speechPoke: [
      "ピポパポ！👋 SMKN 1 Pasuruanへようこそ！",
      "タッチセンサー感知！何かお手伝いしましょうか？",
      "くすぐったい！いつでも開発準備OKです！",
      "SMKN 1 Pasuruan ソフトウェア工学です！",
    ],

    // Drone Companion
    droneAbout: "アズミはSMKN 1 PasuruanでモダンなWeb開発を学ぶ熱心なエンジニアです！",
    droneServices: "フルスタックアプリ、API連携、UIデザインが必要ですか？喜んでお手伝いします！",
    droneSkills: "TypeScript、React、Next.js、Tailwind、Supabaseを中心とした最新スタック！",
    droneProjects: "すべてのプロジェクトは高速、レスポンシブ、実用的に作られています！",
    droneContact: "プロジェクトのご相談やコラボレーションはお気軽にメッセージをお送りください！",

    // About / Resume Section
    aboutTitle: "私について",
    aboutRoleStudent: "SMKN 1 Pasuruan ソフトウェア工学科",
    aboutRoleStudentDesc:
      "私はムハンマド・ウリル・アズミ（Muhammad Ulil Azmi）と申します。インドネシア・SMKN 1 Pasuruanのソフトウェア工学科（RPL）に在籍しています。Web開発やアプリケーション制作に強い情熱を持ち、React、Next.js、TypeScriptなどのモダン技術を使った開発スキルを日々磨いています。",
    aboutRoleLesson: "学習領域とスキルセット",
    aboutRoleLessonDesc:
      "XAMPPやSupabaseを用いたデータベース構築から、JavaScript、TypeScript、React、Next.js、Tailwind CSSを用いたWeb開発まで幅広く学習しています。また、FigmaによるUIデザインやPythonの基礎も習得し、使いやすく洗練されたソフトウェア制作に注力しています。",
    aboutRoleGoals: "将来の目標",
    aboutRoleGoalsDesc:
      "将来の目標は、React、Next.js、クラウド設計、UI/UXを高水準でこなすプロのフルスタックエンジニアになることです。社会に貢献できる有用なプロダクトを生み出し、常に最新技術を追求し続けたいと考えています。",
    openToWork: "仕事・フリーランス募集中",
    pasuruanLocation: "インドネシア 東ジャワ州 パスルアン",
    emailDirect: "メールを送信",
    portfolioCv: "履歴書 / 実績を見る",
    locationChip: "所在地",
    focusChip: "注力分野",
    focusValue: "Web & UI/UX",
    studyPeriod: "2025年7月 - 2028年4月",

    // Intro Scene
    skipIntro: "スキップ",
    introSubtitle: "ソフトウェア工学 • フルスタックエンジニア",
    introInitializing: "システム初期化中...",
    introReady: "システム準備完了",

    // Services Section
    servicesTitle: "提供サービス",
    servicesSubtitle: "最先端テクノロジーによるモダンなデジタルソリューション。",
    serviceUiUxTitle: "Web UI/UXデザイン",
    serviceUiUxDesc: "あらゆる画面サイズに対応した、明快で洗練された直感的なWebデザインの制作。",
    serviceFrontendTitle: "フロントエンド開発",
    serviceFrontendDesc: "React、Next.js、Tailwind CSSを用いた高速でレスポンシブなWebアプリケーション開発。",
    serviceBackendTitle: "バックエンド＆DB",
    serviceBackendDesc: "REST API、Supabase、MySQLと連携した堅牢なデータ管理基盤の構築。",
    serviceFullstackTitle: "フルスタック開発",
    serviceFullstackDesc: "フロントエンドからサーバーロジックまで一貫したデジタルソリューションの提供。",

    // Skills Section
    skillsTitle: "スキルと技術スタック",
    skillsIntro: "実世界のWebアプリケーション開発において習熟・実践している技術スタック。",
    skillGroupFrontend: "フロントエンド開発",
    skillGroupFrontendTag: "UI & ロジック",
    skillGroupFrontendDesc: "レスポンシブでインタラクティブ、高パフォーマンスなWebインターフェース。",
    skillGroupBackend: "バックエンド＆DB",
    skillGroupBackendTag: "サーバー＆データ",
    skillGroupBackendDesc: "構造化データ処理、REST API、認証、クラウドストレージのバックエンド基盤。",
    skillGroupTools: "デザイン＆開発ツール",
    skillGroupToolsTag: "ワークフロー＆プロトタイピング",
    skillGroupToolsDesc: "UIプロトタイピング、バージョン管理、効率的なコーディングワークフロー。",

    // Projects Section
    projectsTitle: "主なプロジェクト",
    projectsSubtitle: "これまでに開発したWebアプリケーションおよびプロジェクト",
    allProjectsHeading: "すべてのプロジェクト",
    searchResultsFor: "の検索結果",
    projectsLeadEyebrow: "厳選実績",
    projectsLeadTitle: "実践的な実験、具体的な課題解決、記憶に残る学び。",
    projectsLeadDesc: "デザイン、コード、そして実用的な機能性がどのように融合するかを追求したWebサイトとプロダクトの集大成。",
    showingProjects: "表示中:",
    ofProjects: "/",
    projectsFound: "件のプロジェクト",
    viewAllProjects: "すべてのプロジェクトを見る",
    noProjectsFound: "該当するプロジェクトが見つかりませんでした:",
    visitLiveProject: "公開サイトを見る",
    githubRepo: "GitHubリポジトリ",
    backToProjects: "プロジェクト一覧に戻る",
    projectSearchPlaceholder: "プロジェクトを検索...",
    searchBtn: "検索",
    filterAll: "すべて",
    filterWebsite: "ウェブサイト",
    filterIot: "IoT",
    filterMobile: "モバイルアプリ",
    filterDesign: "デザイン",
    viewCategoryOnly: "このカテゴリーを見る →",
    projectDetailEyebrow: "プロジェクト詳細",
    projectDetailDesc: "このプロジェクトのコンセプト、技術スタック、学びについての詳細。",

    // Contact Section
    contactGetInTouch: "お問い合わせ",
    contactCritiqueTitle: "ご意見・ご相談はこちらから",
    contactCritiqueDesc:
      "ご質問、協業のご相談、Web開発のディスカッションなど、お気軽にご連絡ください。喜んでご対応いたします。",
    contactLocationFull: "インドネシア 東ジャワ州 パスルアン市",
    contactDirectTransmission: "ダイレクト送信",
    contactEncrypted: "暗号化済み • 迅速な返信",
    formNameLabel: "お名前",
    formNamePlaceholder: "山田 太郎",
    formEmailLabel: "メールアドレス",
    formEmailPlaceholder: "johndoe@example.com",
    formSubjectLabel: "件名",
    formSubjectPlaceholder: "プロジェクト相談 / お問い合わせ",
    formMessageLabel: "メッセージ本文",
    formMessagePlaceholder: "メッセージやプロジェクトの詳細をご記入ください...",
    formSendBtn: "メッセージを送信する",
    formTransmittingBtn: "送信中...",
    formSuccessToast: "メッセージが正常に送信されました！ご連絡ありがとうございます。",
    formErrorToast: "送信に失敗しました。もう一度お試しください。",
    formNetworkError: "ネットワークエラーが発生しました。",
    socialChannels: "ソーシャルメディア",

    // Footer Section
    footerBrandDesc:
      "モダンでレスポンシブ、洗練されたデジタル体験を構築。SMKN 1 Pasuruanの高品質なソフトウェアエンジニアリング。",
    footerQuickLinks: "クイックリンク",
    footerGetInTouch: "ご連絡先",
    footerCtaDesc: "コラボレーションやプロジェクト開発にご興味がありますか？お気軽にご相談ください。",
    footerCopyText: "Muhammad Ulil Azmi. クリーンコードで構築。",
    designedDevelopedBy: "Designed & Developed by Azmi",

    // Rocket Arcade Game Strings
    arcadeTitle: "COSMIC ROCKET ODYSSEY",
    arcadeSchoolTag: "SMKN 1 PASURUAN • RPL",
    arcadeMission: "セクター",
    arcadeCompleted: "ゴール到達！クリア！ 🎉",
    arcadeCrashed: "機体大破：ミッション失敗 💥",
    arcadeEmpReady: "シールドブースト準備完了！",
    arcadeStartTitle: "宇宙ロケット大作戦 (全10レベル)",
    arcadeStartDesc:
      "ロケットを操縦して危険な小惑星帯を回避しながらゴールゲートを目指そう！スターライトクリスタルを集め、ターボシールドを展開し、全10ステージを最高成功率で攻略しよう！",
    arcadeStartBtn: "ロケット発進！ 🚀",
    arcadeResultTitle: "フライトミッションレポート",
    arcadeSuccessRateLabel: "任務成功率",
    arcadePointsLabel: "獲得合計ポイント",
    arcadeDistanceLabel: "飛行距離",
    arcadeDodgedLabel: "回避した小惑星",
    arcadeNextLevelBtn: "次のレベルへ進む 🚀",
    arcadePlayAgain: "もう一度挑戦",
    arcadeClose: "ゲームを閉じる",
    arcadeSelectLevel: "レベル選択",
    arcadeTip: "💡 マウス/ドラッグまたは[A/D/矢印キー]で操縦。[スペース]でシールド衝撃波発動！",
  },
};

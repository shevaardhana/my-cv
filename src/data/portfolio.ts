import type {
  Skill,
  ContactInfo,
} from '../types/index';

export const heroData = {
  id: {
    name: 'Sheva Ardhana',
    roles: ['Fullstack Developer', 'Frontend Developer', 'Backend Developer'],
    description:
      'Fullstack Developer dengan 4 tahun pengalaman membangun aplikasi web modern. Berpengalaman di Frontend (ReactJS, VueJS) maupun Backend (Laravel, Golang, ExpressJS).',
    githubUrl: 'https://github.com/shevaardhana',
    linkedinUrl: 'https://linkedin.com/in/sheva-ardhana',
  },
  en: {
    name: 'Sheva Ardhana',
    roles: ['Fullstack Developer', 'Frontend Developer', 'Backend Developer'],
    description:
      'Fullstack Developer with 4 years of experience building modern web applications. Skilled in both Frontend (ReactJS, VueJS) and Backend (Laravel, Golang, ExpressJS).',
    githubUrl: 'https://github.com/shevaardhana',
    linkedinUrl: 'https://linkedin.com/in/sheva-ardhana',
  }
};

export const aboutData = {
  id: {
    description:
      'Saya adalah seorang Fullstack Developer dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web end-to-end. Di sisi Frontend, saya berpengalaman dengan ReactJS dan VueJS untuk membangun UI yang interaktif dan responsif. Di sisi Backend, saya menguasai Laravel, Golang, dan ExpressJS. Saya berkomitmen untuk menulis kode yang bersih, terstruktur, dan mudah dipelihara.',
    imageUrl: '/assets/profile.jpeg',
    stats: [
      { label: 'Tahun Pengalaman', value: 4, suffix: '+' },
      { label: 'Proyek Selesai', value: 13, suffix: '+' },
      { label: 'Teknologi', value: 7, suffix: '' },
    ],
  },
  en: {
    description:
      'I am a Fullstack Developer with more than 4 years of experience building end-to-end web applications. On the Frontend side, I am experienced with ReactJS and VueJS to build interactive and responsive UIs. On the Backend side, I am proficient in Laravel, Golang, and ExpressJS. I am committed to writing clean, structured, and maintainable code.',
    imageUrl: '/assets/profile.jpeg',
    stats: [
      { label: 'Years Experience', value: 4, suffix: '+' },
      { label: 'Projects Completed', value: 13, suffix: '+' },
      { label: 'Technologies', value: 7, suffix: '' },
    ],
  }
};

export const skillsData: Skill[] = [
  {
    name: 'ReactJS',
    percentage: 95,
    category: 'Frontend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'VueJS',
    percentage: 95,
    category: 'Frontend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Laravel',
    percentage: 95,
    category: 'Backend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
  },
  {
    name: 'Golang',
    percentage: 90,
    category: 'Backend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
  },
  {
    name: 'ExpressJS',
    percentage: 85,
    category: 'Backend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'NodeJS',
    percentage: 90,
    category: 'Backend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'SQL',
    percentage: 90,
    category: 'Database',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  // {
  //   name: 'Kiro',
  //   percentage: 85,
  //   category: 'Tools',
  //   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  // },
];

export const experienceData = {
  id: [
    {
      company: 'PT. Infrastruktur Bisnis Sejahtera',
      position: 'IT Programmer (Fullstack Developer)',
      period: 'Jan 2023 - Apr 2026',
      description: [
        'Mengembangkan dan memelihara aplikasi web berbasis Laravel',
        'Membuat modul untuk kebutuhan User dari departemen internal',
        'Membuat aplikasi absen',
        'Mengintegrasikan REST API',
      ],
    },
    {
      company: 'Freelance',
      position: 'Fullstack Developer',
      period: 'Aug 2022 - Dec 2022',
      description: [
        'Membangun company profile dan landing page untuk UMKM',
        'Membuat website top up voucher game',
      ],
    },
    {
      company: 'PT. Bersih Teknologi Nusantara',
      position: 'Fullstack Web Developer',
      period: 'Sept 2021 - May 2022',
      description: [
        'Mengembangkan website company profile dan landing page untuk berbagai perusahaan.',
        'Membangun aplikasi manajemen jasa pembersihan area apartment menggunakan VueJS dan Laravel.',
        'Membangun aplikasi order jasa pembersihan unit apartment menggunakan VueJS dan Laravel.',
      ],
    },
  ],
  en: [
    {
      company: 'PT. Infrastruktur Bisnis Sejahtera',
      position: 'IT Programmer (Fullstack Developer)',
      period: 'Jan 2023 - Apr 2026',
      description: [
        'Developed and maintained Laravel-based web applications',
        'Built modules for internal department user needs',
        'Developed an attendance application',
        'Integrated REST APIs',
      ],
    },
    {
      company: 'Freelance',
      position: 'Fullstack Developer',
      period: 'Aug 2022 - Dec 2022',
      description: [
        'Built company profiles and landing pages for small businesses',
        'Developed a game voucher top-up website',
      ],
    },
    {
      company: 'PT. Bersih Teknologi Nusantara',
      position: 'Fullstack Web Developer',
      period: 'Sept 2021 - May 2022',
      description: [
        'Developed company profile websites and landing pages for various companies.',
        'Built an apartment area cleaning service management app using VueJS and Laravel.',
        'Built an apartment unit cleaning service order app using VueJS and Laravel.',
      ],
    },
  ],
};

export const projectsData = {
  id: [
    {
      name: 'Intranet',
      description:
        'Platform untuk semua karyawan PT. Infrastruktur Bisnis Sejahtera yang berisi modul Trouble Ticket, Permohonan Perjalanan Dinas, Laporan Perjalanan Dinas, Absensi, Database Team Commercial',
      technologies: ['Jquery', 'Laravel', 'MySQL', 'Bootstrap'],
      repoUrl: 'https://github.com/shevaardhana/develop_live_intranet',
      demoUrl: 'https://intranet.ibsmulti.com',
      category: 'Fullstack',
    },
    {
      name: 'Order Cleaning Service App',
      description:
        'Aplikasi manajemen tugas tim pembersih untuk kegiatan bersih-bersih di area atau unit apartment dengan fitur real-time collaboration, dashboard report, form order, dan notifikasi.',
      technologies: ['VueJS', 'Laravel', 'MySQL'],
      repoUrl: 'https://github.com/Unit-apps',
      category: 'Fullstack',
    },
    {
      name: 'REST API Gateway For App Bookshelf',
      description:
        'API gateway berbasis Express dengan fitur rate limiting, autentikasi JWT, dan logging terpusat.',
      technologies: ['Express', 'MySQL'],
      repoUrl: 'https://github.com/shevaardhana/backend-bookshelf-express',
      category: 'Backend',
    },
    {
      name: 'Management Veterinary Hospital Dashboard',
      description:
        'Dashboard analitik untuk memantau penjualan dan tugas untuk dokter dengan visualisasi data interaktif.',
      technologies: ['VueJS', 'Laravel', 'MySQL'],
      repoUrl: 'https://github.com/shevaardhana/TA-Frontend',
      category: 'Fullstack',
    },
    {
      name: 'Todo List',
      description:
        'Sistem todo list sederhana dengan fitur filtering, add, edit, delete data dan penambahan styling CSS untuk ujian akhir dari Dicoding.',
      technologies: ['ReactJS', 'Vite', 'Tailwind'],
      repoUrl: 'https://github.com/shevaardhana/todo_list_react',
      category: 'Frontend',
    },
  ],
  en: [
    {
      name: 'Intranet',
      description:
        'Internal platform for all PT. Infrastruktur Bisnis Sejahtera employees featuring Trouble Ticket, Business Trip Request, Business Trip Report, Attendance, and Commercial Team Database modules.',
      technologies: ['Jquery', 'Laravel', 'MySQL', 'Bootstrap'],
      repoUrl: 'https://github.com/shevaardhana/develop_live_intranet',
      demoUrl: 'https://intranet.ibsmulti.com',
      category: 'Fullstack',
    },
    {
      name: 'Order Cleaning Service App',
      description:
        'Cleaning team task management app for apartment area and unit cleaning with real-time collaboration, dashboard reports, order forms, and notifications.',
      technologies: ['VueJS', 'Laravel', 'MySQL'],
      repoUrl: 'https://github.com/Unit-apps',
      category: 'Fullstack',
    },
    {
      name: 'REST API Gateway For App Bookshelf',
      description:
        'Express-based API gateway with rate limiting, JWT authentication, and centralized logging.',
      technologies: ['Express', 'MySQL'],
      repoUrl: 'https://github.com/shevaardhana/backend-bookshelf-express',
      category: 'Backend',
    },
    {
      name: 'Management Veterinary Hospital Dashboard',
      description:
        'Analytics dashboard for monitoring sales and doctor tasks with interactive data visualization.',
      technologies: ['VueJS', 'Laravel', 'MySQL'],
      repoUrl: 'https://github.com/shevaardhana/TA-Frontend',
      category: 'Fullstack',
    },
    {
      name: 'Todo List',
      description:
        'Simple todo list app with filtering, add, edit, delete features and custom CSS styling — built as a final exam project for Dicoding.',
      technologies: ['ReactJS', 'Vite', 'Tailwind'],
      repoUrl: 'https://github.com/shevaardhana/todo_list_react',
      category: 'Frontend',
    },
  ],
};

export const achievementsData = {
  id: [
    {
      title: 'Web-Based Attendance System',
      impacts: [
        'Menghilangkan antrean absensi',
        'Meningkatkan efisiensi operasional',
        'Mengurangi keterlambatan karyawan',
      ],
    },
    {
      title: 'Business Trip Reporting System',
      impacts: [
        'Mempermudah input & pelaporan',
        'Meningkatkan akurasi data',
        'Mempercepat administrasi',
      ],
    },
    {
      title: 'Site Master Monitoring System',
      impacts: [
        'Monitoring data site terpusat',
        'Insight hasil survey lapangan',
        'Mendukung keputusan manajemen',
      ],
    },
    {
      title: 'IT Trouble Ticket System',
      impacts: [
        'Sistem request perbaikan terpusat',
        'Menghilangkan ketergantungan manual ke tim IT',
        'Meningkatkan kecepatan respon issue',
      ],
    },
    {
      title: 'BAK (Berita Acara Kesepakatan) System',
      impacts: [
        'Mempermudah pembuatan dokumen BAK oleh tim commercial',
        'Monitoring masa berlaku kontrak secara terpusat',
        'Membantu antisipasi kontrak yang akan habis',
      ],
    },
  ],
  en: [
    {
      title: 'Web-Based Attendance System',
      impacts: [
        'Eliminated attendance queues',
        'Improved operational efficiency',
        'Reduced employee tardiness',
      ],
    },
    {
      title: 'Business Trip Reporting System',
      impacts: [
        'Simplified input & reporting process',
        'Improved data accuracy',
        'Accelerated administrative workflows',
      ],
    },
    {
      title: 'Site Master Monitoring System',
      impacts: [
        'Centralized site data monitoring',
        'Field survey result insights',
        'Supports management decision-making',
      ],
    },
    {
      title: 'IT Trouble Ticket System',
      impacts: [
        'Centralized repair request system',
        'Eliminated manual dependency on IT team',
        'Improved issue response time',
      ],
    },
    {
      title: 'BAK (Agreement Minutes) System',
      impacts: [
        'Simplified BAK document creation for commercial team',
        'Centralized contract expiry monitoring',
        'Helps anticipate expiring contracts',
      ],
    },
  ],
};

export const contactInfo: ContactInfo = {
  email: 'shevaardhana26@email.com',
  phone: '+62 8558523447',
  location: 'Indonesia',
  github: 'https://github.com/shevaardhana',
  linkedin: 'https://linkedin.com/in/sheva-ardhana',
  instagram: 'https://instagram.com/ardhanasheva2',
  cvUrl: '/assets/cv.pdf',
};

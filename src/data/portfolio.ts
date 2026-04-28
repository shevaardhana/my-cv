import type {
  HeroData,
  AboutData,
  Skill,
  Experience,
  Project,
  ContactInfo,
  Achievement,
} from '../types/index';

export const heroData: HeroData = {
  name: 'Sheva Ardhana',
  roles: ['Fullstack Developer', 'Backend Developer', 'Frontend Developer'],
  description:
    'Fullstack Developer dengan 4 tahun pengalaman membangun aplikasi web modern yang scalable dan performant.',
  githubUrl: 'https://github.com/shevaardhana',
  linkedinUrl: 'https://linkedin.com/in/sheva-ardhana',
};

export const aboutData: AboutData = {
  description:
    'Saya adalah seorang Fullstack Developer dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web end-to-end. Saya berpengalaman dalam teknologi frontend seperti ReactJS dan VueJS, serta backend seperti Laravel, Golang, dan ExpressJS. Saya berkomitmen untuk menulis kode yang bersih, terstruktur, dan mudah dipelihara.',
  imageUrl: '/assets/profile.jpeg',
  stats: [
    { label: 'Tahun Pengalaman', value: 4, suffix: '+' },
    { label: 'Proyek Selesai', value: 13, suffix: '+' },
    { label: 'Teknologi', value: 7, suffix: '' },
  ],
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
];

export const experienceData: Experience[] = [
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
    period: 'Augt 2022 - Des 2022',
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
      'Mengembangkan website company profile dan landing page untuk berbagai Company tersebut.',
      'Membangun aplikasi manajemen jasa pembersihan area apartment menggunakan VueJS dan Laravel.',
      'Membangun aplikasi order jasa pembersihan unit apartment menggunakan VueJS dan Laravel.',
    ],
  },
];

export const projectsData: Project[] = [
  {
    name: 'Intranet',
    description:
      'Platform untuk semua karyawan  PT. Infrastruktur Bisnis Sejahtera yang berisi modul Trouble Ticket, Permohonan Perjalanan Dinas, Laporan Perjalanan Dinas, Absensi, Database Team Commercial',
    technologies: ['Jquery', 'Laravel', 'MySQL', 'Bootstrap'],
    repoUrl: 'https://github.com/shevaardhana/develop_live_intranet',
    demoUrl: 'https://intranet.ibsmulti.com',
    category: 'Fullstack',
  },
  {
    name: 'Order Cleaning Service App For Unit or Area Apartment',
    description:
      'Aplikasi manajemen tugas tim pembersih untuk melakukan kegiatan bersih - bersih di area atau unit apartment dengan fitur real-time collaboration, dashboard report, form order, dan notifikasi.',
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
      'Sistem todo list sederhana dengan fitur filtering, add, edit, delete data dan penambahan styling css untuk ujian akhir dari dicoding',
    technologies: ['ReactJS', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/shevaardhana/todo_list_react',
    category: 'Frontend',
  },
];

export const achievementsData: Achievement[] = [
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
];

export const contactInfo: ContactInfo = {
  email: 'shevaardhana26@email.com',
  phone: '+62 8558523447',
  location: 'Indonesia',
  github: 'https://github.com/shevaardhana',
  linkedin: 'https://linkedin.com/in/sheva-ardhana',
  instagram: 'https://instagram.com/ardhanasheva2',
  cvUrl: '/assets/cv.pdf',
};

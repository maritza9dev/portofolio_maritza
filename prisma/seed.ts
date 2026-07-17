import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Biodata
  await prisma.biodata.create({
    data: {
      short_description: 'Frontend Developer yang suka bikin tampilan rapi dan fungsional.',
      long_description:
        'Saya adalah mahasiswa Rekayasa Perangkat Lunak yang tertarik di dunia pengembangan web, khususnya frontend. Saya senang belajar hal baru dan mengerjakan project dari nol hingga jadi.',
      position: 'Project Manager - System Analyst - QA - Web Developer',
      image: 'https://picsum.photos/seed/profile/400/400',
      document: '/documents/CV_Maritza.pdf',
    },
  })

  // Contact
  await prisma.contact.createMany({
    data: [
      { icon: '✉', apk: 'Email', link: 'mailto:maritza@email.com', decs: 'Kirim email' },
      { icon: '🐙', apk: 'GitHub', link: 'https://github.com/maritza', decs: 'Lihat repository' },
      { icon: '💬', apk: 'WhatsApp', link: 'https://wa.me/6281234567890', decs: 'Chat via WhatsApp' },
      { icon: '📷', apk: 'Instagram', link: 'https://instagram.com/maritza', decs: 'Follow Instagram' },
    ],
  })

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: 'HTML', category: 'HardSkills', level: 'Advanced' },
      { name: 'CSS', category: 'HardSkills', level: 'Advanced' },
      { name: 'JavaScript', category: 'HardSkills', level: 'Intermediate' },
      { name: 'Vue.js', category: 'HardSkills', level: 'Beginner' },
      { name: 'Nuxt.js', category: 'HardSkills', level: 'Beginner' },
      { name: 'MySQL', category: 'HardSkills', level: 'Intermediate' },
      { name: 'Komunikasi', category: 'SoftSkills', level: 'Advanced' },
      { name: 'Kerja Tim', category: 'SoftSkills', level: 'Advanced' },
      { name: 'Problem Solving', category: 'SoftSkills', level: 'Intermediate' },
      { name: 'Manajemen Waktu', category: 'SoftSkills', level: 'Intermediate' },
    ],
  })

  // Projects
  await prisma.project.createMany({
    data: [
      {
        name_p: 'E-Procurement',
        description:
          'Sistem pengadaan barang berbasis web untuk mempermudah proses procurement di lingkungan kampus.',
        role: 'Frontend Developer',
        tech: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        image: 'https://picsum.photos/seed/project1/400/300',
        link_github: 'https://github.com/maritza/e-procurement',
        projectDate: 2025,
      },
      {
        name_p: 'Portofolio Pribadi',
        description:
          'Website portofolio pribadi yang dibangun menggunakan Nuxt.js, Prisma, dan PostgreSQL.',
        role: 'Fullstack Developer',
        tech: ['Nuxt.js', 'Prisma', 'PostgreSQL'],
        image: 'https://picsum.photos/seed/project2/400/300',
        link_github: 'https://github.com/maritza/portofolio',
        projectDate: 2026,
      },
      {
        name_p: 'Sistem Informasi Akademik',
        description:
          'Aplikasi untuk mengelola data akademik siswa, termasuk nilai, absensi, dan jadwal pelajaran.',
        role: 'QA & Web Developer',
        tech: ['Laravel', 'MySQL', 'Bootstrap'],
        image: 'https://picsum.photos/seed/project3/400/300',
        link_github: 'https://github.com/maritza/sistem-akademik',
        projectDate: 2025,
      },
    ],
  })

  // Education
  await prisma.education.createMany({
    data: [
      {
        school_name: 'SDN 263 Rancaloa',
        degree: 'Sekolah Dasar',
        year_start: 2014,
        year_end: 2020,
        is_current: false,
      },
      {
        school_name: 'SMPN 30 Bandung',
        degree: 'Sekolah Menengah Pertama',
        year_start: 2020,
        year_end: 2023,
        is_current: false,
      },
      {
        school_name: 'SMKN 13 Bandung',
        degree: 'Sekolah Menengah Kejuruan',
        major: 'Rekayasa Perangkat Lunak',
        year_start: 2023,
        year_end: 2026,
        is_current: true,
      },
      {
        school_name: 'UPI',
        degree: 'Kejuruan Tinggi',
        major: 'Rekayasa Perangkat Lunak',
        year_start: 2026,
        year_end: 2030,
        is_current: false,
      },
    ],
  })

  // Experience
  await prisma.experience.createMany({
    data: [
      {
        type: 'Internship',
        title: 'PKL - Web Developer',
        institution: 'PT. Inovasi Dinamika Solusi',
        description: 'Kegiatan sebagai syarat lulus SMK, membantu pengembangan aplikasi internal.',
        year_start: 2025,
        year_end: 2026,
        is_current: false,
        certificate: '/documents/sertifikat_pkl.pdf',
      },
      {
        type: 'Training',
        title: 'Bootcamp Frontend Development',
        institution: 'Dicoding Indonesia',
        description: 'Pelatihan intensif pengembangan frontend menggunakan Vue.js dan Nuxt.js.',
        year_start: 2025,
        year_end: 2025,
        is_current: false,
        certificate: '/documents/sertifikat_bootcamp.pdf',
      },
    ],
  })

  // Activity
  await prisma.activity.createMany({
    data: [
      {
        type: 'Organization',
        title: 'OSIS SMK',
        position: 'Ketua Seksi Bidang 3 - Kebelanegaraan',
        description: 'Aktif dalam kegiatan organisasi kesiswaan di lingkungan sekolah.',
        year_start: 2023,
        year_end: 2025,
        is_current: false,
      },
      {
        type: 'Competition',
        title: 'Lomba UI/UX Nasional',
        position: 'Finalis',
        description: 'Mengikuti kompetisi desain UI/UX tingkat nasional.',
        year_start: 2025,
        year_end: 2025,
        is_current: false,
      },
      {
        type: 'Committee',
        title: 'Panitia Pasar Seni ITB',
        position: 'Koordinator Divisi Acara',
        description: 'Menjadi bagian dari kepanitiaan acara tahunan Pasar Seni ITB.',
        year_start: 2025,
        year_end: 2025,
        is_current: false,
      },
    ],
  })
  // Admin
  const hashedPassword = await bcrypt.hash('adminaeri9', 10)
  await prisma.admin.create({
    data: {
      username: 'maritza',
      password: hashedPassword,
    },
  })

  console.log('Seeding selesai! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
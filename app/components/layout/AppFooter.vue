<template>
  <footer class="bg-pink-100 px-8 md:px-16 py-12">
    <!-- Container Utama: Kiri & Kanan -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 border-b border-black/10 pb-8">
      
      <!-- Bagian Kiri: Logo, Nama, dan Kalimat Keterangan Freelance -->
      <div class="flex flex-col gap-3 max-w-xl">
        <div class="flex items-center gap-2">
          <img src="/images/logo_m.png" alt="Logo Maritza" class="w-12 h-12" />
          <p class="font-serif text-xl font-semibold">Maritza</p>
        </div>
        <!-- Teks Tambahan Freelance Hardcoded -->
        <p class="text-sm text-gray-700 leading-relaxed">
          Mari ubah ide kreatif kita menjadi aplikasi web yang interaktif dan responsif. Saya terbuka untuk proyek freelance, kolaborasi tim, maupun peluang baru di berbagai bidang IT, baik dalam pengembangan sistem, analisis data, hingga manajemen proyek. Punya proyek seru? Ayo hubungi saya melalui salah satu saluran kontak yang tersedia di samping!
        </p>
      </div>

      <!-- Bagian Kanan: List Icon Contact -->
      <div class="flex gap-4 flex-wrap">
        <a 
          v-for="contact in contactList"
          :key="contact.id"
          :href="contact.link"
          class="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-lg hover:bg-pink-500 transition-colors"
          :aria-label="contact.platform"
        >
          <UIcon v-if="contact.icon?.startsWith('i-')" :name="contact.icon" class="w-5 h-5" />
          <span v-else>{{ contact.icon }}</span>
        </a>
      </div>

    </div>

    <p class="text-xs text-gray-600 text-center md:text-right">
      © {{ currentYear }} Maritza Rievani Wibowo. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const { data: contactList } = await useFetch('/api/contact')
</script>
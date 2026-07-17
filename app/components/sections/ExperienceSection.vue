<template>
  <section id="experience" class="px-8 py-16 scroll-mt-20 overflow-hidden">
    <!-- Judul Section -->
    <h1 
      ref="sectionTitle"
      class="font-inria font-bold text-3xl md:text-4xl mb-12 opacity-0 -translate-y-6 transition-all duration-700 ease-out"
      :class="{ 'opacity-100 translate-y-0': isSectionVisible }"
    >
      My Experience
    </h1>

    <!-- Kontainer Scroll Vertikal -->
    <div class="max-w-4xl mx-auto max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
      <!-- 
        Ditambahkan pt-12 (padding top ekstra) agar kartu yang melayang naik 
        punya ruang bebas dan tidak terpotong di batas atas kontainer scroll 
      -->
      <div class="grid md:grid-cols-2 gap-8 pt-12 pb-12 px-2">
        <div
          v-for="(exp, index) in experienceList"
          :key="exp.id"
          class="exp-card bg-pink-200 rounded-2xl border-2 border-transparent p-6 text-center opacity-0"
          :class="{ 'animate-float-up': isSectionVisible }"
          :style="{ '--exp-delay': `${index * 150}ms` }"
        >
          <!-- Tag Tipe Pengalaman -->
          <p class="text-xs uppercase tracking-widest text-pink-600 font-bold mb-3">
            {{ exp.type }}
          </p>

          <!-- Judul Posisi / Role dengan Ikon Animatif -->
          <p class="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium mb-1">
            <span class="pin-icon inline-block text-pink-500 transition-transform duration-500">✦</span> 
            {{ exp.title }}
          </p>

          <!-- Nama Institusi / Perusahaan -->
          <p class="font-bold text-xl text-black mb-2">{{ exp.institution }}</p>

          <!-- Deskripsi Tugas / Pencapaian -->
          <p class="text-sm text-gray-600 mb-5 leading-relaxed">
            {{ exp.description }}
          </p>

          <!-- Rentang Waktu / Tahun -->
          <p class="flex items-center justify-center gap-2 text-xs bg-white/60 border border-black/5 rounded-full w-fit mx-auto px-4 py-1.5 text-gray-600 font-medium mb-6">
            <span class="animate-pulse">📅</span>
            {{ exp.year_start }} - {{ exp.year_end ?? 'Sekarang' }}
          </p>

          <!-- Tombol Sertifikat -->
          <a
            v-if="exp.certificate"
            :href="exp.certificate"
            target="_blank"
            class="inline-block border-2 border-black rounded-full px-6 py-2 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:shadow-md active:scale-95"
          >
            View Certificate
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { data: experienceList } = await useFetch('/api/experience')

const isSectionVisible = ref(false)
const sectionTitle = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isSectionVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
  )

  if (sectionTitle.value) {
    observer.observe(sectionTitle.value)
  }
})
</script>

<style scoped>
/* --- Base Style Kartu --- */
.exp-card {
  transform: translateY(48px);
  transition: 
    transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
    box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
    background-color 0.3s ease, 
    border-color 0.3s ease;
  transform-style: preserve-3d;
}

/* --- 1. Animasi Muncul Berurutan --- */
.exp-card.animate-float-up {
  animation: floatUpIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--exp-delay);
}

@keyframes floatUpIn {
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

/* --- 2. Efek Mikro Interaksi saat Hover (3D High Lift-Up) --- */
.exp-card:hover {
  background-color: #fbcfe8; /* Tetap menggunakan warna pink-200 asli Nuxt/Tailwind */
  border-color: #000000;     /* Border hitam pop yang tegas */
  
  /* Melayang naik lebih lembut dan seimbang */
  transform: translateY(-20px) scale(1.03) !important;
  
  /* Bayangan jatuh ke bawah untuk mempertegas efek melayang */
  box-shadow: 
    0 30px 35px -10px rgba(0, 0, 0, 0.18), 
    0 15px 20px -10px rgba(0, 0, 0, 0.12);
}

/* Rotasi ikon bintang saat hover */
.exp-card:hover .pin-icon {
  transform: rotate(180deg) scale(1.2);
  color: #db2777;
}

/* --- 3. Tampilan Scrollbar Vertikal --- */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
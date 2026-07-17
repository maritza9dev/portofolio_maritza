<template>
  <section id="activity" class="bg-pink-200 px-8 py-16 scroll-mt-20 overflow-hidden">
    <!-- 
      Judul Section dengan animasi masuk dari kiri.
      Sama persis dengan transisi halaman Skills kamu!
    -->
    <h1 
      ref="titleRef"
      class="text-center font-inria font-bold text-3xl md:text-4xl mb-12 opacity-0 -translate-x-10 transition-all duration-700 ease-out"
      :class="{ 'opacity-100 translate-x-0': isVisible }"
    >
      The Adventure So Far
    </h1>

    <div class="max-w-3xl mx-auto h-[500px] overflow-y-auto pr-4 custom-scrollbar">
      <div class="relative">
        <!-- 
          Garis Vertikal yang ikut memanjang otomatis saat judul terlihat di layar.
          - 'scale-y-0' sebagai state awal (tinggi kosong).
          - 'duration-[4000ms]' agar jalannya lambat dan estetik selama 4 detik.
          - 'delay-300' memberi jeda sedikit agar judul bergeser dulu baru garisnya jalan.
        -->
        <div 
          class="absolute left-[7px] top-2 bottom-2 w-px bg-black origin-top scale-y-0 transition-transform duration-[4000ms] ease-out delay-300"
          :class="{ 'scale-y-100': isVisible }"
        ></div>

        <!-- List Data Aktivitas -->
        <div
          v-for="act in activityList"
          :key="act.id"
          class="relative flex items-start gap-6 pb-10 last:pb-0"
        >
          <!-- Titik Indikator -->
          <div class="relative z-10 w-4 h-4 rounded-full bg-white border-2 border-pink-400 mt-1 shrink-0"></div>

          <!-- Konten Teks & Tombol View -->
          <div class="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-wide text-pink-500 font-semibold mb-1">
                {{ act.type }}
              </p>
              <p class="font-bold text-black">{{ act.title }}</p>
              <p class="text-sm text-gray-600">{{ act.position }}</p>
              <p class="text-xs text-gray-400 italic mt-1">
                {{ act.year_start }} - {{ act.year_end ?? 'Sekarang' }}
              </p>
            </div>
            
            <a
              v-if="act.image"
              :href="act.image"
              target="_blank"
              class="inline-block border-2 border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start md:self-center bg-white"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Fetch data aktivitas dari API kamu
const { data: activityList } = await useFetch('/api/activity')

// State sensor scroll (Intersection Observer)
const isVisible = ref(false)
const titleRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target) // Matikan sensor setelah animasi berjalan sekali
      }
    },
    { threshold: 0.1 } // Memicu animasi ketika 10% area judul sudah nampak di layar
  )

  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
})
</script>

<style scoped>
/* Custom scrollbar tipis agar area scroll timeline terlihat lebih bersih */
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
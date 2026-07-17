<template>
  <section id="projects" class="bg-pink-200 px-8 py-16 scroll-mt-20 overflow-hidden">
    <h1 class="text-right font-inria font-bold text-3xl md:text-4xl mb-12">
      What I've Built
    </h1>

    <!-- Kontainer utama slider -->
    <div 
      ref="sliderContainer"
      @scroll="handleScroll"
      class="overflow-x-auto pb-12 scroll-smooth hide-scrollbar select-none"
      style="scroll-snap-type: x mandatory; perspective: 1000px;"
    >
      <!-- Wrapper dengan padding kiri-kanan besar agar item pertama & terakhir bisa pas di tengah -->
      <div class="flex gap-4 px-[calc(50vw-150px)] md:px-[calc(50vw-180px)] py-4 items-center min-w-max">
        <div
          v-for="(project, index) in projectsList"
          :key="project.id"
          :ref="el => cardRefs[index] = el"
          class="project-3d-card snap-center shrink-0 w-[280px] md:w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden will-change-transform"
          :style="cardStyles[index]"
        >
          <!-- Gambar Utama -->
          <div class="h-48 md:h-56 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.name_p"
              class="w-full h-full object-cover pointer-events-none"
            />
          </div>

          <!-- Konten Kartu -->
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <p class="font-bold text-lg text-black">{{ project.name_p }}</p>
              <span class="text-xs text-gray-400 font-medium">{{ project.year }}</span>
            </div>

            <p class="text-sm text-gray-500 mb-3 font-medium">{{ project.role }}</p>
            <p class="text-sm text-gray-700 mb-5 line-clamp-3 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="(tech, idx) in project.tech"
                :key="idx"
                class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium"
              >
                {{ tech }}
              </span>
            </div>

            <a
              v-if="project.link_github"
              :href="project.link_github"
              target="_blank"
              class="block text-center border-2 border-black rounded-full px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-300"
            >
              View Github
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUpdate } from 'vue'

const { data: projectsList } = await useFetch('/api/projects')

const sliderContainer = ref(null)
const cardRefs = ref([])
const cardStyles = reactive([])

// Pastikan array ref dikosongkan sebelum update render
onBeforeUpdate(() => {
  cardRefs.value = []
})

// Fungsi utama menghitung posisi kartu terhadap titik tengah viewport slider
const handleScroll = () => {
  if (!sliderContainer.value || !cardRefs.value.length) return

  const containerRect = sliderContainer.value.getBoundingClientRect()
  const containerCenter = containerRect.left + containerRect.width / 2

  cardRefs.value.forEach((card, index) => {
    if (!card) return

    const cardRect = card.getBoundingClientRect()
    const cardCenter = cardRect.left + cardRect.width / 2
    
    // Hitung jarak dari pusat kartu ke pusat kontainer
    const distanceFromCenter = cardCenter - containerCenter
    const absDistance = Math.abs(distanceFromCenter)

    // Normalisasi jarak (makin jauh dari tengah, nilai rasio mendekati 1)
    const maxDistance = containerRect.width / 1.5
    const ratio = Math.min(absDistance / maxDistance, 1)

    // Kalkulasi style 3D Coverflow berdasarkan jarak
    const scale = 1 - ratio * 0.18 // Kartu samping mengecil hingga 82%
    const opacity = 1 - ratio * 0.55 // Kartu samping meredup hingga opacity 45%
    const blur = ratio * 3 // Efek blur bertahap hingga 3px
    const rotateY = (distanceFromCenter / maxDistance) * -20 // Efek rotasi sudut 3D mencembung

    cardStyles[index] = {
      transform: `scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out'
    }
  })
}

onMounted(() => {
  // Inisialisasi style default awal dan trigger kalkulasi posisi setelah komponen dimuat
  if (projectsList.value) {
    projectsList.value.forEach((_, i) => {
      cardStyles[i] = {}
    })
    // Beri sedikit jeda waktu render awal agar posisi bounding rect terbaca akurat
    setTimeout(handleScroll, 100)
  }
})
</script>

<style scoped>
/* Hilangkan scrollbar bawaan browser agar tampilannya bersih murni geser */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Base style untuk mengaktifkan rendering 3D yang halus */
.project-3d-card {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
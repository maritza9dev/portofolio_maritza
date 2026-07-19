<template>
  <section id="academy" class="bg-pink-200 px-8 py-16 scroll-mt-20 overflow-hidden">
    <h1 class="text-right font-inria font-bold text-3xl md:text-4xl mb-12">
      Academic Journey
    </h1>

    <div class="overflow-x-auto pb-4 scroll-smooth">
      <TransitionGroup 
        tag="div" 
        name="timeline"
        class="flex min-w-max px-10 items-center"
      >
        <div
          v-for="(edu, index) in displayedEducation"
          :key="edu.id"
          class="flex flex-col items-center w-65 shrink-0"
        >
          <!-- data atas: isi kalau genap, kosong kalau ganjil -->
          <div class="h-28 flex flex-col justify-end items-center text-center">
            <template v-if="index % 2 === 0">
              <p class="font-bold text-lg">{{ edu.degree }}</p>
              <p class="text-sm">
                {{ edu.school_name }}<span v-if="edu.major"> - {{ edu.major }}</span>
              </p>
              <p class="mt-2 text-xs italic text-gray-500">
                {{ edu.year_start }} - {{ edu.year_end ?? 'Sekarang' }}
              </p>
            </template>
          </div>

          <!-- hiasan garis, titik -->
          <div class="relative w-full flex items-center justify-center shrink-0">
            <div class="absolute w-full h-px bg-black"></div>
            <div class="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-black"></div>
          </div>

          <!-- data bawah: isi kalau ganjil, kosong kalau genap -->
          <div class="h-28 flex flex-col justify-start items-center text-center">
            <template v-if="index % 2 !== 0">
              <p class="font-bold text-lg">{{ edu.degree }}</p>
              <p class="text-sm">
                {{ edu.school_name }}<span v-if="edu.major"> - {{ edu.major }}</span>
              </p>
              <p class="mt-2 text-xs italic text-gray-500">
                {{ edu.year_start }} - {{ edu.year_end ?? 'Sekarang' }}
              </p>
            </template>
          </div>
        </div>

        <div 
          v-if="visibleCount < educationList.length" 
          key="next-btn"
          class="flex flex-col items-center w-25 shrink-0"
        >
          <div class="h-28"></div> 
          <div class="relative w-full flex items-center justify-start shrink-0">
            <!-- Garis dari kiri ke kanan yang berhenti pas di tengah-tengah kontainer (50%) -->
            <div class="absolute left-0 w-1/2 h-px bg-black"></div>
            <!-- Tombol panah-->
            <button 
              @click="showNextData"
              class="relative z-10 flex items-center justify-center w-8 h-8 mx-auto rounded-full bg-black text-white hover:bg-gray-800 transition-transform hover:scale-110 active:scale-95 shadow-md font-bold text-lg"
              aria-label="Next Journey"
            >
              ➔
            </button>
          </div>
          <div class="h-28"></div> 
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { data: educationList } = await useFetch('/api/education')

// menampilkan 1 data pertama
const visibleCount = ref(1)
const displayedEducation = computed(() => {
  return educationList.value ? educationList.value.slice(0, visibleCount.value) : []
})

// Fungsi untuk menambah data yang tampil saat panah diklik
const showNextData = () => {
  if (visibleCount.value < educationList.value.length) {
    visibleCount.value++
  }
}
</script>

<style scoped>
.timeline-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.timeline-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.timeline-move {
  transition: transform 0.5s ease;
}
</style>
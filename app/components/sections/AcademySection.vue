<template>
  <section id="academy" class="bg-pink-200 px-8 py-16 scroll-mt-20">
    <h1 class="text-right font-inria font-bold text-3xl md:text-4xl mb-12">
      Academic Journey
    </h1>

    <div class="overflow-x-auto pb-4">
      <div class="flex min-w-max px-10">
        <div
          v-for="(edu, index) in educationList"
          :key="edu.id"
          class="flex flex-col items-center w-[260px] shrink-0"
        >
          <!-- Slot atas: isi kalau genap, kosong kalau ganjil -->
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

          <!-- Garis + titik -->
          <div class="relative w-full flex items-center justify-center shrink-0">
            <div class="absolute w-full h-px bg-black"></div>
            <div class="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-white"></div>
          </div>

          <!-- Slot bawah: isi kalau ganjil, kosong kalau genap -->
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
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: educationList } = await useFetch('/api/education')
</script>
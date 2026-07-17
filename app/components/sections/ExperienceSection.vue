<template>
  <section id="experience" class="px-8 py-16 scroll-mt-20">
    <h1 class="font-inria font-bold text-3xl md:text-4xl mb-12">
      My Experience
    </h1>

   <div class="max-w-4xl mx-auto max-h-[600px] overflow-y-auto pr-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="exp in experienceList"
          :key="exp.id"
          class="bg-pink-200 rounded-2xl shadow-md p-6 text-center"
        >
          <p class="text-xs uppercase tracking-wide text-pink-500 font-semibold mb-3">
            {{ exp.type }}
          </p>

          <p class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
            <span>●</span> {{ exp.title }}
          </p>

          <p class="font-bold text-lg mb-2">{{ exp.institution }}</p>

          <p class="text-sm text-gray-600 mb-4">{{ exp.description }}</p>

          <p class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
            <span>📅</span>
            {{ exp.year_start }} - {{ exp.year_end ?? 'Sekarang' }}
          </p>

          <a
            v-if="exp.certificate"
            :href="exp.certificate"
            target="_blank"
            class="inline-block border-2 border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            View Certificate
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: experienceList } = await useFetch('/api/experience')
</script>
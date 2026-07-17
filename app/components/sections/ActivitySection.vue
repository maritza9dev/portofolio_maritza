<template>
  <section id="activity" class="bg-pink-200 px-8 py-16 scroll-mt-20">
    <h1 class="text-center font-inria font-bold text-3xl md:text-4xl mb-12">
      The Adventure So Far
    </h1>

    <div class="max-w-3xl mx-auto h-[500px] overflow-y-auto pr-4">
      <div class="relative">
        <div class="absolute left-[7px] top-2 bottom-2 w-px bg-black"></div>

        <div
          v-for="act in activityList"
          :key="act.id"
          class="relative flex items-start gap-6 pb-10 last:pb-0"
        >
          <div class="relative z-10 w-4 h-4 rounded-full bg-white border-2 border-pink-400 mt-1 shrink-0"></div>

          <div class="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-wide text-pink-500 font-semibold mb-1">
                {{ act.type }}
              </p>
              <p class="font-bold">{{ act.title }}</p>
              <p class="text-sm text-gray-600">{{ act.position }}</p>
              <p class="text-xs text-gray-400 italic mt-1">
                {{ act.year_start }} - {{ act.year_end ?? 'Sekarang' }}
              </p>
            </div>
            <a
              v-if="act.image"
              :href="act.image"
              target="_blank"
              class="inline-block border-2 border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start md:self-center"
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
const { data: activityList } = await useFetch('/api/activity')
</script>
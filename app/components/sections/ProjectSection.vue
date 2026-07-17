<template>
  <section id="projects" class="bg-pink-200 px-8 py-16 scroll-mt-20">
    <h1 class="text-right font-inria font-bold text-3xl md:text-4xl mb-12">
      What I've Built
    </h1>

    <div class="overflow-x-auto pb-4">
      <div class="flex gap-6 snap-x snap-mandatory px-4">
        <div
          v-for="project in projectsList"
          :key="project.id"
          class="snap-center shrink-0 w-[300px] bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <img
            :src="project.image"
            :alt="project.name_p"
            class="w-full h-40 object-cover"
          />

          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <p class="font-bold text-lg">{{ project.name_p }}</p>
              <span class="text-xs text-gray-400">{{ project.year }}</span>
            </div>

            <p class="text-sm text-gray-500 mb-3">{{ project.role }}</p>

            <p class="text-sm text-gray-700 mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="(tech, index) in project.tech"
                :key="index"
                class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full"
              >
                {{ tech }}
              </span>
            </div>

            <a
              v-if="project.link_github"
              :href="project.link_github"
              target="_blank"
              class="block text-center border-2 border-black rounded-full px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
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
const { data: projectsList } = await useFetch('/api/projects')
</script>
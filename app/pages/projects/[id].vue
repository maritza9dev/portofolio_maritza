<template>
 <div class="min-h-screen bg-pink-200 px-4 py-12 pt-32 md:px-8">
    <div class="max-w-3xl mx-auto">
      <div v-if="project" class="bg-white rounded-3xl shadow-xl overflow-hidden">
       <div class="w-full bg-gray-100 flex items-center justify-center">
        <img 
          :src="formatPath(project.image)" 
          :alt="project.name_p"
          class="w-full h-auto max-h-150 object-contain"
          @error="(e) => e.target.src = '/images/default-project.png'"
        />
      </div>

        <div class="p-6 md:p-10 space-y-6">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <span class="text-xs font-semibold text-pink-500 uppercase tracking-wider">Project Detail</span>
              <h1 class="text-3xl font-bold text-gray-900 mt-1">{{ project.name_p }}</h1>
            </div>
            <span class="text-sm text-gray-400 font-medium self-start md:self-auto">
              {{ project.projectDate }}
            </span>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Role / Position
            </label>
            <p class="text-lg font-medium text-gray-800">{{ project.role || '-' }}</p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <div class="bg-pink-50/50 p-4 rounded-2xl text-gray-700 leading-relaxed text-sm whitespace-pre-line border border-pink-100">
              {{ project.description || 'Tidak ada deskripsi rinci.' }}
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Technology
            </label>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(tech, idx) in project.tech" 
                :key="idx"
                class="text-xs bg-pink-100 text-pink-700 font-semibold px-3 py-1.5 rounded-full"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div v-if="project.link_github" class="pt-4 border-t border-gray-100 flex justify-end">
            <a 
              :href="formatPath(project.link_github)" 
              target="_blank"
              class="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors shadow-md"
            >
              View Link
            </a>
          </div>
                <NuxtLink 
              to="/#projects" 
              class="inline-flex items-center gap-2 mb-6 font-semibold text-gray-700 hover:text-black transition-colors"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
              Back
            </NuxtLink>
        </div>
      </div>
      <div v-else class="text-center py-20 bg-white rounded-3xl shadow-sm">
        <p class="text-gray-500 font-medium">Proyek tidak ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const { data: project } = await useFetch('/api/projects', {
  transform: (list) => list.find((p) => p.id === Number(id)),
})

function formatPath(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path
  }
  return `/${path}`
}
</script>
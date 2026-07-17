<template>
  <section id="skills" class="px-8 py-16 scroll-mt-20">
    <h1 class="font-inria font-bold text-3xl md:text-4xl mb-12">
      My Skills
    </h1>

    <div class="max-w-4xl mx-auto space-y-10">
      <div v-for="(items, category) in groupedSkills" :key="category">
        <h2 class="text-xl font-bold mb-4">{{ formatCategory(category) }}</h2>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="skill in items"
            :key="skill.id"
            class="flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2 shadow-sm"
          >
            <span class="font-medium text-sm">{{ skill.name }}</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full"
              :class="levelColor(skill.level)"
            >
              {{ skill.level }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: skillsList } = await useFetch('/api/skills')

const groupedSkills = computed(() => {
  if (!skillsList.value) return {}

  return skillsList.value.reduce((groups, skill) => {
    const category = skill.category
    if (!groups[category]) groups[category] = []
    groups[category].push(skill)
    return groups
  }, {})
})

function levelColor(level) {
  if (level === 'Beginner') return 'bg-blue-100 text-blue-700'
  if (level === 'Intermediate') return 'bg-yellow-100 text-yellow-700'
  if (level === 'Advanced') return 'bg-green-100 text-green-700'
  return 'bg-gray-100 text-gray-700'
}

function formatCategory(category) {
  return category.replace(/([a-z])([A-Z])/g, '$1 $2')
  return spaced + 's'
}
</script>
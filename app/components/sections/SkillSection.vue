<template>
  <section id="skills" class="px-8 py-16 scroll-mt-20 overflow-hidden">
    <h1 
      ref="titleRef"
      class="font-inria font-bold text-3xl md:text-4xl mb-12 opacity-0 -translate-x-10 transition-all duration-700 ease-out"
      :class="{ 'opacity-100 translate-x-0': isVisible }"
    >
      Core Skills
    </h1>

    <div class="max-w-4xl mx-auto space-y-10">
      <div v-for="(items, category) in groupedSkills" :key="category">
        <h2 
          class="text-xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-200"
          :class="{ 'opacity-100': isVisible }"
        >
          {{ formatCategory(category) }}
        </h2>
        
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(skill, index) in items"
            :key="skill.id"
            class="skill-badge flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2 shadow-sm"
            :class="{ 'animate-pop': isVisible }"
            :style="{ '--delay': `${index * 80}ms` }"
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
import { ref, computed, onMounted } from 'vue'

const { data: skillsList } = await useFetch('/api/skills')

// State untuk mendeteksi section sudah masuk ke layar (viewport}
const isVisible = ref(false)
const titleRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target) 
      }
    },
    { threshold: 0.1 } 
  )

  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
})

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
}
</script>

<style scoped>
.skill-badge {
  opacity: 0;
  transform: scale(0.6) translateY(20px);
}
.skill-badge.animate-pop {
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--delay) + 300ms);
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
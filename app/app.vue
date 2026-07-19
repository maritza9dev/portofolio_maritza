<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'id'
  }
})

const title = 'Maritza - Portofolio'
const description = 'Portofolio pribadi Maritza Rievani Wibowo'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/images/logo.png',
  twitterCard: 'summary_large_image'
})

const isLoading = ref(true)
const loadingPercent = ref(0)

onMounted(() => {
  const duration = 1800
  const startTime = performance.now()

  function updateProgress(time: number) {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    loadingPercent.value = Math.floor(progress * 100)

    if (progress < 1) {
      requestAnimationFrame(updateProgress)
    } else {
      setTimeout(() => {
        isLoading.value = false
      }, 200)
    }
  }

  requestAnimationFrame(updateProgress)
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <Transition name="fade">
      <div
  v-if="isLoading"
  class="fixed inset-0 z-100 bg-cover bg-center flex flex-col items-center justify-center"
  style="background-image: url('/images/splash.jpg')"
>
        <img src="/images/logo_m.png" alt="Logo Maritza" class="w-50 h-50 mb-4 animate-pulse" />
       <p class="font-inria font-bold text-2xl tabular-nums">{{ loadingPercent }}%</p>
<div class="mt-4 w-40 h-1 bg-white/50 rounded-full overflow-hidden">
  <div class="h-full bg-black transition-all duration-75" :style="{ width: `${loadingPercent}%` }"></div>
</div>
      </div>
    </Transition>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes loading-bar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.animate-loading-bar {
  animation: loading-bar 1.6s ease-in-out forwards;
}
</style>
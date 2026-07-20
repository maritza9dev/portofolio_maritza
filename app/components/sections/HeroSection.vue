<template>
  <section id="home" class="bg-pink-200 pt-28 pb-16 px-8 md:px-16 scroll-mt-24">
    <h1
     class="text-center font-inria font-bold text-3xl md:text-4xl mb-10 transition-all duration-700"
    :class="appReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'"
    >
    Hey there! Welcome to my digital space
    </h1>

    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p
          class="font-inria text-5xl mb-2 transition-all duration-700"
          :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 100ms"
        >
          i'm
        </p>

        <h2
          class="font-bakbak font-bold text-3xl md:text-4xl mb-4 leading-snug transition-all duration-700"
          :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 200ms"
        >
          MARITZA RIEVANI WIBOWO
        </h2>

        <div
            v-if="biodata"
            class="mb-6 transition-all duration-700"
            :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
            style="transition-delay: 300ms"
          >
            <p class="inline-block text-sm md:text-base font-medium text-gray-800 border-b-2 border-white pb-1 ml-2">
              {{ biodata.position }}
            </p>
        </div>

        <div
          v-if="biodata"
          class="bg-white rounded-2xl p-6 shadow-md mb-6 transition-all duration-700"
          :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 400ms"
        >
          <p class="text-gray-700 font-normal text-base md:text-lg leading-relaxed">
            {{ biodata.short_description }}
          </p>
        </div>

        <a
          class="inline-block border-2 border-black rounded-full px-6 py-3 font-medium mb-8 hover:bg-black hover:text-white transition-colors leading-snug duration-700"
          :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 500ms"
          href="#projects"
        >
          View My Projects
        </a>

        <div
          class="flex gap-4 leading-snug duration-700"
          :class="appReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 600ms"
        >
         <a 
            v-for="contact in contactList"
            :key="contact.id"
            :href="contact.link"
            class="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-lg hover:bg-pink-500 transition-colors"
            :aria-label="contact.platform"
          >
            <UIcon v-if="contact.icon?.startsWith('i-')" :name="contact.icon" />
            <span v-else>{{ contact.icon }}</span>
          </a>
        </div>
      </div>

      <!-- bagian foto -->
      <div class="relative flex justify-center">
        <div class="absolute bottom-6 w-64 h-8 bg-black/20 blur-xl rounded-full"></div>

        <div
          ref="swingRef"
          class="relative z-10 flex flex-col items-center select-none"
          :class="{ 'animate-hang-sway': phase === 'idle' }"
          :style="phase !== 'idle' ? {
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'top center',
            transition: phase === 'dragging' ? 'none' : 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)'
          } : { transformOrigin: 'top center' }"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @transitionend="onTransitionEnd"
        >
          <!-- Paku -->
          <div class="w-4 h-4 rounded-full bg-linear-to-br from-gray-400 to-gray-700 shadow-md z-10"></div>

          <!-- Tali -->
          <div class="w-0.75 h-16 bg-linear-to-b from-gray-400 to-gray-600 rounded-full shadow-sm"></div>

          <!-- Foto -->
          <div class="relative bg-white rounded-t-[20px] p-3 max-w-sm w-full shadow-lg cursor-grab active:cursor-grabbing">
            <img
              v-if="biodata"
              :src="biodata.image"
              alt="Foto profil Maritza"
              class="w-full rounded-t-[20px] object-cover pointer-events-none"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const appReady = useState('appReady')
const { data: biodataList } = await useFetch('/api/biodata')
const biodata = computed(() => biodataList.value?.[0])

const { data: contactList } = await useFetch('/api/contact')

// Logic buat animasi foto
const rotation = ref(0)
const phase = ref('idle')
let startX = 0
let startRotation = 0

function getClientX(event) {
  return event.touches ? event.touches[0].clientX : event.clientX
}

function startDrag(event) {
  phase.value = 'dragging'
  startX = getClientX(event)
  startRotation = rotation.value

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', stopDrag)
}

function onDrag(event) {
  if (phase.value !== 'dragging') return
  const currentX = getClientX(event)
  const delta = currentX - startX
  rotation.value = Math.max(-35, Math.min(35, startRotation - delta * 0.3))
}

function stopDrag() {
  phase.value = 'settling'
  rotation.value = 0

  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}

function onTransitionEnd() {
  if (phase.value === 'settling') {
    phase.value = 'idle'
  }
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
@keyframes hang-sway {
  0%, 100% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
}

.animate-hang-sway {
  animation: hang-sway 4s ease-in-out infinite;
}
</style>
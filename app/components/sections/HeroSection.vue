<template>
  <section id="home" class="bg-pink-200 pt-28 pb-16 px-8 md:px-16">
    <h1 class="text-center font-inria font-bold text-3xl md:text-4xl mb-10">
      Hello, Everyone!
    </h1>

    <div class="grid md:grid-cols-2 gap-10 items-center">
      <!-- Kolom kiri -->
      <div>
        <p class="font-elegant text-5xl mb-2">i'm</p>

        <h2 class="font-bakbak font-bold text-3xl md:text-4xl mb-4 leading-snug">
          MARITZA RIEVANI WIBOWO
        </h2>

        <div v-if="biodata" class="mb-6">
          <p class="inline-block text-sm md:text-base font-medium text-pink-600 border-b-8 border-white pb-1 ml-2">
            {{ biodata.position }}
          </p>
        </div>

        <div v-if="biodata" class="bg-white rounded-2xl p-6 shadow-md mb-6">
          <p class="text-gray-700">{{ biodata.short_description }}</p>
        </div>

        <a
          href="#projects"
          class="inline-block border-2 border-black rounded-full px-6 py-3 font-medium mb-8 hover:bg-black hover:text-white transition-colors"
        >
        View My Project
        </a>

        <div class="flex gap-4">
          <a
            v-for="contact in contactList"
            :key="contact.id"
            :href="contact.link"
            target="_blank"
            class="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-lg hover:bg-pink-500 transition-colors"
            :aria-label="contact.platform"
          >
            {{ contact.icon }}
          </a>
        </div>
      </div>

      <!-- Kolom kanan -->
      <div class="relative flex justify-center">
        <div class="relative bg-white rounded-t-[20px] p-3 max-w-sm w-full">
          <img
            v-if="biodata"
            :src="biodata.image"
            alt="Foto profil Maritza"
            class="w-full rounded-t-[20px] object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: biodataList } = await useFetch('/api/biodata')
const biodata = computed(() => biodataList.value?.[0])

const { data: contactList } = await useFetch('/api/contact')
</script>
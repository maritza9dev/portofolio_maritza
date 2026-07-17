<template>
  <section id="about" class="px-8 py-16 scroll-mt-20">
   <h1 class="font-inria font-bold text-3xl md:text-4xl mb-10">
         About Me
    </h1>
    <div v-if="biodata" class="bg-pink-200 rounded-2xl p-6 shadow-md mb-6">
      <p v-if="biodata">{{ biodata.long_description }}</p>
      <p v-else>Loading...</p>
    </div>
    <div class="text-center">
      <a 
      v-if="biodata"
      :href="biodata.document" 
      download
      class="inline-block border-2 border-black rounded-full px-6 py-3 font-medium mb-8 hover:bg-black hover:text-white transition-colors"
      >
        Download My CV
      </a>
    </div>
  </section>
</template>

<script setup>
const { data: biodataList } = await useFetch('/api/biodata')
const biodata = computed(() => biodataList.value?.[0])
</script>
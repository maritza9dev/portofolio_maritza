<template>
  <section id="about" class="px-8 py-16 scroll-mt-20">
    <h1 class="font-inria font-bold text-3xl md:text-4xl mb-10">
      Get to Know Me 
    </h1>

    <div
      v-if="biodata"
      class="bg-pink-200 rounded-2xl p-6 shadow-md mb-6"
    >
      <p
        ref="description"
        class="about-text leading-8"
      >
        {{ biodata.long_description }}
      </p>
    </div>

    <div class="text-center">
      <a
        v-if="biodata"
        :href="biodata.document"
        download
        class="inline-block border-2 border-black rounded-full px-6 py-3 font-medium hover:bg-black hover:text-white transition"
      >
        Download My CV
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: biodataList } = await useFetch("/api/biodata");

const biodata = computed(() => biodataList.value?.[0]);

const description = ref<HTMLElement | null>(null);

useTextReveal(description);
</script>

<style scoped>
.about-text {
  overflow: hidden;
}

.about-text :deep(.char) {
  display: inline-block;
  will-change: transform, opacity, filter;
}
</style>
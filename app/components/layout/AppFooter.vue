<template>
  <footer class="bg-pink-100 px-8 md:px-16 py-12">
    <div class="flex items-center gap-2 justify-center mb-8">
    <img src="/images/logo_m.png" alt="Logo Maritza" class="w-12 h-12" />
    <p class="font-serif text-xl font-semibold">Maritza</p>
    </div>
    <div class="flex justify-center gap-6 mb-6">
        <a
        v-for="contact in contactList"
        :key="contact.id"
        :href="contact.link"
        target="_blank"
        class="w-14 h-14 rounded-full bg-pink-200 text-white flex items-center justify-center text-2xl hover:bg-pink-500 transition-colors"
        :aria-label="contact.platform">{{ contact.icon }}</a>
    </div>

    <p class="text-sm text-gray-600 text-center">
      © {{ currentYear }} Maritza Rievani Wibowo. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const { data: contactList } = await useFetch('/api/contact')
</script>
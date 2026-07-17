<template>
  <nav class="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md px-8 md:px-16 py-4 flex items-center justify-between z-50 shadow-sm">
    <div class="flex items-center gap-2">
      <img src="/images/logo_m.png" alt="Logo Maritza" class="w-12 h-12" />
      <p class="font-serif text-xl font-semibold">Maritza</p>
    </div>

    <!-- Menu desktop -->
    <ul class="hidden md:flex gap-8 text-sm font-medium">
      <li><a href="#home" class="hover:text-pink-500 transition-colors">Home</a></li>
      <li><a href="#about" class="hover:text-pink-500 transition-colors">About</a></li>
      <li><a href="#academy" class="hover:text-pink-500 transition-colors">Academy</a></li>
      <li><a href="#skills" class="hover:text-pink-500 transition-colors">Skills</a></li>
      <li><a href="#projects" class="hover:text-pink-500 transition-colors">Projects</a></li>
      <li><a href="#experience" class="hover:text-pink-500 transition-colors">Experience</a></li>
      <li><a href="#activity" class="hover:text-pink-500 transition-colors">Activity</a></li>
    </ul>

    <!-- Tombol hamburger -->
    <button class="md:hidden flex flex-col gap-1.5" @click="isOpen = !isOpen">
      <span class="w-6 h-0.5 bg-black"></span>
      <span class="w-6 h-0.5 bg-black"></span>
      <span class="w-6 h-0.5 bg-black"></span>
    </button>

    <!-- Menu mobile -->
    <ul
      v-if="isOpen"
      class="absolute top-full left-0 w-full bg-white flex flex-col gap-5 p-6 md:hidden shadow-md text-sm font-medium z-50"
    >
      <li><a href="#home" @click="isOpen = false">Home</a></li>
      <li><a href="#about" @click="isOpen = false">About</a></li>
      <li><a href="#academy" @click="isOpen = false">Academy</a></li>
      <li><a href="#skills" @click="isOpen = false">Skills</a></li>
      <li><a href="#projects" @click="isOpen = false">Projects</a></li>
      <li><a href="#experience" @click="isOpen = false">Experience</a></li>
      <li><a href="#activity" @click="isOpen = false">Activity</a></li>
    </ul>
  </nav>
</template>

<script setup>
const isOpen = ref(false)
</script>
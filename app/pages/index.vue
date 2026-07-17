<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
})
import HeroSection from '~/components/sections/HeroSection.vue';
import AboutSection from '~/components/sections/AboutSection.vue';
import AcademySection from '~/components/sections/AcademySection.vue';
import SkillSection from '~/components/sections/SkillSection.vue';
import ProjectSection from '~/components/sections/ProjectSection.vue';
import ExperienceSection from '~/components/sections/ExperienceSection.vue';
import ActivitySection from '~/components/sections/ActivitySection.vue';
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <AcademySection />
    <SkillSection />
    <ProjectSection />
    <ExperienceSection />
    <ActivitySection />
  </div>
</template>
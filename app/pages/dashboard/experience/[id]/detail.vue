<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: experience } = await useFetch('/api/experience', {
  transform: (list) => list.find((p) => p.id === Number(id)),
})
</script>

<template>
  <UDashboardPanel id="experience-detail">
    <template #header>
      <UDashboardNavbar title="Detail Experience">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="experience" class="max-w-2xl flex flex-col gap-5">

        <div>
          <p class="text-sm text-gray-500">Type</p>
          <p class="font-bold text-lg">{{ experience.type }}</p>
        </div>
        
        <div>
          <p class="text-sm text-gray-500">Title experience</p>
          <p class="font-bold text-lg">{{ experience.title }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Institution</p>
          <p class="font-bold text-lg">{{ experience.institution }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Description</p>
          <p>{{ experience.description || '-' }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Year Start</p>
          <p>{{ experience.year_start }}</p>
        </div>

         <div>
          <p class="text-sm text-gray-500">Year End</p>
          <p>{{ experience.year_end  || '-'}}</p>
        </div>

        <div>
        <p class="text-sm text-gray-500">Certificate</p>
        <a
            v-if="experience.certificate"
            :href="experience.certificate"
            target="_blank"
            class="text-primary underline inline-flex items-center gap-1"
        >
            <UIcon name="i-lucide-file-text" />
            View Sertifikat
        </a>
        <p v-else>-</p>
        </div>

        <div>
        <p class="text-sm text-gray-500">Status</p>
        <UBadge :color="experience.is_current ? 'success' : 'neutral'" variant="soft">
            {{ experience.is_current ? 'Current' : 'Completed' }}
        </UBadge>
        </div>

        <div class="flex gap-3">
          <UButton :to="`/dashboard/experience/${id}/edit`" color="neutral" variant="outline">
            Edit
          </UButton>
          <UButton to="/dashboard/experience" color="neutral" variant="ghost">
            Back
          </UButton>
        </div>
      </div>

      <p v-else>Loading...</p>
    </template>
  </UDashboardPanel>
</template>
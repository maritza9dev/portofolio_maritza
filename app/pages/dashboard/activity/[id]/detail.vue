<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: activity } = await useFetch('/api/activity', {
  transform: (list) => list.find((p) => p.id === Number(id)),
})
</script>

<template>
  <UDashboardPanel id="activity-detail">
    <template #header>
      <UDashboardNavbar title="Detail Activity">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="activity" class="max-w-2xl flex flex-col gap-5">
        <img
          v-if="activity.image"
          :src="activity.image" 
          class="w-full h-56 object-cover rounded-lg"
        />
        <div>
          <p class="text-sm text-gray-500">Type</p>
          <p class="font-bold text-lg">{{ activity.type }}</p>
        </div>
        
        <div>
          <p class="text-sm text-gray-500">Title Activity</p>
          <p class="font-bold text-lg">{{ activity.title }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Position</p>
          <p class="font-bold text-lg">{{ activity.position }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Deskripsi</p>
          <p>{{ activity.description || '-' }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Year Start</p>
          <p>{{ activity.year_start }}</p>
        </div>

         <div>
          <p class="text-sm text-gray-500">Year End</p>
          <p>{{ activity.year_end  || '-'}}</p>
        </div>

        <div>
        <p class="text-sm text-gray-500">Status</p>
        <UBadge :color="activity.is_current ? 'success' : 'neutral'" variant="soft">
            {{ activity.is_current ? 'Masih Berlangsung' : 'Selesai' }}
        </UBadge>
        </div>

        <div class="flex gap-3">
          <UButton :to="`/dashboard/activity/${id}/edit`" color="neutral" variant="outline">
            Edit
          </UButton>
          <UButton to="/dashboard/activity" color="neutral" variant="ghost">
            Kembali
          </UButton>
        </div>
      </div>

      <p v-else>Loading...</p>
    </template>
  </UDashboardPanel>
</template>
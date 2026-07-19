<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: project } = await useFetch('/api/projects', {
  transform: (list) => list.find((p) => p.id === Number(id)),
})
</script>

<template>
  <UDashboardPanel id="project-detail">
    <template #header>
      <UDashboardNavbar title="Detail Project">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="project" class="max-w-2xl flex flex-col gap-5">
        <img
          v-if="project.image"
          :src="project.image"
          class="w-full h-56 object-cover rounded-lg"
        />

        <div>
          <p class="text-sm text-gray-500">Name Project</p>
          <p class="font-bold text-lg">{{ project.name_p }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Role</p>
          <p>{{ project.role || '-' }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Description</p>
          <p>{{ project.description || '-' }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Technology</p>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="(tech, i) in project.tech" :key="i" variant="soft">
              {{ tech }}
            </UBadge>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-500">Year</p>
          <p>{{ project.projectDate }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Link GitHub</p>
          <a
            v-if="project.link_github"
            :href="project.link_github"
            target="_blank"
            class="text-primary underline"
          >
            {{ project.link_github }}
          </a>
          <p v-else>-</p>
        </div>

        <div class="flex gap-3">
          <UButton :to="`/dashboard/projects/${id}/edit`" color="neutral" variant="outline">
            Edit
          </UButton>
          <UButton to="/dashboard/projects" color="neutral" variant="ghost">
            Back
          </UButton>
        </div>
      </div>

      <p v-else>Loading...</p>
    </template>
  </UDashboardPanel>
</template>
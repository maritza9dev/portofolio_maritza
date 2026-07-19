<script setup>
import { getPaginationRowModel } from '@tanstack/table-core'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: projectList, refresh } = await useFetch('/api/projects')
const toast = useToast()
const table = useTemplateRef('table')

const search = ref('')

const filteredProjects = computed(() => {
  if (!projectList.value) return []
  if (!search.value) return projectList.value

  const keyword = search.value.toLowerCase()
  return projectList.value.filter((project) =>
    project.name_p?.toLowerCase().includes(keyword) ||
    project.role?.toLowerCase().includes(keyword) ||
    project.tech?.join(' ').toLowerCase().includes(keyword) ||
    String(project.projectDate ?? '').toLowerCase().includes(keyword)
  )
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const columns = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'name_p', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'tech', header: 'Technology' },
  { accessorKey: 'projectDate', header: 'Project Year' },
  { accessorKey: 'actions', header: 'Action' },
]

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this project?')) return

  try {
    await $fetch(`/api/projects/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Delete successfully!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Delete failed', color: 'error' })
  }
}
</script>

<template>
  <UDashboardPanel id="project">
    <template #header>
      <UDashboardNavbar title="Manage Projects">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5 mb-4">
        <UInput
          v-model="search"
          class="w-full max-w-xl"
          icon="i-lucide-search"
          placeholder="Search name, role, technology, or project year..."
        />
        <UButton to="/dashboard/projects/create" icon="i-lucide-plus">
          Add Project
        </UButton>
      </div>
        
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="filteredProjects"
        :columns="columns"
        class="shrink-0"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default',
        }"
      >
        <template #no-cell="{ row }">
          {{ row.index + 1 + pagination.pageIndex * pagination.pageSize }}
        </template>
        
        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton
              :to="`/dashboard/projects/${row.original.id}/detail`"
              size="sm"
              color="neutral"
              variant="soft"
            >
              Detail
            </UButton>
            <UButton
              :to="`/dashboard/projects/${row.original.id}/edit`"
              size="sm"
              color="neutral"
              variant="outline"
            >
              Edit
            </UButton>
            <UButton
              size="sm"
              color="error"
              variant="outline"
              @click="handleDelete(row.original.id)"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UTable>

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-4">
        <div class="text-sm text-muted">
          Displaying {{ filteredProjects.length }} from  {{ projectList?.length || 0 }} projects
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredProjects.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
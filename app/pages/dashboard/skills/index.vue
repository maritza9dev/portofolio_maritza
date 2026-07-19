<script setup>
import { getPaginationRowModel } from '@tanstack/table-core'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: skillList, refresh } = await useFetch('/api/skills')
const toast = useToast()
const table = useTemplateRef('table')

const search = ref('')

const filteredSkills = computed(() => {
  if (!skillList.value) return []
  if (!search.value) return skillList.value

  const keyword = search.value.toLowerCase()
  return skillList.value.filter((skill) =>
    skill.name?.toLowerCase().includes(keyword) ||
    skill.category?.toLowerCase().includes(keyword) ||
    skill.level?.toLowerCase().includes(keyword)
  )
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const columns = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'level', header: 'Level' },
  { accessorKey: 'actions', header: 'Action' },
]

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return

  try {
    await $fetch(`/api/skills/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Deleted successfully!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Delete failed', color: 'error' })
  }
}
</script>

<template>
  <UDashboardPanel id="skill">
    <template #header>
      <UDashboardNavbar title="Manage Skills">
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
          placeholder="Search name, category, or level..."
        />
        <UButton to="/dashboard/skills/create" icon="i-lucide-plus">
          Add Skill
        </UButton>
      </div>
        
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="filteredSkills"
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
              :to="`/dashboard/skills/${row.original.id}/edit`"
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
          Displaying {{ filteredSkills.length }} from {{ skillList?.length || 0 }} skills
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredSkills.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
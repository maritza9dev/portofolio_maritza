<script setup>
import { getPaginationRowModel } from '@tanstack/table-core'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: educationList, refresh } = await useFetch('/api/education')
const toast = useToast()
const table = useTemplateRef('table')

const search = ref('')

const filteredEducation = computed(() => {
  if (!educationList.value) return []
  if (!search.value) return educationList.value

  const keyword = search.value.toLowerCase()
  return educationList.value.filter((education) =>
    education.school_name?.toLowerCase().includes(keyword) ||
    education.degree?.toLowerCase().includes(keyword) ||
    education.major?.toLowerCase().includes(keyword)
  )
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const columns = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'school_name', header: 'School' },
  { accessorKey: 'degree', header: 'Degree' },
  { accessorKey: 'major', header: 'Major' },
  { accessorKey: 'year_start', header: 'Year Start' },
  { accessorKey: 'year_end', header: 'Year End' },
  { accessorKey: 'is_current', header: 'Is Current' },
  { accessorKey: 'actions', header: 'Action' },
]

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this education?')) return

  try {
    await $fetch(`/api/education/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Deleted successfully!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Delete failed', color: 'error' })
  }
}
</script>

<template>
  <UDashboardPanel id="education">
    <template #header>
      <UDashboardNavbar title="Manage Education">
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
          placeholder="Search school, degree, or major..."
        />
        <UButton to="/dashboard/education/create" icon="i-lucide-plus">
          Add Education
        </UButton>
      </div>
        
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="filteredEducation"
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

        <template #major-cell="{ row }">
          {{ row.original.major || '-' }}
        </template>

        <template #year_end-cell="{ row }">
          {{ row.original.year_end || '-' }}
        </template>
        
        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton
              :to="`/dashboard/education/${row.original.id}/edit`"
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
          Displaying {{ filteredEducation.length }} from {{ educationList?.length || 0 }} education
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredEducation.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
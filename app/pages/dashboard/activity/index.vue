<script setup>
import { getPaginationRowModel } from '@tanstack/table-core'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: activityList, refresh } = await useFetch('/api/activity')
const toast = useToast()
const table = useTemplateRef('table')

const search = ref('')

const filteredActivitys = computed(() => {
  if (!activityList.value) return []
  if (!search.value) return activityList.value

  const keyword = search.value.toLowerCase()
  return activityList.value.filter((activity) =>
    activity.type?.toLowerCase().includes(keyword) ||
    activity.title?.toLowerCase().includes(keyword) ||
    activity.position?.toLowerCase().includes(keyword)
  )
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const columns = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'position', header: 'Position' },
  { accessorKey: 'actions', header: 'Aksi' },
]

async function handleDelete(id) {
  if (!confirm('Yakin mau hapus activity ini?')) return

  try {
    await $fetch(`/api/activity/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Berhasil dihapus!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Gagal menghapus', color: 'error' })
  }
}
</script>

<template>
  <UDashboardPanel id="activity">
    <template #header>
      <UDashboardNavbar title="Kelola Activity">
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
          placeholder="Cari type, title, atau institution..."
        />
        <UButton to="/dashboard/activity/create" icon="i-lucide-plus">
          Tambah Activity
        </UButton>
      </div>
        
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="filteredActivitys"
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
              :to="`/dashboard/activity/${row.original.id}/detail`"
              size="sm"
              color="neutral"
              variant="soft"
            >
              Detail
            </UButton>
            <UButton
              :to="`/dashboard/activity/${row.original.id}/edit`"
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
              Hapus
            </UButton>
          </div>
        </template>
      </UTable>

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-4">
        <div class="text-sm text-muted">
          Menampilkan {{ filteredActivitys.length }} dari {{ activityList?.length || 0 }} activity
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredActivitys.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
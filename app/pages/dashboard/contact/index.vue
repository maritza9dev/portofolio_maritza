<script setup>
import { getPaginationRowModel } from '@tanstack/table-core'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: contactList, refresh } = await useFetch('/api/contact')
const toast = useToast()
const table = useTemplateRef('table')

const search = ref('')

const filteredContacts = computed(() => {
  if (!contactList.value) return []
  if (!search.value) return contactList.value

  const keyword = search.value.toLowerCase()
  return contactList.value.filter((contact) =>
    contact.apk?.toLowerCase().includes(keyword) ||
    contact.link?.toLowerCase().includes(keyword) 
  )
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const columns = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'icon', header: 'Icon' },
  { accessorKey: 'apk', header: 'Platform' },
  { accessorKey: 'link', header: 'Link' },
  { accessorKey: 'decs', header: 'Description' },
  { accessorKey: 'actions', header: 'Action' },
]

async function handleDelete(id) {
  if (!confirm('Are you sure delete this contact?')) return

  try {
    await $fetch(`/api/contact/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Deleted successfully!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Delete Failed', color: 'error' })
  }
}
</script>

<template>
  <UDashboardPanel id="contact">
    <template #header>
      <UDashboardNavbar title="Manage Contacts">
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
          placeholder="Search platform or link..."
        />
        <UButton to="/dashboard/contact/create" icon="i-lucide-plus">
          Add Contact
        </UButton>
      </div>
        
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="filteredContacts"
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

        <template #icon-cell="{ row }">
          <UIcon v-if="row.original.icon?.startsWith('i-')" :name="row.original.icon" class="text-xl" />
          <span v-else class="text-xl">{{ row.original.icon }}</span>
        </template>

        <template #link-cell="{ row }">
          <span class="truncate max-w-xs block">{{ row.original.link }}</span>
        </template>

        <template #decs-cell="{ row }">
          {{ row.original.decs || '-' }}
        </template>

        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton
              :to="`/dashboard/contact/${row.original.id}/edit`"
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
          Displaying {{ filteredContacts.length }} from  {{ contactList?.length || 0 }} contacts
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredContacts.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const form = reactive({
  school_name: '',
  degree: '',
  major: '',
  year_start: [],
  year_end: '',
  is_current: false,
})

const isSaving = ref(false)
const toast = useToast()

function cleanForm(data) {
  const cleaned = { ...data }
  for (const key in cleaned) {
    if (cleaned[key] === '') {
      cleaned[key] = null
    }
  }
  return cleaned
}

async function handleSubmit() {
  if (!form.school_name || !form.degree || !form.year_start) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/education`, {
      method: 'POST',
      body: cleanForm(form),
    })
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/education')
  } catch (error) {
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

</script>

<template>
  <UDashboardPanel id="education-create">
    <template #header>
      <UDashboardNavbar title="Add Education">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">

        <UFormField label="School" required>
          <UInput v-model="form.school_name" class="w-full" placeholder="SDN..." />
        </UFormField>

        <UFormField label="Degree" required>
          <UInput v-model="form.degree" class="w-full" placeholder="School..." />
        </UFormField>

        <UFormField label="Major">
          <UInput v-model="form.major" class="w-full" placeholder="Engineering..." />
        </UFormField>

        <UFormField label="Year Start" required>
          <UInput v-model.number="form.year_start" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Year End">
          <UInput v-model.number="form.year_end" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Is Current?">
          <USwitch v-model="form.is_current" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save As</UButton>
          <UButton to="/dashboard/education" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
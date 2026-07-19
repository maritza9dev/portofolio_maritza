<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const categoryOptions = ['SoftSkills', 'HardSkills', 'Tools']
const levelOptions = ['Beginner', 'Intermediate', 'Advanced']

const form = reactive({
  name: '',
  category: '',
  level: '',
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
  if (!form.name || !form.category || !form.level) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/skills`, {
      method: 'POST',
      body: cleanForm(form),
    })
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/skills')
  } catch (error) {
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UDashboardPanel id="skill-create">
    <template #header>
      <UDashboardNavbar title="Add Skill">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
        <UFormField label="Name" required>
          <UInput v-model="form.name" class="w-full" placeholder="HTML" />
        </UFormField>

        <UFormField label="Category" required>
          <USelect v-model="form.category" :items="categoryOptions" class="w-full" placeholder="Select category" />
        </UFormField>

        <UFormField label="Level" required>
          <USelect v-model="form.level" :items="levelOptions" class="w-full" placeholder="Select level" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save As</UButton>
          <UButton to="/dashboard/skills" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
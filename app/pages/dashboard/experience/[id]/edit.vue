<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: experience } = await useFetch(`/api/experience`, {
  transform: (list) => list.find((c) => c.id === Number(id)),
})

const typeOptions = ['FullTime', 'Internship', 'Training']

const form = reactive({
  type: '',
  title: '',
  institution: '',
  description: '',
  year_start: '',
  year_end: '',
  certificate: '',
  is_current: false,
})

watchEffect(() => {
  if (experience.value) {
    form.type = experience.value.type
    form.title = experience.value.title
    form.institution = experience.value.institution
    form.description = experience.value.description
    form.year_start = experience.value.year_start
    form.year_end = experience.value.year_end
    form.certificate = experience.value.certificate
    form.is_current = experience.value.is_current
  }
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
  if (!form.type || !form.title || !form.institution || !form.year_start || !form.certificate) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/experience/${id}`, {
      method: 'PUT',
      body: cleanForm(form),
    })
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/experience')
  } catch (error) {
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

async function handleDocumentUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('folder', 'documents')

  const result = await $fetch('/api/upload', {
    method: 'POST',
    body: uploadData,
  })

  form.certificate = result.path
}
</script>

<template>
  <UDashboardPanel id="experience-edit">
    <template #header>
      <UDashboardNavbar title="Edit Experience">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">

        <UFormField label="Type" required>
          <USelect v-model="form.type" :items="typeOptions" class="w-full" placeholder="Select type" />
        </UFormField>

        <UFormField label="Title" required>
          <UInput v-model="form.title" class="w-full" placeholder="PKL" />
        </UFormField>

        <UFormField label="Institution" required>
          <UInput v-model="form.institution" class="w-full" placeholder="PT..." />
        </UFormField>

         <UFormField label="Description">
          <UTextarea v-model="form.description" class="w-full" :rows="5" />
        </UFormField>

        <UFormField label="Year Start" required>
          <UInput v-model.number="form.year_start" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Year End">
          <UInput v-model.number="form.year_end" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Certificate (PDF)" required>
          <input type="file" accept=".pdf" @change="handleDocumentUpload"
          class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" />
          <p v-if="form.certificate" class="text-sm text-gray-500 mt-1">{{ form.certificate }}</p>
        </UFormField>

        <UFormField label="Is Current?">
          <USwitch v-model="form.is_current" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save Changes</UButton>
          <UButton to="/dashboard/experience" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
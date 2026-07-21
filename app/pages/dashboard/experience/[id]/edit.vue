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

watch(experience, (newVal) => {
  if (newVal) {
    form.type = newVal.type ?? ''
    form.title = newVal.title ?? ''
    form.institution = newVal.institution ?? ''
    form.description = newVal.description ?? ''
    form.year_start = newVal.year_start ?? ''
    form.year_end = newVal.year_end ?? ''
    form.certificate = newVal.certificate ?? ''
    form.is_current = Boolean(newVal.is_current)
  }
}, { immediate: true })

watch(() => form.is_current, (newVal) => {
  if (newVal) {
    form.year_end = ''
  }
})

const isSaving = ref(false)
const isUploading = ref(false)
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
  if (isUploading.value) {
    toast.add({ title: 'Please wait, document is still uploading!', color: 'warning' })
    return
  }

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
    toast.add({ title: 'Saved successfully!', color: 'success' })
    await navigateTo('/dashboard/experience')
  } catch (error) {
    console.error('Error updating experience:', error)
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

async function handleDocumentUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  isUploading.value = true
  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('folder', 'documents')

  try {
    const result = await $fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    })

    const docPath = result.path || result.url
    form.certificate = docPath.startsWith('http') || docPath.startsWith('/')
      ? docPath
      : `/${docPath}`

    toast.add({ title: 'Document uploaded successfully!', color: 'success' })
  } catch (error) {
    console.error('Document upload error:', error)
    toast.add({ title: 'Failed to upload document', color: 'error' })
  } finally {
    isUploading.value = false
  }
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
          <UInput v-model="form.title" class="w-full" placeholder="Software Engineer / PKL" />
        </UFormField>

        <UFormField label="Institution" required>
          <UInput v-model="form.institution" class="w-full" placeholder="PT / Instansi..." />
        </UFormField>

        <UFormField label="Description">
          <UTextarea v-model="form.description" class="w-full" :rows="5" />
        </UFormField>

        <UFormField label="Year Start" required>
          <UInput v-model.number="form.year_start" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Year End">
          <UInput v-model.number="form.year_end" type="number" class="w-full" :disabled="form.is_current" placeholder="Leave empty if current" />
        </UFormField>

        <UFormField label="Certificate (PDF)" required>
          <input 
            type="file" 
            accept=".pdf" 
            @change="handleDocumentUpload"
            class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" 
          />
          <p v-if="isUploading" class="text-sm text-yellow-600 mt-1 font-medium animate-pulse">
            Uploading PDF...
          </p>
          <p v-else-if="form.certificate" class="text-sm text-green-600 mt-1 font-medium">
            ✓ Existing Certificate: {{ form.certificate.split('/').pop() }}
          </p>
        </UFormField>

        <UFormField label="Is Current?">
          <USwitch v-model="form.is_current" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving" :disabled="isUploading">Save Changes</UButton>
          <UButton to="/dashboard/experience" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
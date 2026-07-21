<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { data: biodataList, refresh } = await useFetch('/api/biodata')

const form = reactive({
  short_description: '',
  long_description: '',
  position: '',
  image: '',
  document: '',
})

watchEffect(() => {
  const existing = biodataList.value?.[0]
  if (existing) {
    form.short_description = existing.short_description
    form.long_description = existing.long_description
    form.position = existing.position
    form.image = existing.image
    form.document = existing.document
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
  if (!form.short_description || !form.long_description || !form.position || !form.image || !form.document ) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/biodata`, {
      method: 'PUT',
      body: cleanForm(form),
    })
    toast.add({ title: 'Saved successfully!', color: 'success' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  isUploading.value = true
  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('folder', 'images')

  try {
    const result = await $fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    })

    const imagePath = result.path || result.url
    form.image = imagePath.startsWith('http') || imagePath.startsWith('/') 
      ? imagePath 
      : `/${imagePath}`

    toast.add({ title: 'Image uploaded successfully!', color: 'success' })
  } catch (error) {
    console.error('Upload error:', error)
    toast.add({ title: 'Failed to upload image', color: 'error' })
  } finally {
    isUploading.value = false
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
  <UDashboardPanel id="biodata">
    <template #header>
      <UDashboardNavbar title="Update Biodata">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
        <UFormField label="Short Description" required>
          <UInput v-model="form.short_description" class="w-full" />
        </UFormField>

        <UFormField label="Long Description" required>
          <UTextarea v-model="form.long_description" class="w-full" :rows="5" />
        </UFormField>

        <UFormField label="Position" required>
          <UInput v-model="form.position" class="w-full" />
        </UFormField>

        <UFormField label="Photo" required>
          <input type="file" accept="image/*" @change="handleImageUpload" 
          class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" />
          <img v-if="form.image" :src="form.image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
        </UFormField>
 
        <UFormField label="Document CV (PDF)" required>
          <input type="file" accept=".pdf" @change="handleDocumentUpload"
          class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" />
          <p v-if="form.document" class="text-sm text-gray-500 mt-1">{{ form.document }}</p>
        </UFormField>

        <UButton type="submit" :loading="isSaving" class="self-start">
         Save Changes
        </UButton>
      </form>
    </template>
  </UDashboardPanel>
</template>
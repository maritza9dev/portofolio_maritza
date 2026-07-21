<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const techInput = ref('')
const isSaving = ref(false)
const isUploading = ref(false) 
const toast = useToast()

const form = reactive({
  name_p: '',
  description: '',
  role: '',
  tech: [],
  image: '',
  link_github: '',
  projectDate: '',
})

function cleanForm(data) {
  const cleaned = { ...data }
  for (const key in cleaned) {
    if (cleaned[key] === '' || cleaned[key] === undefined) {
      cleaned[key] = null
    }
  }
  return cleaned
}

async function handleSubmit() {
  if (isUploading.value) {
    toast.add({ title: 'Please wait, image is still uploading!', color: 'warning' })
    return
  }

  if (!form.name_p || !form.role || !techInput.value.trim() || !form.projectDate || !form.image) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    form.tech = techInput.value.split(',').map((t) => t.trim()).filter(Boolean)
    form.projectDate = Number(form.projectDate) // Pastikan dikirim sebagai Int ke Prisma

    await $fetch('/api/projects', {
      method: 'POST',
      body: cleanForm(form),
    })
    
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/projects')
  } catch (error) {
    console.error('Error saving project:', error)
    toast.add({ title: 'Failed to save project data', color: 'error' })
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
</script>

<template>
  <UDashboardPanel id="project-create">
    <template #header>
      <UDashboardNavbar title="Add Project">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
        <UFormField label="Name" required>
          <UInput v-model="form.name_p" class="w-full" placeholder="HTML" />
        </UFormField>

        <UFormField label="Description">
          <UTextarea v-model="form.description" class="w-full" :rows="5" />
        </UFormField>

        <UFormField label="Role" required>
          <UInput v-model="form.role" class="w-full" placeholder="Project Manager" />
        </UFormField>

        <UFormField label="Technology" required>
          <UInput v-model="techInput" class="w-full" placeholder="Vue.js, Nuxt.js, Tailwind" />
        </UFormField>

        <UFormField label="Project Year" required>
          <UInput v-model.number="form.projectDate" type="number" class="w-full" placeholder="2026" />
        </UFormField>

        <UFormField label="Image Project" required>
          <input type="file" accept="image/*" @change="handleImageUpload"
          class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" />
          <img v-if="form.image" :src="form.image" class="mt-2 w-24 h-24 object-cover rounded-lg border" />
        </UFormField>

        <UFormField label="Link Github">
          <UInput v-model="form.link_github" class="w-full" placeholder="https://github.com/abcd" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save As</UButton>
          <UButton to="/dashboard/projects" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: activity } = await useFetch(`/api/activity`, {
  transform: (list) => list.find((c) => c.id === Number(id)),
})

const form = reactive({
  type: '',
  title: '',
  position: '',
  description: '',
  year_start: '',
  year_end: '',
  image: '',
  is_current: false,
})

watchEffect(() => {
  if (activity.value) {
    form.type = activity.value.type
    form.title = activity.value.title
    form.position = activity.value.position
    form.description = activity.value.description
    form.year_start = activity.value.year_start
    form.year_end = activity.value.year_end
    form.image = activity.value.image
    form.is_current = activity.value.is_current
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
  if (!form.type || !form.title || !form.position || !form.year_start ) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/activity/${id}`, {
      method: 'PUT',
      body: cleanForm(form),
    })
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/activity')
  } catch (error) {
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('folder', 'images')

  const result = await $fetch('/api/upload', {
    method: 'POST',
    body: uploadData,
  })

  form.image = result.path
}
</script>

<template>
  <UDashboardPanel id="activity-edit">
    <template #header>
      <UDashboardNavbar title="Edit Activity">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">

        <UFormField label="Type" required>
          <UInput v-model="form.type" class="w-full" placeholder="Organization" />
        </UFormField>

        <UFormField label="Title" required>
          <UInput v-model="form.title" class="w-full" placeholder="OSIS" />
        </UFormField>

        <UFormField label="Position" required>
          <UInput v-model="form.position" class="w-full" placeholder="Leader.." />
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

        <UFormField label="Image">
          <input type="file" accept="image/*" @change="handleImageUpload"
           class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-elevated file:text-sm file:font-medium hover:file:bg-accented" />
          <img v-if="form.image" :src="form.image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
        </UFormField>

        <UFormField label="Is Current?">
          <USwitch v-model="form.is_current" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save Changes</UButton>
          <UButton to="/dashboard/activity" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
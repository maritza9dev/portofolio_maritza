<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const platformOptions = [
  { label: 'Instagram', value: 'Instagram', icon: 'i-simple-icons-instagram' },
  { label: 'GitHub', value: 'GitHub', icon: 'i-simple-icons-github' },
  { label: 'WhatsApp', value: 'WhatsApp', icon: 'i-simple-icons-whatsapp' },
  { label: 'Email', value: 'Email', icon: 'i-lucide-mail' },
  { label: 'LinkedIn', value: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  { label: 'TikTok', value: 'TikTok', icon: 'i-simple-icons-tiktok' },
  { label: 'YouTube', value: 'YouTube', icon: 'i-simple-icons-youtube' },
  { label: 'X (Twitter)', value: 'X', icon: 'i-simple-icons-x' },
  { label: 'Facebook', value: 'Facebook', icon: 'i-simple-icons-facebook' },
]

const form = reactive({
  icon: '',
  apk: '',
  link: '',
  decs: '',
})

const selectedPlatform = ref(null)

watch(selectedPlatform, (platform) => {
  if (platform) {
    form.icon = platform.icon
    form.apk = platform.value
  } else {
    form.icon = ''
    form.apk = ''
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
  if (!form.icon || !form.apk || !form.link) {
    toast.add({ title: 'Please complete all required fields!', color: 'error' })
    return
  }
  
  isSaving.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: cleanForm(form),
    })
    toast.add({ title: 'Save successfully!', color: 'success' })
    await navigateTo('/dashboard/contact')
  } catch (error) {
    console.error('Error saving contact:', error)
    toast.add({ title: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UDashboardPanel id="contact-create">
    <template #header>
      <UDashboardNavbar title="Add Contact">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
        <UFormField label="Select Platform" required>
          <USelectMenu
            v-model="selectedPlatform"
            :items="platformOptions"
            placeholder="Select platform..."
            class="w-full"
          >
            <template #leading>
              <UIcon v-if="selectedPlatform" :name="selectedPlatform.icon" class="w-4 h-4" />
            </template>
            <template #item-leading="{ item }">
              <UIcon :name="item.icon" class="w-4 h-4" />
            </template>
          </USelectMenu>
        </UFormField>

        <UFormField label="Preview Icon">
          <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-500">
            <UIcon v-if="form.icon" :name="form.icon" class="text-2xl text-primary" />
            <span class="font-mono text-xs">{{ form.icon || 'Not yet selected' }}</span>
          </div>
        </UFormField>

        <UFormField label="Platform Name" required>
          <UInput v-model="form.apk" class="w-full" readonly placeholder="Will follow select platform" />
        </UFormField>

        <UFormField label="Link" required>
          <UInput v-model="form.link" class="w-full" placeholder="https://instagram.com/username" />
        </UFormField>

        <UFormField label="Description">
          <UInput v-model="form.decs" class="w-full" placeholder="Optional description" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Save As</UButton>
          <UButton to="/dashboard/contact" color="neutral" variant="outline">Cancel</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
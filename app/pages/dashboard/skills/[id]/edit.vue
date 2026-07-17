<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const id = route.params.id

const { data: skill } = await useFetch(`/api/skills`, {
  transform: (list) => list.find((c) => c.id === Number(id)),
})

const categoryOptions = ['SoftSkills', 'HardSkills', 'Tools']
const levelOptions = ['Beginner', 'Intermediate', 'Advanced']

const form = reactive({
  name: '',
  category: '',
  level: '',
})

watchEffect(() => {
  if (skill.value) {
    form.name = skill.value.name
    form.category = skill.value.category
    form.level = skill.value.level
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
  if (!form.name || !form.category || !form.level) {
    toast.add({ title: 'Mohon lengkapi semua field yang wajib diisi', color: 'error' })
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/skills/${id}`, {
      method: 'PUT',
      body: cleanForm(form),
    })
    toast.add({ title: 'Berhasil diperbarui!', color: 'success' })
    await navigateTo('/dashboard/skills')
  } catch (error) {
    toast.add({ title: 'Gagal memperbarui', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UDashboardPanel id="skill-edit">
    <template #header>
      <UDashboardNavbar title="Edit Skill">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">

        <UFormField label="Name Skill" required>
          <UInput v-model="form.name" class="w-full" />
        </UFormField>

        <UFormField label="Category" required>
          <USelect v-model="form.category" :items="categoryOptions" class="w-full" placeholder="Pilih category" />
        </UFormField>

        <UFormField label="Level" required>
          <USelect v-model="form.level" :items="levelOptions" class="w-full" placeholder="Pilih level" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit" :loading="isSaving">Simpan Perubahan</UButton>
          <UButton to="/dashboard/skills" color="neutral" variant="outline">Batal</UButton>
        </div>
      </form>
    </template>
  </UDashboardPanel>
</template>
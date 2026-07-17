<template>
  <div class="min-h-screen flex items-center justify-center bg-white p-8 md:p-16">
    <div class="bg-pink-200 rounded-2xl shadow-md p-10 w-full max-w-md">
      <h1 class="font-inria font-bold text-2xl text-center mb-8">Login Admin</h1>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div>
          <label class="text-sm font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-pink-500"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-pink-500"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <button
          type="submit"
          :disabled="isLoading"
          class="bg-black text-white rounded-full py-3 font-medium hover:bg-pink-500 transition-colors disabled:opacity-50 mt-2"
        >
          {{ isLoading ? 'Memproses...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  colorMode: 'light',
})

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const { fetch: refreshSession } = useUserSession()

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
      },
    })

    await refreshSession()
    await navigateTo('/dashboard')
  } catch (error) {
    errorMessage.value = 'Username atau password salah'
  } finally {
    isLoading.value = false
  }
}
</script>
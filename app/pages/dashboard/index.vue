<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { user } = useUserSession()
</script>

<template>
  <UDashboardPanel id="overview">
    <template #header>
      <UDashboardNavbar title="Dashboard">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <p>Selamat datang, {{ user?.username }}! 👋</p>
    </template>
  </UDashboardPanel>
</template>
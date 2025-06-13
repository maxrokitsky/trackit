<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useColorMode } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { Button } from './ui/button'

const router = useRouter()

const authStore = useAuthStore()
const mode = useColorMode({ disableTransition: false })

const toggleTheme = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="flex gap-x-1 py-3 justify-between items-baseline">
    <h1>Trackit</h1>
    <div class="flex gap-x-2 items-center">
      <Button @click="toggleTheme" variant="outline">Сменить тему</Button>
      <Button @click="logout" variant="outline">Выйти</Button>
    </div>
  </header>
</template>


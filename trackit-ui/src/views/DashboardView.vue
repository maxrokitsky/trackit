<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { useColorMode } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { Play } from 'lucide-vue-next'

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
  <div class="w-full max-w-lg mx-auto">
    <header class="flex gap-x-1 py-3 justify-between items-baseline">
      <h1>Trackit</h1>
      <div class="flex gap-x-2 items-center">
        <Button @click="toggleTheme" variant="outline">Сменить тему</Button>
        <Button @click="logout" variant="outline">Выйти</Button>
      </div>
    </header>
    <main>
      <div class="flex gap-x-2">
        <Input placeholder="" />
        <Button size="icon">
          <Play class="w-4 h-4" />
        </Button>
      </div>

    </main>
  </div>
</template>

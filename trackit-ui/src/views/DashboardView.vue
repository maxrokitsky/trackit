<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { useColorMode } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { CircleStop, Play } from 'lucide-vue-next'
import ActivitiesHistory from '@/components/ActivitiesHistory.vue'
import useActivitiesQuery, {
  useActivitiesCreateMutation,
  useActivitiesUpdateMutation,
  useCurrentActivityQuery,
  type Activity,
} from '@/queries/activities'
import { computed, onMounted, ref } from 'vue'
import { intervalToDuration, type Duration } from 'date-fns'

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

const { data: activities, refetch } = useActivitiesQuery(1)

const nameInput = ref('')

const createMutation = useActivitiesCreateMutation()
const updateMutation = useActivitiesUpdateMutation()
const { refetch: currentActivityRefetch } = useCurrentActivityQuery();

const currentActivity = ref<Activity | null>(null)

let timer: number
const startTick = () => {
  timer = setInterval(activityTick, 1000)
}

onMounted(async () => {
  const response = await currentActivityRefetch();
  if (response.data) {
    currentActivity.value = response.data;
    nameInput.value = response.data.name;
    activityTick()
    startTick()
  }
})

const elapsedTime = ref<Duration | null>(null)
const activityTick = () => {
  if (!currentActivity.value) {
    return
  }
  elapsedTime.value = intervalToDuration({
    start: currentActivity.value.started_at,
    end: new Date(),
  })
}


const startActivity = async () => {
  const response = await createMutation.mutateAsync({
    name: nameInput.value,
    started_at: new Date().toISOString(),
  })
  currentActivity.value = response
  startTick()
}

const endActivity = async () => {
  if (!currentActivity.value) return

  await updateMutation.mutateAsync({
    id: currentActivity.value.id,
    ended_at: new Date().toISOString(),
  })
  nameInput.value = ''
  currentActivity.value = null
  elapsedTime.value = null
  clearInterval(timer)
  refetch()
}

const formatTimeDigit = (time: number | string | null | undefined) => {
  if (!time) return '00'
  return time.toString().padStart(2, '0') || '00'
}

const currentActivityDuration = computed(() => {
  if (!elapsedTime.value) return '00:00:00'
  return `${formatTimeDigit(elapsedTime.value?.hours)}:${formatTimeDigit(elapsedTime.value?.minutes)}:${formatTimeDigit(elapsedTime.value?.seconds)}`
})

const updateName = async () => {
   if (!currentActivity.value) return

  await updateMutation.mutateAsync({
    id: currentActivity.value.id,
    name: nameInput.value,
  })
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
      <div class="flex gap-x-3 items-baseline">
        <Input placeholder="Напишите вашу фигню" v-model="nameInput" @blur="updateName()"/>
        <span>{{ currentActivityDuration }}</span>
        <Button v-if="!currentActivity" size="icon" @click="startActivity">
          <Play class="w-4 h-4" />
        </Button>
        <Button v-else size="icon" @click="endActivity">
          <CircleStop class="w-4 h-4" />
        </Button>
      </div>

      <ActivitiesHistory v-if="activities" :activities="activities.items" />
    </main>
  </div>
</template>

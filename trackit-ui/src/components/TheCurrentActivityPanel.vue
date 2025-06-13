<script setup lang="ts">
import useActivitiesQuery, {
  useActivitiesCreateMutation,
  useActivitiesUpdateMutation,
  useCurrentActivityQuery,
  type Activity,
} from '@/queries/activities'
import { intervalToDuration, type Duration } from 'date-fns'
import { computed, onMounted, ref, watch } from 'vue'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { CircleStop, Play, Square } from 'lucide-vue-next'
import TimeDropdown from './ui/TimeDropdown.vue'

const nameInput = ref('')

const createMutation = useActivitiesCreateMutation()
const updateMutation = useActivitiesUpdateMutation()
const { refetch: currentActivityRefetch, data } = useCurrentActivityQuery()

const currentActivity = ref<Activity | null>(null)

const { refetch } = useActivitiesQuery(1)

let timer: number
const startTick = () => {
  timer = setInterval(activityTick, 1000)
}

onMounted(async () => {
  const response = await currentActivityRefetch()
  if (response.data) {
    currentActivity.value = response.data
    nameInput.value = response.data.name
    activityTick()
    startTick()
  }
})

watch(data, v => {
  if (v) {
    currentActivity.value = v
    activityTick()
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

const updateStartedAt = async (value: string) => {
  if (!currentActivity.value) return
  // TODO: mutate
  await updateMutation.mutateAsync({
    id: currentActivity.value.id,
    started_at: value,
  })
  currentActivityRefetch()
}
</script>

<template>
  <div class="flex gap-x-3 items-baseline">
    <Input placeholder="Напишите вашу фигню" v-model="nameInput" @blur="updateName()" />
    <span v-if="!currentActivity" >{{ currentActivityDuration }}</span>
    <TimeDropdown v-else :model-value="currentActivity.started_at" @update:model-value="updateStartedAt">
      <span>{{ currentActivityDuration }}</span>
    </TimeDropdown>
    <Button v-if="!currentActivity" size="icon" @click="startActivity">
      <Play class="w-4 h-4" />
    </Button>
    <Button v-else size="icon" @click="endActivity">
      <Square class="w-4 h-4" />
    </Button>
  </div>
</template>

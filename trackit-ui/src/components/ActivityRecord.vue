<script setup lang="ts">
import { useActivitiesUpdateMutation, type Activity } from '@/queries/activities'
import { intervalToDuration, formatDuration } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Input } from './ui/input'
import { computed, ref, watch } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import ActivityTimeForm from './ActivityTimeForm.vue'
import { useQueryClient } from '@tanstack/vue-query'

const props = defineProps<{
  data: Activity
}>()

const activityTime = ref({
  start: props.data.started_at,
  end: props.data.ended_at,
})

const name = ref(props.data.name)
const queryClient = useQueryClient();

const updateAcivityMutation = useActivitiesUpdateMutation()

const updateName = async () => {
  await updateAcivityMutation.mutateAsync({
    id: props.data.id,
    name: name.value,
  })
}

const durationFormatted = computed(() => {
  return formatDuration(
    intervalToDuration({
      start: props.data.started_at,
      end: props.data.ended_at,
    }),
    { locale: ru },
  )
})

const onActivityTimeChange = async (value: boolean) => {
  if (!value) {
    await updateAcivityMutation.mutateAsync({
      id: props.data.id,
      started_at: activityTime.value.start,
      ended_at: activityTime.value.end,
    })
    queryClient.invalidateQueries({ queryKey: ['activities']})
  }
}
</script>

<template>
  <div class="p-3 border-b-1 flex justify-between">
    <input
      class="focus:outline-none focus:border-0"
      v-model="name"
      @blur="updateName()"
      placeholder="Нет описания"
    />

    <Popover @update:open="onActivityTimeChange">
      <PopoverTrigger>
        <span v-if="data.ended_at" class="text-neutral-500 cursor-pointer">
          {{ durationFormatted }}
        </span>
      </PopoverTrigger>
      <PopoverContent> <ActivityTimeForm v-model:data="activityTime"/> </PopoverContent>
    </Popover>
  </div>
</template>

<style scoped></style>

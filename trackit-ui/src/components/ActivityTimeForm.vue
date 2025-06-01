<script setup lang="ts">
import type { Activity } from '@/queries/activities';
import { Input } from './ui/input';

type Time = {
  start: string;
  end: string;
}

defineProps<{
  data: Time
}>()

defineEmits<{
  'update:data': [data: Time]
}>()

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex flex-row items-baseline gap-x-3 justify-between">
      <span>Старт</span>
      <Input class="w-[150px]" :model-value="data.start" @update:model-value="payload => $emit('update:data', {
        start: payload.toString(),
        end: data.end,
      })"/>
    </div>
    <div class="flex flex-row items-baseline gap-x-3 justify-between">
      <span>Конец</span>
      <Input class="w-[150px]" :model-value="data.end" @update:model-value="payload => $emit('update:data', {
        start: data.start,
        end: payload.toString()
      })"/>
    </div>
  </div>
</template>

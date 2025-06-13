<script setup lang="ts">
import { vMaska } from 'maska/vue'
import type { Activity } from '@/queries/activities'
import { Input } from './ui/input'

import { computed, onUnmounted, ref, watch } from 'vue'
import { format, isMatch, isValid, parse, parseISO, set } from 'date-fns'
import DatePickerDropdown from './ui/date-picker/DatePickerDropdown.vue'

type Time = {
  start: string
  end: string
}

const data = defineModel<Time>('data', { required: true })

const startTimeValue = ref(format(data.value.start, 'HH:mm:ss'))
const endTimeValue = ref(format(data.value.end, 'HH:mm:ss'))

const setTime = () => {
  try {
    const newStartTime = parse(startTimeValue.value, 'HH:mm:ss', data.value.start)
    const newEndTime = parse(endTimeValue.value, 'HH:mm:ss', data.value.end)

    const newData = {
      start: newStartTime.toISOString(),
      end: newEndTime.toISOString(),
    }
    data.value = newData
  } catch (e) {
    console.log('Time parsing error')
  }
}

watch([startTimeValue, endTimeValue], () => {
  setTime()
})

const startDate = computed<string>({
  get: () => format(data.value.start, 'yyyy-MM-dd'),
  set: (v) => {
    const newDate = parseISO(v)
    const startDateTime = parseISO(data.value.start)

    const newDateTime = set(startDateTime, {
      date: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })
    data.value = {
      start: newDateTime.toISOString(),
      end: data.value.end,
    }
  },
})

const endDate = computed<string>({
  get: () => {
    return format(data.value.end, 'yyyy-MM-dd')
  },
  set: (v) => {
    const newDate = parseISO(v)
    const endDateTime = parseISO(data.value.end)

    const newDateTime = set(endDateTime, {
      date: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })
    data.value = {
      start: data.value.start,
      end: newDateTime.toISOString(),
    }
  },
})
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex flex-row items-center gap-x-3 justify-between">
      <span>Старт</span>

      <div class="flex gap-x-1">
        <DatePickerDropdown v-model="startDate" />
        <Input class="w-[80px] text-center" v-maska="'##:##:##'" v-model="startTimeValue" />
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-3 justify-between">
      <span>Конец</span>

      <div class="flex gap-x-1">
        <DatePickerDropdown v-model="endDate" />
        <Input class="w-[80px] text-center" v-maska="'##:##:##'" v-model="endTimeValue" />
      </div>
    </div>
  </div>
</template>

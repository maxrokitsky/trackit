<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone, parseDate } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const value = ref<DateValue>()

const modelValue = defineModel<string>({ required: true })

const date = computed({
  get: () => parseDate(modelValue.value),
  set: (v) => {
    modelValue.value = v.toString()
  },
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <CalendarIcon class="w-4 h-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ref, watch } from 'vue'
import { Input } from './input'
import { vMaska } from 'maska/vue'
import { format, parse, set } from 'date-fns'

const time = defineModel<string>({ required: true })
const timeValue = ref(format(time.value, 'HH:mm:ss'))

const emitValue = (v: string) => {
  try {
    const newDate = parse(v, 'HH:mm:ss', time.value)
    time.value = newDate.toISOString()
  } catch {}
}

const onOpenChanged = (open: boolean) => {
  if (!open) {
    emitValue(timeValue.value)
  } else {
    timeValue.value = format(time.value, 'HH:mm:ss')
  }
}
</script>

<template>
  <Popover @update:open="onOpenChanged">
    <PopoverTrigger> <slot /> </PopoverTrigger>
    <PopoverContent class="w-[180px] flex justify-center items-center gap-x-2">
      <span>Старт</span>
      <Input class="w-[80px] text-center" v-maska="'##:##:##'" v-model="timeValue" />
    </PopoverContent>
  </Popover>
</template>

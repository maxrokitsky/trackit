<script setup lang="ts">
import type { Activity } from '@/queries/activities';


defineProps<{
  data: Activity
}>()
</script>

<template>
  <div class="p-3 border-b-1 flex justify-between">
    <span>{{ data.name }}</span>
    <span class="text-neutral-500">{{ data.started_at }}</span>
  </div>
</template>

<style scoped>

</style>

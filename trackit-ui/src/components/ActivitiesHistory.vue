<script setup lang="ts">
import type { Activity } from '@/queries/activities';
import ActivityRecord from './ActivityRecord.vue';

defineProps<{
  activities: Activity[]
}>()

</script>

<template>
  <div>
    <ActivityRecord v-for="activity in activities" :key="activity.id" :data="activity" />
  </div>
</template>

<style scoped lang="scss">

</style>

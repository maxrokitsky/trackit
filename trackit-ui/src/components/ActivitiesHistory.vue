<script setup lang="ts">
import type { Activity } from '@/queries/activities'
import ActivityRecord from './ActivityRecord.vue'
import { computed } from 'vue'
import { format } from 'date-fns';
import { ru } from "date-fns/locale";


const { activities } = defineProps<{
  activities: Activity[]
}>()

type Group = {
  date: string
  activities: Activity[]
}

const activityGroupedByDate = computed<Group[]>(() => {
  const groups = []
  let lastGroup = null
  for (let activity of activities) {
    const activityDate = format(activity.ended_at, 'yyyy-MM-dd')
    if (!lastGroup || activityDate != lastGroup.date) {
      lastGroup = {
        date: activityDate,
        activities: [activity],
      }
      groups.push(lastGroup)
    } else {
      lastGroup.activities.push(activity)
    }
  }
  return groups
})
</script>

<template>
  <div class="border-border border rounded">
    <div v-for="group in activityGroupedByDate">
    <div class="bg-foreground/5 text-xs p-1 pl-2 mb-2 font-mono font-semibold">{{ format(group.date, 'PP', { locale: ru }) }}</div>
    <div>
      <ActivityRecord v-for="activity in group.activities" :key="activity.id" :data="activity" />
    </div>
  </div>
  </div>
</template>

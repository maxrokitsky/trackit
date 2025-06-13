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
import TheHeader from '@/components/TheHeader.vue'
import TheCurrentActivityPanel from '@/components/TheCurrentActivityPanel.vue'

const { data: activities } = useActivitiesQuery(1)
</script>

<template>
  <div class="w-full max-w-lg mx-auto">
    <TheHeader />
    <main>
      <TheCurrentActivityPanel class="mb-3"/>
      <ActivitiesHistory v-if="activities" :activities="activities.items" />
    </main>
  </div>
</template>

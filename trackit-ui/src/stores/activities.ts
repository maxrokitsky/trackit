import { usePocketBase } from "@/lib/pocketbase";
import { defineStore } from "pinia";

export const useActivitiesStore = defineStore('activities', () => {
  const pb = usePocketBase();

  async function getActivities(page: number) {
    const result = await pb.collection('activities').getList(page, 50);
  }


})

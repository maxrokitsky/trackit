import { usePocketBase } from "@/lib/pocketbase";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { RecordModel } from "pocketbase";
import { ref, type MaybeRef } from "vue";

export type Activity = RecordModel & {
  id: string;
  name: string;
  started_at: string;
  ended_at: string;
}

const useActivitiesQuery = (page: MaybeRef<number>) => {
  const pageRef = ref(page);
  const pb = usePocketBase();

  const getActivities = async () => {
    return await pb.collection('activities').getList<Activity>(pageRef.value, 50, {
      sort: '-started_at'
    }); // Adjust the page and limit as needed
  }

  return useQuery({
    queryKey: ['activities', pageRef],
    queryFn: getActivities,
  })
}

export const useActivitiesMutation = () => {
  const pb = usePocketBase();

  return useMutation({
    mutationFn: async (activityData: Partial<Activity>) => {
      return await pb.collection('activities').create(activityData);
    },
  });
}

export default useActivitiesQuery;

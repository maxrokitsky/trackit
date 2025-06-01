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
      sort: '-started_at',
      filter: 'ended_at!=null',
    });
  }

  return useQuery({
    queryKey: ['activities', pageRef],
    queryFn: getActivities,
  })
}

export const useCurrentActivityQuery = () => {
  const pb = usePocketBase();

  const getActivity = async () => {
    return await pb.collection('activities').getFirstListItem<Activity>("ended_at=null")
  }
  return useQuery({
    queryKey: ['currentActivity'],
    queryFn: getActivity,
    enabled: false
  })
}

export const useActivitiesCreateMutation = () => {
  const pb = usePocketBase();

  return useMutation({
    mutationFn: async (activityData: Partial<Activity>) => {
      return await pb.collection('activities').create<Activity>(activityData);
    },
  });
}

export const useActivitiesUpdateMutation = () => {
  const pb = usePocketBase();

  return useMutation({
    mutationFn: async (activityData: Partial<Activity>) => {
      const id = activityData.id!;
      return await pb.collection('activities').update<Activity>(id, activityData);
    },
  });
}

export default useActivitiesQuery;

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import PocketBase from 'pocketbase'
import { usePocketBase } from '@/lib/pocketbase'

type LoginData = {
  username: string,
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const pb = usePocketBase()
  const data = ref();

  async function login(loginData: LoginData) {
    const authData = await pb.collection("users").authWithPassword(loginData.username, loginData.password);
    data.value = authData;
    return authData;
  }

  async function refresh() {
    const authData = await pb.collection("users").authRefresh()
    data.value = authData;
    return authData;
  }

  function logout() {
    pb.authStore.clear();
    data.value = undefined;
  }

  try {
    refresh()
  } catch (error) {
    console.error('Failed to refresh authentication:', error);
  }

  return { data, login, logout, refresh }
})

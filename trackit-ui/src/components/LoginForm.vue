<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField, FormMessage } from '@/components/ui/form'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2),
    password: z.string().min(1),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  authStore.login(values);
  router.push({ name: 'dashboard' })
})
</script>

<template>
  <div>
    {{ authStore.data }}
    <form @submit="onSubmit" class="flex flex-col gap-y-3">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Логин</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Войти </Button>
    </form>
  </div>
</template>

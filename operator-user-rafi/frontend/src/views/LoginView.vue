<!-- src/views/LoginView.vue -->
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const login = async () => {
      try {
        await authStore.login(username.value, password.value)
        router.push('/operator')
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return {
      username,
      password,
      login
    }
  }
})
</script>

// src/stores/auth.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { username, password })
        this.token = response.data.token
        this.role = response.data.role
        localStorage.setItem('token', this.token)
        localStorage.setItem('role', this.role)
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }
})

// src/stores/operator.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/operator'

export const useOperatorStore = defineStore('operator', {
  actions: {
    async createBorrowItem(borrowItem: any) {
      try {
        const response = await axios.post(`${API_URL}/book-equipment`, borrowItem, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return response.data
      } catch (error) {
        console.error('Error creating borrow item:', error)
        throw error
      }
    },
    async getAllItems() {
      try {
        const response = await axios.get(`${API_URL}/all-equipment`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return response.data
      } catch (error) {
        console.error('Error fetching items:', error)
        throw error
      }
    },
    async getAllBorrowItems() {
      try {
        const response = await axios.get(`${API_URL}/all-borrow-items`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return response.data
      } catch (error) {
        console.error('Error fetching borrow items:', error)
        throw error
      }
    }
  }
})

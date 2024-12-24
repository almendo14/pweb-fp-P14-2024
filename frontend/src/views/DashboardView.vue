<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h1 class="text-3xl font-bold text-gray-900">Equipment Management System</h1>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Welcome to the Equipment Management System. Use the navigation above to access different features.</p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Total Equipment</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ totalEquipment }}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Total Borrowed Items</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ totalBorrowedItems }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { getToken } from '@/stores/auth';

export default defineComponent({
  name: 'DashboardView',
  setup() {
    const totalEquipment = ref(0)
    const totalBorrowedItems = ref(0)

    // Get the Bearer token from localStorage (or wherever you store it)
    const token = getToken();  

    onMounted(async () => {
      try {
        // Make the GET request for total equipment with Bearer token
        const equipmentResponse = await axios.get('http://localhost:5000/operator/all-equipment', {
          headers: {
            Authorization: `Bearer ${token}`  // Add Bearer token in request headers
          }
        })
        totalEquipment.value = equipmentResponse.data.length

        // Make the GET request for total borrowed items with Bearer token
        const borrowedItemsResponse = await axios.get('http://localhost:5000/operator/all-borrow-items', {
          headers: {
            Authorization: `Bearer ${token}`  // Add Bearer token in request headers
          }
        })
        totalBorrowedItems.value = borrowedItemsResponse.data.length
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    })

    return {
      totalEquipment,
      totalBorrowedItems
    }
  }
})
</script>

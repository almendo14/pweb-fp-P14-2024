<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-2xl font-bold text-gray-900">All Equipment</h2>
    </div>
    <div class="border-t border-gray-200">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="table-header">No</th>
                      <th scope="col" class="table-header">Name</th>
                      <th scope="col" class="table-header">Condition</th>
                      <th scope="col" class="table-header">Amount</th>
                      <th scope="col" class="table-header">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200" v-if="items.length > 0">
                    <tr v-for="(item, index) in items" :key="item._id">
                      <td class="table-cell">{{ index + 1 }}</td>
                      <td class="table-cell">{{ item.name }}</td>
                      <td class="table-cell">{{ item.condition }}</td>
                      <td class="table-cell">{{ item.amount }}</td>
                      <td class="table-cell">{{ formatDate(item.created_at) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5" class="text-center text-lg text-gray-500">No equipment available.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { getToken } from '@/stores/auth';

interface Equipment {
  _id: string;
  name: string;
  condition: string;
  amount: number;
  created_at: Date;
}

export default defineComponent({
  name: 'AllEquipmentView',
  setup() {
    const items = ref<Equipment[]>([])

    // Get Bearer token from localStorage (or wherever it's stored)
    const token = getToken();  

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5000/operator/all-equipment', {
          headers: {
            Authorization: `Bearer ${token}`  // Add Bearer token in request headers
          }
        });
        console.log(response.data);  
        items.value = response.data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    })

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();  // Convert date string to local date format
    }

    return {
      items,
      formatDate
    }
  }
})
</script>

<style scoped>
.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500;
}
</style>

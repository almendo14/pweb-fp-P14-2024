<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-2xl font-bold text-gray-900">All Equipment</h2>
      </div>
      <div class="border-t border-gray-200">
        <div class="px-4 py-5 sm:p-6">
          <!-- Form for adding new equipment -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-700">Add New Equipment</h3>
            <form @submit.prevent="addEquipment">
              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" v-model="newItem.name" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div>
                  <label for="condition" class="block text-sm font-medium text-gray-700">Condition</label>
                  <input type="text" id="condition" v-model="newItem.condition" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                  <input type="number" id="amount" v-model="newItem.amount" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
  
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
  import { defineComponent, onMounted, ref } from 'vue';
  import axios from 'axios';
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
      const items = ref<Equipment[]>([]);
  
      // New equipment data for POST request
      const newItem = ref({
        name: '',
        condition: '',
        amount: 0
      });
  
      // Get Bearer token from localStorage (or wherever it's stored)
      const token = getToken();  
  
      // Fetch all equipment on mounted
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin', {
            headers: {
              Authorization: `Bearer ${token}`  // Add Bearer token in request headers
            }
          });
          items.value = response.data;
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      });
  
      // Handle new equipment POST request
      const addEquipment = async () => {
        try {
          const response = await axios.post('http://localhost:5000/admin', newItem.value, {
            headers: {
              Authorization: `Bearer ${token}`  // Add Bearer token in request headers
            }
          });
          // Add the new item to the list
          items.value.push(response.data);
          // Reset the form
          newItem.value = { name: '', condition: '', amount: 0 };
        } catch (error) {
          console.error('Error adding equipment:', error);
        }
      };
  
      // Format date function
      const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();  // Convert date string to local date format
      };
  
      return {
        items,
        newItem,
        addEquipment,
        formatDate
      };
    }
  });
  </script>
  
  <style scoped>
  .table-header {
    @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
  }
  
  .table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500;
  }
  </style>
  
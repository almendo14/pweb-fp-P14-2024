<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-2xl font-bold text-gray-900">All Operators</h2>
      </div>
      <div class="border-t border-gray-200">
        <div class="px-4 py-5 sm:p-6">
          <!-- Form for editing operator -->
          <div class="mb-6" v-if="selectedOperator">
            <h3 class="text-xl font-semibold text-gray-700">Edit Operator</h3>
            <form @submit.prevent="updateOperator">
              <div class="space-y-4">
                <div>
                  <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" id="username" v-model="selectedOperator.username" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Update Operator
                </button>
              </div>
            </form>
          </div>
  
          <!-- Display Operators -->
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="table-header">No</th>
                        <th scope="col" class="table-header">Username</th>
                        <th scope="col" class="table-header">Role</th>
                        <th scope="col" class="table-header">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" v-if="operators.length > 0">
                      <tr v-for="(operator, index) in operators" :key="operator._id">
                        <td class="table-cell">{{ index + 1 }}</td>
                        <td class="table-cell">{{ operator.username }}</td>
                        <td class="table-cell">{{ operator.role }}</td>
                        <td class="table-cell">
                          <button @click="selectOperator(operator)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                          <button @click="deleteOperator(operator._id)" class="text-red-600 hover:text-red-900 ml-2">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="text-center text-lg text-gray-500">No operators available.</td>
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
  
  interface Operator {
    _id: string;
    username: string;
    password: string;
    role: 'USER' | 'ADMIN';
  }
  
  export default defineComponent({
    name: 'AdminOperatorView',
    setup() {
      const operators = ref<Operator[]>([])
      const selectedOperator = ref<Operator | null>(null)
  
      // Get Bearer token from localStorage (or wherever it's stored)
      const token = getToken();  
  
      // Fetch all operators on mounted
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin/all-operator', {
            headers: {
              Authorization: `Bearer ${token}`  // Add Bearer token in request headers
            }
          })
          operators.value = response.data
        } catch (error) {
          console.error('Error fetching operators:', error)
        }
      })
  
      // Handle update operator PUT request
      const updateOperator = async () => {
        if (selectedOperator.value) {
          try {
            const response = await axios.patch(`http://localhost:5000/admin/all-operator/${selectedOperator.value._id}`, selectedOperator.value, {
              headers: {
                Authorization: `Bearer ${token}`  // Add Bearer token in request headers
              }
            })
            // Update the operator in the list with the new data
            const index = operators.value.findIndex(operator => operator._id === selectedOperator.value?._id)
            if (index !== -1) {
              operators.value[index] = response.data
            }
            // Clear the selected operator
            selectedOperator.value = null
          } catch (error) {
            console.error('Error updating operator:', error)
          }
        }
      }
  
      // Select an operator to edit
      const selectOperator = (operator: Operator) => {
        selectedOperator.value = { ...operator }
      }
  
      // Handle delete operator DELETE request
      const deleteOperator = async (operatorId: string) => {
        if (confirm('Are you sure you want to delete this operator?')) {
          try {
            await axios.delete(`http://localhost:5000/admin/all-operator/${operatorId}`, {
              headers: {
                Authorization: `Bearer ${token}`  // Add Bearer token in request headers
              }
            })
            // Remove the deleted operator from the list
            operators.value = operators.value.filter(operator => operator._id !== operatorId)
          } catch (error) {
            console.error('Error deleting operator:', error)
          }
        }
      }
  
      return {
        operators,
        selectedOperator,
        updateOperator,
        selectOperator,
        deleteOperator
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
  
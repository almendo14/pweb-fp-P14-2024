<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-2xl font-bold text-gray-900">All Borrow Items</h2>
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
                      <th scope="col" class="table-header">Item Name</th>
                      <th scope="col" class="table-header">Amount</th>
                      <th scope="col" class="table-header">Borrow Date</th>
                      <th scope="col" class="table-header">Return Date</th>
                      <th scope="col" class="table-header">Borrower</th>
                      <th scope="col" class="table-header">Officer</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in borrowItems" :key="item._id">
                      <td class="table-cell">{{ index + 1 }}</td>
                      <td class="table-cell">{{ item.item_name }}</td>
                      <td class="table-cell">{{ item.amount }}</td>
                      <td class="table-cell">{{ formatDate(item.borrow_date) }}</td>
                      <td class="table-cell">{{ formatDate(item.return_date) }}</td>
                      <td class="table-cell">{{ item.borrower_name }}</td>
                      <td class="table-cell">{{ item.officer_name }}</td>
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

interface BorrowItem {
  _id: string;
  item_name: string;
  amount: number;
  borrow_date: string;
  return_date: string;
  borrower_name: string;
  officer_name: string;
}

export default defineComponent({
  name: 'AllBorrowItemsView',
  setup() {

    const borrowItems = ref<BorrowItem[]>([])

    const token = getToken();  

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5000/operator/all-borrow-items', {
          headers: {
            Authorization: `Bearer ${token}`  // Add Bearer token in request headers
          }
        })
        borrowItems.value = response.data
      } catch (error) {
        console.error('Error fetching borrow items:', error)
      }
    })

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      borrowItems,
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

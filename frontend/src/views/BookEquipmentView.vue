<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-2xl font-bold text-gray-900">Book Equipment</h2>
    </div>
    <div class="border-t border-gray-200">
      <form @submit.prevent="bookEquipment" class="space-y-6 px-4 py-5 sm:p-6">
        <div>
          <label for="item_name" class="block text-sm font-medium text-gray-700">Item Name</label>
          <input type="text" id="item_name" v-model="formData.item_name" required
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input type="number" id="amount" v-model="formData.amount" required
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div>
          <label for="return_date" class="block text-sm font-medium text-gray-700">Return Date</label>
          <input type="date" id="return_date" v-model="formData.return_date" required
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div>
          <label for="borrower_name" class="block text-sm font-medium text-gray-700">Borrower Name</label>
          <input type="text" id="borrower_name" v-model="formData.borrower_name" required
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div>
          <label for="officer_name" class="block text-sm font-medium text-gray-700">Officer Name</label>
          <input type="text" id="officer_name" v-model="formData.officer_name" required
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div>
          <button type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Book Equipment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { getToken } from '@/stores/auth';

export default defineComponent({
  name: 'BookEquipmentView',
  setup() {
    const formData = reactive({
      item_name: '',
      amount: 0,
      return_date: '',
      borrower_name: '',
      officer_name: ''
    });

    // Get the Bearer token from localStorage (or wherever you store it)
    const token = getToken();  

    const bookEquipment = async () => {
      try {
        // Make the POST request with Bearer token
        const response = await axios.post('http://localhost:5000/operator/book-equipment', formData, {
          headers: {
            Authorization: `Bearer ${token}`  
          }
        });
        // Handle the response data if needed

        formData.item_name = '';
        formData.amount = 0;
        formData.return_date = '';
        formData.borrower_name = '';
        formData.officer_name = '';

        alert('Equipment booked successfully!');
      } catch (error) {
        console.error('Error booking equipment:', error);
        alert('Error booking equipment. Please try again.');
      }
    };

    return {
      formData,
      bookEquipment
    };
  }
});
</script>
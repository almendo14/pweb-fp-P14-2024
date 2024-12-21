<template>
  <div class="book-equipment">
    <h2>Book Equipment</h2>
    <form @submit.prevent="bookEquipment">
      <div>
        <label for="item_name">Item Name:</label>
        <input id="item_name" v-model="formData.item_name" type="text" required>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input id="amount" v-model="formData.amount" type="number" required>
      </div>
      <div>
        <label for="return_date">Return Date:</label>
        <input id="return_date" v-model="formData.return_date" type="date" required>
      </div>
      <div>
        <label for="borrower_name">Borrower Name:</label>
        <input id="borrower_name" v-model="formData.borrower_name" type="text" required>
      </div>
      <div>
        <label for="officer_name">Officer Name:</label>
        <input id="officer_name" v-model="formData.officer_name" type="text" required>
      </div>
      <button type="submit">Book Equipment</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'BookEquipmentView',
  setup() {
    const formData = reactive({
      item_name: '',
      amount: 0,
      return_date: '',
      borrower_name: '',
      officer_name: ''
    })

    const bookEquipment = async () => {
      try {
        await axios.post('http://localhost:3000/api/operator/book-equipment', formData)
        alert('Equipment booked successfully!')
        // Reset form
        Object.assign(formData, {
          item_name: '',
          amount: 0,
          return_date: '',
          borrower_name: '',
          officer_name: ''
        })
      } catch (error) {
        console.error('Error booking equipment:', error)
        alert('Error booking equipment. Please try again.')
      }
    }

    return {
      formData,
      bookEquipment
    }
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}

button {
  margin-top: 20px;
}
</style>

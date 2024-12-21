<template>
  <div class="all-borrow-items">
    <h2>All Borrow Items</h2>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Item Name</th>
          <th>Amount</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Borrower</th>
          <th>Officer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in borrowItems" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.item_name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ formatDate(item.borrow_date) }}</td>
          <td>{{ formatDate(item.return_date) }}</td>
          <td>{{ item.borrower_name }}</td>
          <td>{{ item.officer_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'AllBorrowItemsView',
  setup() {
    const borrowItems = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/operator/all-borrow-items')
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
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>

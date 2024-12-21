<template>
  <div class="all-equipment">
    <h2>All Equipment</h2>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Condition</th>
          <th>Amount</th>
          <th>Registration Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.condition }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'AllEquipmentView',
  setup() {
    const items = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/operator/all-equipment')
        items.value = response.data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    })

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      items,
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

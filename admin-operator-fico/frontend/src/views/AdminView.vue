<template>
    <div>
        <Navbar />
        <h2>Admin Dashboard</h2>
        <div>
            <h3>Data Barang</h3>
            <button @click="fetchItems">Refresh Data</button>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Kondisi</th>
                        <th>Tanggal Registrasi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="item._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.condition }}</td>
                        <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../components/navbar.vue';

export default defineComponent({
    name: 'AdminView',
    components: {
        Navbar,
    },
    setup() {
        const items = ref([]);

        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                items.value = response.data;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        onMounted(fetchItems);

        return { items, fetchItems };
    },
});
</script>
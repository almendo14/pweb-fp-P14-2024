<template>
    <div>
        <navbar />
        <h2>Operator Dashboard</h2>
        <h3>Form Peminjaman</h3>
        <form @submit.prevent="submitBorrow">
            <label for="item_name">Nama Barang:</label>
            <input type="text" v-model="borrowData.item_name" required />
            <label for="amount">Jumlah Pinjam:</label>
            <input type="number" v-model="borrowData.amount" required />
            <label for="borrow_date">Tanggal Peminjaman:</label>
            <input type="date" v-model="borrowData.borrow_date" required />
            <label for="return_date">Tanggal Kembali:</label>
            <input type="date" v-model="borrowData.return_date" required />
            <label for="borrower_name">Nama Peminjam:</label>
            <input type="text" v-model="borrowData.borrower_name" required />
            <label for="officer_name">Nama Petugas:</label>
            <input type="text" v-model="borrowData.officer_name" required />
            <button type="submit">Pinjam</button>
        </form>
    </div>
</template>

<script lang="ts">
import Navbar from '../components/navbar.vue';
import axios from 'axios';
import { ref } from 'vue';

export default {
    name: 'OperatorView',
    components: {
        Navbar,
    },
    setup() {
        const borrowData = ref({
            item_name: '',
            amount: 0,
            borrow_date: '',
            return_date: '',
            borrower_name: '',
            officer_name: '',
        });

        const resetBorrowData = () => {
            borrowData.value = {
                item_name: '',
                amount: 0,
                borrow_date: '',
                return_date: '',
                borrower_name: '',
                officer_name: '',
            };
        };

        const submitBorrow = async () => {
            try {
                await axios.post('http://localhost:5000/api/borrow', borrowData.value);
                alert('Peminjaman berhasil!');
                resetBorrowData();
            } catch (error) {
                console.error('Error submitting borrow:', error);
                alert('Gagal melakukan peminjaman.');
            }
        };

        return { borrowData, submitBorrow };
    },
};
</script>
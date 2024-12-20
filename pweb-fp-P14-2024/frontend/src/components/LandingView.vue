<template>
    <div>
        <Navbar />
        <h2>Selamat datang di Website Manajemen Peminjaman Barang</h2>
        <p>Silakan login untuk melanjutkan.</p>
    </div>
</template>

<script lang="ts">
import Navbar from '../components/navbar.vue';

export default {
    name: 'LandingView',
    components: {
        Navbar,
    },
};
</script>
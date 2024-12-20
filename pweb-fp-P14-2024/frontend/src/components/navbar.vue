<template>
    <nav>
        <h1>Website Manajemen Peminjaman Barang</h1>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/admin">Admin Dashboard</router-link></li>
            <li><router-link to="/operator">Operator Dashboard</router-link></li>
        </ul>
    </nav>
</template>

<script lang="ts">
export default {
    name: 'Navbar',
};
</script>

<style scoped>
nav {
    background-color: #f8f9fa;
    padding: 1rem;
}

nav h1 {
    margin: 0;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 1rem;
}
</style>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/book-equipment">Book Equipment</router-link> |
      <router-link to="/all-equipment">All Equipment</router-link> |
      <router-link to="/all-borrow-items">All Borrow Items</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

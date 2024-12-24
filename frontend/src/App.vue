<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold text-indigo-600">EMS</span>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/" class="nav-link">Dashboard</router-link>
              <router-link to="/book-equipment" class="nav-link">Book Equipment</router-link>
              <router-link to="/all-equipment" class="nav-link">All Equipment</router-link>
              <router-link to="/all-borrow-items" class="nav-link">All Borrow Items</router-link>
              <router-link to="/admin" class="nav-link">Admin Equipment</router-link>
              <router-link to="/admin/all-operator" class="nav-link">Admin Operator</router-link>
              <router-link to="/admin/summary" class="nav-link">Admin Summary </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium;
}

.nav-link:not(.router-link-active) {
  @apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700;
}

.nav-link.router-link-active {
  @apply border-indigo-500 text-gray-900;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


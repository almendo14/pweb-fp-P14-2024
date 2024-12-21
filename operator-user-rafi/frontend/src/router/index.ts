import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import BookEquipmentView from '../views/BookEquipmentView.vue'
import AllEquipmentView from '../views/AllEquipmentView.vue'
import AllBorrowItemsView from '../views/AllBorrowItemsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/book-equipment',
      name: 'bookEquipment',
      component: BookEquipmentView
    },
    {
      path: '/all-equipment',
      name: 'allEquipment',
      component: AllEquipmentView
    },
    {
      path: '/all-borrow-items',
      name: 'allBorrowItems',
      component: AllBorrowItemsView
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import BookEquipmentView from '../views/BookEquipmentView.vue'
import AllEquipmentView from '../views/AllEquipmentView.vue'
import AllBorrowItemsView from '../views/AllBorrowItemsView.vue'
import AdminEquipment from '@/views/AdminEquipment.vue'
import AdminOperator from '@/views/AdminOperator.vue'
import AdminSummary from '@/views/AdminSummary.vue'

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
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminEquipment
    },
    {
      path: '/admin/all-operator',
      name: 'adminOperator',
      component: AdminOperator
    },
    {
      path: '/admin/summary',
      name: 'adminSummary',
      component: AdminSummary
    }
  ]
})

export default router

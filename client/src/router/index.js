// eslint-disable-next-line vue/no-unused-components
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Clients from '@/components/Clients'
import Users from '@/components/Users'
import Bills from '@/components/Bills'
import Reports from '@/components/Reports'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/bills',
      name: 'bills',
      component: Bills
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/config',
      name: 'config',
      component: Settings
    }
  ]
})

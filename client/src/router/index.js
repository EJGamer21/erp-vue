// eslint-disable-next-line vue/no-unused-components
import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Home from '@/components/Home'
import Clients from '@/components/Clients'

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
      component: Clients
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
      component: Clients
    },
    {
      path: '/reports',
      name: 'reports',
      component: Clients
    },
    {
      path: '/config',
      name: 'config',
      component: Clients
    }
  ]
})

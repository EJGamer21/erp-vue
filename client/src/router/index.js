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
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
  ]
})

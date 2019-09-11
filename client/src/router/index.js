// eslint-disable-next-line vue/no-unused-components
import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})

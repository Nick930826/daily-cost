import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Data from '../views/Data.vue'
// import User from '../views/User.vue'
// import Login from '../views/Login.vue'
// import Detail from '../views/Detail.vue'
// import About from '../views/About.vue'
// import Account from '../views/Account.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import(/* webpackChunkName: "data" */ '../views/Data.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
    }
  ]
})

export default router
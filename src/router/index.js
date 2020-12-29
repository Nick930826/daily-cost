import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Data from '../views/Data.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'

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
      component: defineAsyncComponent(() => import('../views/Home.vue'))
    },
    {
      path: '/data',
      component: defineAsyncComponent(() => import('../views/Data.vue'))
    },
    {
      path: '/user',
      component: defineAsyncComponent(() => import('../views/User.vue'))
    },
    {
      path: '/login',
      component: defineAsyncComponent(() => import('../views/Login.vue'))
    },
    {
      path: '/detail',
      component: defineAsyncComponent(() => import('../views/Detail.vue'))
    },
    {
      path: '/about',
      component: defineAsyncComponent(() => import('../views/About.vue'))
    },
    {
      path: '/account',
      component: defineAsyncComponent(() => import('../views/Account.vue'))
    }
  ]
})

export default router
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
      component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue')
    },
    {
      path: '/data',
      component: () => import(/* webpackChunkName: 'data' */ '../views/Data.vue')
    },
    {
      path: '/user',
      component: () => import(/* webpackChunkName: 'user' */ '../views/User.vue')
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
    },
    {
      path: '/detail',
      component: () => import(/* webpackChunkName: 'detail' */ '../views/Detail.vue')
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue')
    },
    {
      path: '/account',
      component: () => import(/* webpackChunkName: 'account' */ '../views/Account.vue')
    }
  ]
})

export default router
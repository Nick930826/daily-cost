<template>
<!-- 和 vue-router3 一样，展示路由的组件的地方 -->
  <router-view />
  <NavBar v-if="show" />
</template>

<script>
import NavBar from './components/NavBar.vue';
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const state = reactive({
      menu: ['/user', '/home', '/data'],
      show: false
    })
    const router = useRouter()
    router.afterEach(() => {
      // menu 内的路径都是需要展示底部导航栏的
      state.show = state.menu.includes(router.currentRoute.value.path)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

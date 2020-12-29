<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="/home" icon="notes-o" @click="link('/home')">明细</van-tabbar-item>
    <van-tabbar-item name="/data" icon="bar-chart-o" @click="link('/data')">统计</van-tabbar-item>
    <van-tabbar-item name="/user" icon="user-o" @click="link('/user')">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  setup() {
    const router = useRouter()
    const active = ref('/home')

    const link = (path) => {
      router.push({ path })
    }

    onMounted(() => {
      active.value = router.currentRoute.value.path
    })

    router.afterEach(() => {
      active.value = router.currentRoute.value.path
    })

    return {
      active,
      link
    }
  }
}
</script>

<style lang="less">
  @import url('../config/custom.less');
  .van-tabbar-item--active {
    color: @primary!important;
  } 
</style>

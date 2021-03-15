<template>
  <div class="about">
    <Header title='关于我们' />
    <van-divider
      content-position="left"
      :style="{ color: '#39be77', borderColor: '#39be77', padding: '0 16px' }"
    >
      关于作者
    </van-divider>
    <div class="content">
      大家好，我是本次实验的作者陈尼克，目前从业 5 年，就职于浙江杭州某互联网公司的高级前端开发。
    </div>
    <van-divider
      content-position="left"
      :style="{ color: '#39be77', borderColor: '#39be77', padding: '0 16px' }"
    >
      关于课程
    </van-divider>
    <div class="content">
      <p>课程中使用到的技术包括 Vite 构建项目、flexible 移动端适配、Vant 3.x 组件库、Vue-Router 4.x 路由插件、Echarts 5.x 图表插件等等。</p>
      <p>本课程提供在线服务端接口地址，无需自建服务或 Mock 数据。</p>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'About',
  components: {
    Header
  }
}
</script>

<style lang="less">
  .about {
    .content {
      padding: 0 16px;
      font-size: 14px;
      color: rgba(0, 0, 0, .5);
      line-height: 24px;
      p {
        margin-bottom: 10px;
      }
    }
  }
</style>
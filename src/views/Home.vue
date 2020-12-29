<template>
  <div class="home">
    <div class="header">
      <div class="type-wrap" @click="toggle">
        <span class="title">{{ currentSelect.name || '全部类型' }}</span>
        <i class="iconfont leixing" />
      </div>
      <div class="data-wrap">
        <span class="time" @click="monthToggle">{{ currentTime }} <i class="iconfont sort-down" /></span>
        <span class="expense">总支出 ¥{{ totalExpense }}</span>
        <span class="income">总收入 ¥{{ totalIncome }}</span>
      </div>
    </div>
    <div class="content-wrap">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <CardItem v-for="item in list" :bill="item" :key="item" />
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="add" @click="addToggle">
      <van-icon name="records" />
    </div>
    <PopType ref="popRef" @select="select" />
    <PopMonth ref="popMonthRef" @select="selectMonth" />
    <PopAdd ref="popAddRef" @refresh="onRefresh" />
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import CardItem from '../components/CardItem.vue'
import PopType from '../components/PopType.vue'
import PopMonth from '../components/PopMonth.vue'
import PopAdd from '../components/PopAdd.vue'
import axios from '../utils/axios'
import dayjs from 'dayjs'
export default {
  components: {
    CardItem,
    PopType,
    PopMonth,
    PopAdd
  },
  setup() {
    const popRef = ref(null)
    const popMonthRef = ref(null)
    const popAddRef = ref(null)
    const state = reactive({
      totalExpense: 0,
      totalIncome: 0,
      page: 1,
      totalPage: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      currentSelect: {},
      currentTime: dayjs().format('YYYY-MM')
    })

    const getBillList = async () => {
      const { data } = await axios.get(`/bill/list?date=${state.currentTime}&type_id=${state.currentSelect.id || 'all'}&page=${state.page}&page_size=5`)
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      state.loading = false
      state.list = state.list.concat(data.list)
      state.totalExpense = data.totalExpense.toFixed(2)
      state.totalIncome = data.totalIncome.toFixed(2)
      state.totalPage = data.totalPage
      if (state.page >= state.totalPage) state.finished = true
    }

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
      }
      getBillList()
    }

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;
      // 页数重制
      state.page = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.refreshing = true
      state.loading = true;
      onLoad()
    }
    // 类型弹窗开关
    const toggle = () => {
      popRef.value.toggle()
    }
    // 筛选类型
    const select = (item) => {
      state.currentSelect = item
      onRefresh()
    }
    // 月份弹窗开关
    const monthToggle = () => {
      popMonthRef.value.toggle()
    }
    // 筛选月份
    const selectMonth = (item) => {
      state.currentTime = item
      onRefresh()
    }
    // 添加账单弹窗开关
    const addToggle = () => {
      console.log('popAddRef', popAddRef)
      popAddRef.value.toggle()
    }

    return {
      ...toRefs(state),
      popRef,
      popMonthRef,
      popAddRef,
      toggle,
      monthToggle,
      addToggle,
      onLoad,
      onRefresh,
      select,
      selectMonth
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../config/custom.less');

.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 80px;
    background-color: @primary;
    color: #fff;
    font-size: 14px;
    padding: 20px 20px;
    z-index: 100;
    .type-wrap {
      background-color: #50ca84;
      display: inline-block;
      padding: 6px;
      border-radius: 4px;
      position: relative;
      align-self: baseline;
      .title {
        margin-right: 22px;
      }
      .title::after {
        content: '';
        position: absolute;
        top: 12px;
        bottom: 11px;
        right: 32px;
        width: 1px;
        background-color: #e9e9e9;
      }
    }
    .data-wrap {
      margin-top: 10px;
      font-size: 13px;
      .time {
        margin-right: 12px;
        .sort-down {
          font-size: 12px;
        }
      }
      .expense {
        margin-right: 10px;
      }
    }
  }
  .content-wrap {
    height: calc(~"(100% - 50px)");
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;
    padding: 10px;
    // padding-bottom: 50px;
  }
  .add {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    color: @primary;
  }
}
</style>
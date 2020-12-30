<template>
  <div class="data">
    <div class="total">
      <div class="time" @click="monthToggle">
        <span>{{ currentMonth }}</span>
        <van-icon name="notes-o" />
      </div>
      <div class="title">共支出</div>
      <div class="expense">¥{{ total_expense || 0 }}</div>
      <div class="income">共收入¥{{ total_income || 0 }}</div>
    </div>
    <div class="structure">
      <div class="head">
        <span class="title">收支构成</span>
        <div class="tab">
          <span @click="changeTotalType('expense')" class="expense" :class="{ active: totalType == 'expense' }">支出</span>
          <span @click="changeTotalType('income')" class="income" :class="{ active: totalType == 'income' }">收入</span>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in totalType == 'expense' ? expense_data : income_data" :key="item.type_id">
          <div class="left">
            <div class="type">
              <span :class="{ expense: totalType == 'expense', income: totalType == 'income' }">
                <i class="iconfont" :class="item.type_id ? typeMap[item.type_id].icon : 0" />
              </span>
              <span>{{ item.type_name }}</span>
            </div>
            <div class="progress">{{ Number((item.number / Number(totalType == 'expense' ? total_expense : total_income)) * 100).toFixed(2) }}%</div>
          </div>
          <div class="right">
            <div class="percent">
              <van-progress :percentage="Number((item.number / Number(totalType == 'expense' ? total_expense : total_income)) * 100)" stroke-width="6px" :show-pivot="false" track-color="#ffffff" color="#39be77" />
            </div>
            <div class="money">¥{{ Number(item.number).toFixed(2) || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="proportion">
      <div class="head">
        <span class="title">收支构成</span>
        <div class="tab">
          <span @click="changePieType('expense')" class="expense" :class="{ active: pieType == 'expense' }">支出</span>
          <span @click="changePieType('income')" class="income" :class="{ active: pieType == 'income' }">收入</span>
        </div>
      </div>
      <div id="proportion"></div>
    </div>
    <PopMonth ref="popMonthRef" @select="selectMonth" />
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, onUnmounted } from 'vue'
// 不要使用 import echarts from 'echarts' 因为 5.0 版本的 echarts 的接口已经变成了下面这样
// export { EChartsFullOption as EChartsOption, connect, disConnect, dispose, getInstanceByDom, getInstanceById, getMap, init, registerLocale, registerMap, registerTheme };
// import { init } from 'echarts'
import dayjs from 'dayjs'
import PopMonth from '../components/PopMonth.vue'
import axios from '../utils/axios'
import { typeMap } from '../utils'

let proportionChart = null
export default {
  name: 'Data',
  components: {
    PopMonth
  },
  setup() {
    const popMonthRef = ref(null)
    const state = reactive({
      typeMap,
      currentMonth: dayjs().format('YYYY-MM'),
      total_expense: 0,
      total_income: 0,
      expense_data: [],
      income_data: [],
      totalType: 'expense',
      pieType: 'expense',
    })

    onMounted(() => {
      getData()
    })

    onUnmounted(() => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose()
    })

    const getData = async () => {
      const { data } = await axios.get(`/bill/data?date=${state.currentMonth}`)

      // 总收支
      state.total_expense = data.total_expense
      state.total_income = data.total_income

      // 过滤支出和收入
      state.expense_data = data.total_data.filter(item => item.pay_type == 1).sort((a, b) => b.number - a.number) // 过滤出账单类型为支出的项
      state.income_data = data.total_data.filter(item => item.pay_type == 2).sort((a, b) => b.number - a.number) // 过滤出账单类型为收入的项
      setPieChart()
    }

    // 切换收支构成类型
    const changeTotalType = (type) => {
      state.totalType = type
    }

    // 切换饼图收支类型
    const changePieType = (type) => {
      state.pieType = type
      // 重绘饼图
      setPieChart()
    }

    // 绘制饼图方法
    const setPieChart = () => {
      if (window.echarts) {
        proportionChart = echarts.init(document.getElementById('proportion'));
        const _data = state.pieType == 'expense' ? state.expense_data : state.income_data
        proportionChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // 图例
            legend: {
                data: _data.map(item => item.type_name)
            },
            series: [
              {
                name: '支出',
                type: 'pie',
                radius: '55%',
                data: _data.map(item => {
                  return {
                    value: item.number,
                    name: item.type_name
                  }
                }),
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
        })
      }
    }
    
    // 月份弹窗开关
    const monthToggle = () => {
      popMonthRef.value.toggle()
    }

    const selectMonth = (item) => {
      state.currentMonth = item
      getData()
    }

    return {
      ...toRefs(state),
      popMonthRef,
      selectMonth,
      monthToggle,
      changeTotalType,
      changePieType
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('../config/custom.less');
  .data {
    min-height: 100%;
    background-color: #f5f5f5;
    .total {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0;
      margin-bottom: 10px;
      .time {
        position: relative;
        width: 96px;
        padding: 6px;
        background-color: #f5f5f5;
        color: @color-text-base;
        border-radius: 4px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        span:nth-of-type(1)::after {
           content: '';
          position: absolute;
          top: 9px;
          bottom: 8px;
          right: 28px;
          width: 1px;
          background-color: rgba(0, 0, 0, .5);
        }
        .van-icon-notes-o {
          font-size: 16px;
          color: @color-text-caption;
        }
      }
      .title {
        color: @primary;
        margin-bottom: 8px;
        font-size: 12px;
        font-weight: 500;
      }
      .expense {
        font-size: 24px;
        color: @primary;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .income {
        color: @color-text-caption;
        font-weight: 500;
      }
    }
    .structure {
      padding: 0 16px;
      background-color: #fff;
      margin-bottom: 10px;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        .title {
          font-size: 18px;
          color: @color-text-base;
        }
        .tab {
          span {
            display: inline-block;
            width: 40px;
            height: 24px;
            background-color: #f5f5f5;
            text-align: center;
            line-height: 24px;
            margin-left: 10px;
            border-radius: 4px;
          }
          .expense {
            &.active {
              background-color: rgba(57, 190, 119, 0.2);
              color: @primary;
            }
          }
          .income {
            &.active {
              background-color: rgba(236, 190, 37, 0.2);
              color: @text-warning;
            }
          }
        }
      }
      .content {
        .item {
          display: flex;
          height: 50px;
          align-items: center;
          .left {
            flex: 4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 10px;
            .type {
              display: flex;
              align-items: center;
              span:nth-of-type(1) {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                margin-right: 10px;
                color: #fff;
              }
              .expense {
                background-color: @primary;
              }
              .income {
                background-color: @text-warning;
              }
            }
          }
          .right {
            flex: 8;
            display: flex;
            align-items: center;
            .percent {
              width: 160px
            }
            .momey {
              width: 100px;
            }
          }
        }
      }
    }
    .proportion {
      background-color: #fff;
      padding: 12px;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        .title {
          font-size: 18px;
          color: @color-text-base;
        }
        .tab {
          span {
            display: inline-block;
            width: 40px;
            height: 24px;
            background-color: #f5f5f5;
            text-align: center;
            line-height: 24px;
            margin-left: 10px;
            border-radius: 4px;
          }
          .expense {
            &.active {
              background-color: rgba(57, 190, 119, 0.2);
              color: @primary;
            }
          }
          .income {
            &.active {
              background-color: rgba(236, 190, 37, 0.2);
              color: @text-warning;
            }
          }
        }
      }
      #proportion {
        width: 100%;
        height: 400px;
      }
    }
  }
</style>
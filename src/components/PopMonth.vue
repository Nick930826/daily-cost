<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    round
    :style="{ height: '46%' }"
  >
    <van-datetime-picker
      v-model="active"
      type="year-month"
      title="选择年月"
      :formatter="formatter"
      @confirm="choseMonth"
      @cancel="toggle"
    />
  </van-popup>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
export default {
  props: {
    select: Function
  },
  setup(props, ctx) {
    const state = reactive({
      show: false,
      active: new Date()
    })

    const toggle = () => {
      state.show = !state.show
    }

    const choseMonth = (item) => {
      console.log(item)
      state.active = item
      state.show = false
      ctx.emit('select', dayjs(item).format('YYYY-MM'))
    }

    const formatter = (type, val) => {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    }

    return {
      ...toRefs(state),
      toggle,
      choseMonth,
      formatter
    }
  }
}
</script>
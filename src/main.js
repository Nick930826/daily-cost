import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import 'lib-flexible/flexible'
import router from './router'
import { Button, Tabbar, TabbarItem, Form, Field, Icon, NavBar, Cell, CellGroup, Popup, List, PullRefresh, DatetimePicker, NumberKeyboard, Dialog, Progress, Rate, Divider } from 'vant';
import 'vant/lib/index.css'; // 全局引入样式
import './index.css'

const app = createApp(App)

// 全局过滤器
app.config.globalProperties.$filters = {
  transTime(date) {
    return dayjs(Number(date)).format('HH:mm')
  },
  transDay(value) {
    return dayjs(value).format('MM-DD')
  },
  transYDM(value) {
    return dayjs(value).format('YYYY-MM-DD HH:mm')
  }
}

app.use(router)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Form)
app.use(Field)
app.use(Button) // 注册组件
app.use(Icon)
app.use(NavBar)
app.use(CellGroup)
app.use(Cell)
app.use(Popup)
app.use(List)
app.use(PullRefresh)
app.use(DatetimePicker)
app.use(NumberKeyboard)
app.use(Dialog)
app.use(Progress)
app.use(Rate)
app.use(Divider)

app.mount('#app')

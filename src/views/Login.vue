<template>
  <Header :title="type == 'login' ? '登录' : '注册'" />
  <div class="auth">
    <img class="logo" src="//s.yezgea02.com/1606836859539/onpeice.png" alt="">
    <van-form class="form-wrap" @submit="onSubmit" v-if="type == 'login'">
      <div class="form">
        <van-field
          clearable
          v-model="username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账户' }]"
        />
        <van-field
          clearable
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px 0;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
        <p @click="chanegType('register')" class="change-btn">没有账号，前往注册</p>
      </div>
    </van-form>
    <van-form class="form-wrap" @submit="onSubmit" v-if="type == 'register'">
      <div class="form">
        <van-field
          clearable
          v-model="username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          clearable
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="verify"
        >
          <template #button>
            <VueImgVerify ref="verifyRef" />
          </template>
        </van-field>
      </div>
      <div style="margin: 16px 0;">
        <van-button round block :loading="loading" type="primary" native-type="submit">
          注册
        </van-button>
        <p @click="chanegType('login')" class="change-btn">登录已有账号</p>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import VueImgVerify from '../components/VueImageVerify.vue'
import Header from '../components/Header.vue'
import axios from '../utils/axios'
import { Toast } from 'vant'
import router from '../router'
export default {
  name: 'Login',
  components: {
    VueImgVerify,
    Header
  },
  setup() {
    const verifyRef = ref(null)
    const state = reactive({
      username: '',
      password: '',
      type: 'login', // 登录注册模式切换参数
      verify: '', // 验证码输入框输入的内容
      imgCode: '', // 生成的验证图片内的文字
      loading: false
    })

    // 提交登录 or 注册表单
    const onSubmit = async (values) => {
      try {
        if (state.type == 'login') {
          const { data } = await axios.post('/user/login', {
            username: state.username,
            password: state.password
          })
          localStorage.setItem('token', data.token)
          window.location.href = '/'
        } else {
          state.imgCode = verifyRef.value.imgCode || ''
          if (verifyRef.value.imgCode.toLowerCase() != state.verify.toLowerCase()) {
            console.log('verifyRef.value.imgCode', verifyRef.value.imgCode)
            Toast.fail('验证码错误')
            return
          }
          state.loading = true
          const { data } = await axios.post('/user/register', {
            username: state.username,
            password: state.password
          })
          Toast.success('注册成功')
          state.type = 'login'
          state.loading = false
        }
      } catch (error) {
        console.log(111)
        state.loading = false
      }
    }

    // 切换登录和注册两种模式
    const chanegType = (type) => {
      state.type = type
    }

    return {
      ...toRefs(state),
      onSubmit,
      chanegType,
      verifyRef
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('../config/custom.less');
  .auth {
    height: calc(~"(100% - 46px)");
    padding: 30px 20px 0 20px;
    background: @primary-bg;
    .logo {
      width: 150px;
      display: block;
      margin: 0 auto;
      margin-bottom: 30px;
    }
    .form-wrap {
      .form {
        border-radius: 10px;
        overflow: hidden;
        .van-cell:first-child {
          padding-top: 20px;
        }
        .van-cell:last-child {
          padding-bottom: 20px;
        }
      }
    }
    .change-btn {
      text-align: center;
      margin: 10px 0;
      color: @link-color;
      font-size: 14px;
    }
  }
</style>
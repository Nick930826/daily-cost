<template>
  <div class="account">
    <Header title="账户安全" />
    <van-cell title="密码修改" @click="visible = true" is-link />
    <van-button class="logout" type="primary" size="large" @click="logout">退出登录</van-button>
    <van-dialog class="modal-pass" v-model:show="visible" @confirm="handleOk" title="修改密码" show-cancel-button>
      <van-cell-group>
        <van-field
          v-model="oldPass"
          label="原密码"
          clearable
          placeholder="请输入原密码"
        />
        <van-field
          v-model="newPass"
          label="新密码"
          clearable
          placeholder="请输入新密码"
        />
        <van-field
          v-model="newPass2"
          label="确认密码"
          clearable
          placeholder="再次输入确认"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import Header from '../components/Header.vue'
import axios from '../utils/axios'

export default {
  name: 'Account',
  components: {
    Header
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      visible: false,
      oldPass: '',
      newPass: '',
      newPass2: ''
    })

    // 修改密码
    const handleOk = async () => {
      if (state.newPass != state.newPass2) {
        Toast.fail('新密码不一致')
        return
      }
      const { data } = axios.post('/user/modify_pass', {
        old_pass: state.oldPass,
        new_pass: state.newPass,
        new_pass2: state.newPass2
      })

      Toast.success('修改成功')
    }

    // 退出登录
    const logout = () => {
      localStorage.removeItem('token')
      router.push({ path: '/login' })
    }

    return {
      ...toRefs(state),
      handleOk,
      logout
    }
  }
}
</script>

<style lang="less">
  @import url('../config/custom.less');
  .account {
    min-height: 100%;
    background-color: #f5f5f5;
    
    .logout {
      display: block;
      margin: 0 auto;
      width: 90%;
      margin-top: 20px;
      background-color: @primary;
      border-color: @primary;
    }
    .modal-pass {
      .van-dialog__header {
        padding: 10px 0;
      }
      .van-dialog__content {
        .van-cell-group {
          padding: 20px;
        }
      }
    }
  }
</style>
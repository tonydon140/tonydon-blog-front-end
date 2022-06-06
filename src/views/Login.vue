<!-- 登录注册 -->
<template>
  <div>
    <div class="container">
      <h1 class="loginTitle">TonyDon 后台登陆</h1>
      <div>
        <div class="loginBox">
          <div class="lr-title">
            <h1>登录</h1>
          </div>
          <el-alert
              v-show="loginInfo.error"
              :title="loginInfo.title"
              type="error"
              show-icon :closable="false">
          </el-alert>
          <el-input
              type="text"
              placeholder="用户名"
              v-model="user.username">
          </el-input>

          <el-input
              type="password"
              placeholder="密码"
              @keyup.enter.native="userLogin"
              v-model="user.password">
          </el-input>

          <h3><a href="">忘记密码？</a></h3>
          <div class="lr-btn tcolors-bg" @click="userLogin">登录</div>
          <div class="otherLogin">
<!--            <a href="javascript:void(0)"><i class="fa fa-fw fa-wechat"></i></a>-->
<!--            <a href="javascript:void(0)"><i class="fa fa-fw fa-qq"></i></a>-->
<!--            <a href="javascript:void(0)"><i class="fa fa-fw fa-weibo"></i></a>-->
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script setup>
import {login} from '@/api/user.js'
import {setToken} from '@/utils/token.js'
import {reactive} from "vue";
import {useStore} from "vuex";
import {useRoute} from 'vue-router'
import router from "@/router";
import {ElMessage} from "element-plus";
import MyFooter from "@/components/MyFooter";

let store = useStore();
let route = useRoute();

// 登录错误提示信息
let loginInfo = reactive({
  error: false,
  title: '用户名或密码错误',
})

// 用户信息
let user = reactive({
  username: '',  // 用户名
  password: ''   // 密码
})

// 用户登陆
function userLogin() {
  login(user.username, user.password).then((response) => {
    // 登录成功记录token和用户信息，登录失败给对应提示
    setToken(response.token)
    store.state.userInfo = response.userInfo;
    router.push("/admin");
  }).catch(() => {
    ElMessage.error("用户名或密码错误");
  })
}
</script>

<style scoped>
.my-footer{
  position: absolute;
  bottom: 10px;
}

/*登录注册标题*/
.loginTitle {
  text-align: center;
  font-size: 26px;
  padding-top: 50px;
  margin-bottom: 20px;
}

.loginBox, .registerBox {
  background: #fff;
  padding: 40px;
  max-width: 320px;
  margin: 0 auto;
}

.loginBox {
  padding-bottom: 0;
}

.lr-title {
  position: relative;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}

.lr-title h1 {
  font-size: 24px;
  color: #666;
  font-weight: bold;
  /*width:50%;*/
}

.lr-title p {
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 0;
  top: 0;
}

.lr-btn {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}

.loginBox .el-input, .registerBox .el-input {
  margin-bottom: 20px;
}

.loginBox .el-alert, .registerBox .el-alert {
  top: -18px;
  background-color: #888;
}

.loginBox .el-input input, .registerBox .el-input input {
  border-radius: 4px;
}

.loginBox h3, .registerBox h3 {
  text-align: right;
  margin-bottom: 20px;
}

.loginBox h3 a, .registerBox h3 a {
  font-size: 13px;
  color: #999;
}

.loginBox .otherLogin {
  max-width: 320px;
  padding: 30px 40px;
  background: #ddd;
  text-align: center;
  margin-left: -40px;
  margin-right: -40px;
  visibility: hidden;
}

.loginBox .otherLogin p {
  margin-bottom: 20px;
  font-size: 16px;
}

.loginBox .otherLogin a i {
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  border-radius: 50%;
  color: #fff;
  margin: 0 10px;
}

.loginBox .otherLogin a i.fa-wechat {
  background: #7bc549;
}

.loginBox .otherLogin a i.fa-qq {
  background: #56b6e7;
}

.loginBox .otherLogin a i.fa-weibo {
  background: #ff763b;
}

/*登录成功*/
.registerSuc {
  padding: 40px;
  margin: 0 auto;
}

.registerSuc .sucIcon {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 60px;
}

.registerSuc .sucContent {
  line-height: 1.5;
  font-size: 15px;
  text-align: center;
}

.registerSuc .sucContent p {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}

.registerSuc .sucContent .lastbtn {
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.registerSuc .sucContent .el-icon-close {
  font-size: 13px;
}
</style>

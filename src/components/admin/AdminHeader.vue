<template>
  <div class="has-login">
    <router-link class="userinfo" :to="'/admin/user/'+store.state.userInfo.id">
      您好，{{ store.state.userInfo.nickname }}
    </router-link>
    <span class="logout" @click="userLogout">退出登录</span>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {ElMessageBox} from "element-plus";
import {getUserInfoByToken, logout} from "@/api/user";
import {removeToken} from "@/utils/token";
import router from "@/router";

let store = useStore();
// 如果 store 中没有用户信息，就从后台获取用户信息
if (JSON.stringify(store.state.userInfo) === '{}') {
  getUserInfoByToken().then((res) => {
    store.state.userInfo = res;
  })
}

// 退出登陆
function userLogout() {
  ElMessageBox.confirm('是否确认退出?', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logout().then(() => {
      // 删除token和用户信息
      removeToken();
      store.state.userInfo = {}
      router.push("/login");
    }).catch(()=>{
      removeToken();
    })
  })
}
</script>

<style scoped>
.has-login {
  text-align: right;
}

.logout{
  margin-left: 20px;
  cursor: pointer;

}
.userinfo:hover, .logout:hover{
  color: whitesmoke;
}
</style>
<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="has-login">
            <router-link to="/admin/user-info">您好，{{ store.state.userInfo.nickname }}</router-link>
            <el-image style="{height: 10px; width:10px;}" :src="store.state.userInfo.avatar" fit="contain"/>
            <a href="javascript:void(0);" @click="userLogout">退出登录</a>
          </div>
        </el-header>

        <el-container>

          <el-aside width="200px">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :router="true"
            >
              <el-menu-item index="/admin/home">
                <el-icon>
                  <house/>
                </el-icon>
                <span>首页</span>
              </el-menu-item>

              <!-- 文章菜单 -->
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <document/>
                  </el-icon>
                  <span>文章</span>
                </template>

                <el-menu-item index="/admin/all-article">
                  <el-icon>
                    <list/>
                  </el-icon>
                  <span>所有文章</span>
                </el-menu-item>

                <el-menu-item index="/admin/edit">
                  <el-icon>
                    <document-add/>
                  </el-icon>
                  <span>写文章</span>
                </el-menu-item>

                <el-menu-item index="/admin/all-category">
                  <el-icon>
                    <list/>
                  </el-icon>
                  <span>分类</span>
                </el-menu-item>

              </el-sub-menu>

              <el-menu-item index="/admin/comment">
                <el-icon>
                  <ChatLineSquare/>
                </el-icon>
                <span>评论</span>
              </el-menu-item>
              <el-menu-item index="/admin/friend-link">
                <el-icon>
                  <ChatLineSquare/>
                </el-icon>
                <span>友链</span>
              </el-menu-item>

              <el-sub-menu index="4">
                <template #title>
                  <el-icon>
                    <user></user>
                  </el-icon>
                  <span>用户</span>
                </template>

                <el-menu-item index="/admin/all-user">
                  <el-icon>
                    <list/>
                  </el-icon>
                  <span>所有用户</span>
                </el-menu-item>

                <el-menu-item index="/admin/user-info">
                  <el-icon>
                    <document-add/>
                  </el-icon>
                  <span>用户信息</span>
                </el-menu-item>

              </el-sub-menu>

            </el-menu>
          </el-aside>

          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import {
  Document, House,
  ChatLineSquare,
  User, DocumentAdd, List
} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus";
import {logout, getUserInfoByToken} from "@/api/user";
import router from "@/router";
import {removeToken} from "@/utils/token";
import {useStore} from "vuex";

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
    })
  })
}
</script>

<style scoped>
.el-header {
  height: 25px;
  background-color: #3cb7ef;
}

.el-menu {
  height: calc(100vh - 25px);
}

.has-login {
  text-align: right;
  /*position: relative;*/
  /*min-width: 80px;*/
  /*cursor: pointer;*/
}
</style>
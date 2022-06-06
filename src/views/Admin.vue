<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <admin-header></admin-header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <admin-left></admin-left>
          </el-aside>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
            <el-footer height="25">
              <my-footer></my-footer>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLeft from "@/components/admin/AdminLeft";
import MyFooter from "@/components/MyFooter";

</script>

<style scoped>
.el-header {
  height: 25px;
  background-color: #3cb7ef;
}
/*.el-main {*/
/*  height: calc(100vh - 25px);*/
/*}*/
</style>
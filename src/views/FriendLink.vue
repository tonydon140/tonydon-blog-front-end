<!-- 友情链接 -->
<template>
  <div>
    <Header></Header>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <Friends></Friends>
          <apply-friend-link></apply-friend-link>
        </el-col>
        <el-col :sm="24" :md="8">
          <RightList></RightList>
        </el-col>
      </el-row>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script setup>
import Header from '../components/user/Header.vue'
import Friends from '../components/user/Friends.vue'
import RightList from '../components/user/RightList.vue'
import MyFooter from "@/components/MyFooter";
import ApplyFriendLink from "@/components/admin/ApplyFriendLink";

</script>

<style>

</style>

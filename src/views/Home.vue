<!-- 首页 -->
<template>
  <div>
    <Header></Header>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <ArticleList></ArticleList>
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
import ArticleList from '../components/user/ArticleList.vue'
import RightList from '../components/user/RightList.vue'
import MyFooter from "@/components/MyFooter";
</script>

<style>

</style>

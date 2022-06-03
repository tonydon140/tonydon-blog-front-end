<!-- 文章详情 -->
<template>
  <div>
    <Header></Header>
    <div class="container" id="detail">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <ArticleDetail></ArticleDetail>
          <Message></Message>
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
import Header from '../components/Header.vue'
import RightList from '../components/RightList.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import Message from '../components/Message.vue'
import MyFooter from "@/components/MyFooter";
import {onMounted} from 'vue'

onMounted(() => {
  let anchor = document.querySelector("#detail");
  // console.log(anchor,anchor.offsetTop);
  let top = anchor.offsetTop - 60;
  document.body.scrollTop = top;
  // Firefox
  document.documentElement.scrollTop = top;
  // Safari
  window.pageYOffset = top;
});

</script>

<style>
</style>

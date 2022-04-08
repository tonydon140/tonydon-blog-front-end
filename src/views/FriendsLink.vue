<!-- 友情链接 -->
<template>
  <div>
    <Header></Header>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <Friends></Friends>
<!--          <Message></Message>-->
          <el-form>

          </el-form>
        </el-col>
        <el-col :sm="24" :md="8">
          <RightList></RightList>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Friends from '../components/Friends.vue'
import RightList from '../components/RightList.vue'
import Message from '../components/Message.vue'

</script>

<style>

</style>

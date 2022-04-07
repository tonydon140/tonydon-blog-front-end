<template>
  <div>
    <el-table :data="data.articleList" stripe style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="title" label="标题"  sortable/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column prop="createName" label="作者"/>
      <el-table-column prop="categoryName" label="分类"/>
      <el-table-column prop="viewCount" label="访问量"/>
      <el-table-column prop="createTime" label="日期" sortable/>
    </el-table>
    <el-pagination
        v-model:currentPage="data.currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="data.total"
    />
  </div>
</template>

<script setup>
import {getArticleListForAdmin} from "@/api/article";
import {reactive} from "vue";


let data = reactive({
  articleList: [],
  currentPage: 1,
  total: 10,
})

function getArticleList() {
  getArticleListForAdmin().then((res) => {
    data.articleList = res;
  })
}

getArticleList();

</script>

<style scoped>

</style>
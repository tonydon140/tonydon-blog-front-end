<template>
  <div>
    <el-table :data="data.articleList" stripe style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="title" label="标题">
<!--        todo 样式细节-->
        <template #default="scope">
          <div v-if="scope.row.status === '0'">
            <router-link :to="'/admin/edit/' + scope.row.id">{{ scope.row.title }}</router-link>
          </div>
          <div v-else>
            <router-link :to="'/admin/edit/' + scope.row.id">{{ scope.row.title }} —— 草稿</router-link>
          </div>

        </template>
      </el-table-column>

      <el-table-column prop="createName" label="作者"/>
      <el-table-column prop="categoryName" label="分类"/>
      <el-table-column prop="viewCount" label="访问量"/>
      <el-table-column prop="createTime" label="发布时间" sortable/>
      <el-table-column prop="updateTime" label="最后更新时间"/>
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
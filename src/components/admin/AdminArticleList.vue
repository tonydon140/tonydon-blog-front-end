<template>
  <div>
    <div class="header">
      <span>文章</span>
      <el-button type="primary" @click="$router.push('/admin/edit')">写文章</el-button>
      <!--      todo -->
      <!--      <el-button type="danger" @click="$router.push('/admin/edit')">删除选择的文章</el-button>-->
    </div>


    <el-table :data="data.articleList" stripe style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="title" label="标题">
        <!--        todo 样式细节-->
        <template #default="scope">
          <div v-if="scope.row.isPublish === '0'">
            <router-link :to="'/admin/edit/' + scope.row.id">{{ scope.row.title }} —— 草稿</router-link>
          </div>
          <div v-else>
            <router-link :to="'/admin/edit/' + scope.row.id">{{ scope.row.title }}</router-link>
          </div>

        </template>
      </el-table-column>

      <el-table-column prop="updateName" label="作者"/>
      <el-table-column prop="categoryName" label="分类"/>
      <el-table-column prop="viewCount" label="访问量"/>
      <el-table-column prop="publishTime" label="发布时间" sortable/>
      <el-table-column prop="updateTime" label="最后更新时间"/>
      <el-table-column label="操作">
        <template #default="scope">
          <!--          todo-->
          <el-button type="danger" size="small" @click="deleteArticle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
import {getArticleListForAdmin, removeArticleById} from "@/api/article";
import {reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";


let data = reactive({
  articleList: [],
  currentPage: 1,
  total: 10,
})

function refreshArticleList() {
  getArticleListForAdmin().then((res) => {
    data.articleList = res;
  })
}

refreshArticleList();

function deleteArticle(id) {
  ElMessageBox.confirm("删除文章无法找回，确定要删除吗？").then(() => {
    removeArticleById(id).then(() => {
      ElMessage.success("删除成功！");
      refreshArticleList();
    }).catch();
  }).catch();
}


</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.header span {
  font-size: 18px;
  margin-right: 20px;
}

</style>
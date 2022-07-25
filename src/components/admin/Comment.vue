<template>
  <div>
    <el-table :data="data.commentList" stripe style="width: 85%">
      <el-table-column prop="id" label="id" width="100"/>
      <el-table-column prop="nickname" label="作者">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-avatar :src="'/img/avatar/' + scope.row.avatar">

            </el-avatar>
            <!--            <el-image-->
            <!--                class="el-avatar&#45;&#45;circle"-->
            <!--                :src="'/img/avatar/' + scope.row.avatar">-->
            <!--            </el-image>-->
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评论"/>
      <el-table-column prop="articleTitle" label="文章"/>
      <el-table-column prop="createTime" label="发表于" sortable/>

      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">
            <el-icon>
              <close-bold/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
        v-model:currentPage="data.pageNum"
        :page-size="data.pageSize"
        layout="total, prev, pager, next"
        :total="data.total"
    />
  </div>
</template>

<script setup>
import {findCommentPageAdmin, removeComment} from "@/api/comment";
import {reactive} from "vue";
import {CloseBold} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";

let data = reactive({
  commentList: [],
  pageNum: 1,
  pageSize: 20,
  total: 0
});


// 删除评论
function handleDelete(comment) {
  ElMessageBox.confirm("此操作不可逆！！！", "您确定要删除吗？", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    removeComment(comment.id).then(() => {
      ElMessage.success("删除成功！");
      refreshCommentList();
    }).catch(() => {
      ElMessage.error("删除失败！");
    })
  }).catch(() => {
  })
}

function refreshCommentList() {
  findCommentPageAdmin(data.pageNum, data.pageSize).then(value => {
    data.commentList = value.rows;
    data.total = value.total;
  })
}

refreshCommentList();

</script>

<style scoped>

</style>
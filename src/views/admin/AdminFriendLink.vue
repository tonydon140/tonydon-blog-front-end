<template>
  <div>
    <el-table :data="data.friendsLinkList" stripe>
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="logo" label="Logo"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="status" label="描述">
        <template #default="scope">
          {{ scope.row.status === '0' ? '未通过' : scope.row.status === '1' ? '已审核' : '未审核' }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">

          <el-button v-if="scope.row.status==='2'" size="small" @click="passVerification(scope.row.id)">
            通过审核
          </el-button>
          <el-button v-else size="small" type="danger" @click="deleteFriendLink(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import {reactive} from "vue";
import {
  getAllFriendLink,
  passFriendLinkById,
  removeFriendLinkById
} from "@/api/friends-link";

let data = reactive({
  friendsLinkList: []
})

function refreshFriendLink() {
  getAllFriendLink().then(res => {
    data.friendsLinkList = res;
  })
}

refreshFriendLink();


function passVerification(id) {
  console.log(id)
}

function deleteFriendLink(id) {
  console.log(id)
}


</script>

<style scoped>

</style>
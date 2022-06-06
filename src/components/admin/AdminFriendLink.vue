<template>
  <div>

    <div class="apply-friend-link">
      <el-button @click="data.friendsLinkDialog = true">新增友链</el-button>
    </div>

    <el-table :data="data.friendsLinkList" stripe>
      <el-table-column prop="id" label="编号" width="100"/>
      <el-table-column prop="name" label="名称" width="100"/>
      <el-table-column label="Logo" width="100">
        <template #default="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.logo" fit="contain">
            <template #viewer>
              <span>{{scope.row.logo}}</span>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column  label="地址">
        <template #default="scope">
          <a :href="scope.row.address" target="_blank" >{{scope.row.address}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="status" label="描述" width="100">
        <template #default="scope">
          {{ scope.row.status === '0' ? '未通过' : scope.row.status === '1' ? '已审核' : '未审核' }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">

          <el-button v-if="scope.row.status==='2'" size="small" @click="passVerification(scope.row.id)">
            通过审核
          </el-button>
          <el-button size="small" type="danger" @click="deleteFriendLink(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="data.friendsLinkDialog" title="申请友链" width="600px">
      <el-form :model="friendsLinkForm" label-width="80px">

        <el-form-item label="网站名称" prop="name">
          <el-input
              :maxlength="24"
              type="text"
              placeholder="网站名称"
              v-model="friendsLinkForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label="网站地址" prop="address">
          <el-input
              :maxlength="128"
              type="text"
              placeholder="网站链接"
              v-model="friendsLinkForm.address">
          </el-input>
        </el-form-item>

        <el-form-item label="网站Logo" prop="logo">
          <el-input
              :maxlength="128"
              type="text"
              placeholder="Logo链接"
              v-model="friendsLinkForm.logo">
          </el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
              :maxlength="200"
              type="text"
              placeholder="描述"
              v-model="friendsLinkForm.description">
          </el-input>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.friendsLinkDialog = false">取消</el-button>
          <el-button type="primary" @click="apply()" :loading="friendsLinkForm.loading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {
  applyFriendsLink,
  getAllFriendLink,
  passFriendLinkById,
  removeFriendLinkById
} from "@/api/friend-link";
import {ElMessage} from "element-plus";

let data = reactive({
  friendsLinkList: [],
  friendsLinkDialog: false
})

// 友链表单
let friendsLinkForm = reactive({
  loading: false,
  name: '',
  logo: '',
  description: '',
  address: ''
})

let regList = {
  logoReg: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/g,
  addressReg: /^((https|http|ftp|rtsp|mms)?:\/\/)\S+/g,
}

function refreshFriendLink() {
  getAllFriendLink().then(res => {
    data.friendsLinkList = res;
  })
}

refreshFriendLink();

// 通过审核
function passVerification(id) {
  passFriendLinkById(id).then(() => {
    ElMessage.success("通过成功");
  }).catch(()=>{
    ElMessage.error("审核失败，请检查日志");
  }).finally(()=>{
    refreshFriendLink();
  })
}

// 删除友链
function deleteFriendLink(id) {
  removeFriendLinkById(id).then(() => {
    ElMessage.success("删除成功");
  }).catch(()=>{
    ElMessage.error("删除失败，请检查日志");
  }).finally(()=>{
    refreshFriendLink();
  })
}

function apply() {
  // 1. 校验名称
  if (friendsLinkForm.name.trim() === '') {
    ElMessage.error("网站名称不能为空");
    return;
  }

  // 2. 校验地址
  if (!friendsLinkForm.address.match(regList.addressReg)) {
    ElMessage.error("网站地址格式不正确");
    return;
  }

  // 3. 校验Logo
  if (!friendsLinkForm.logo.match(regList.logoReg)) {
    ElMessage.error("Logo图片格式不正确");
    return;
  }

  // 4. 校验描述
  if (friendsLinkForm.description.trim() === '') {
    ElMessage.info("简单描述一下吧");
    return;
  }

  // 5. 申请友链
  friendsLinkForm.loading = true;
  applyFriendsLink(friendsLinkForm).then(value => {
    data.friendsLinkDialog = false;
    friendsLinkForm.loading = false;
    ElMessage.success("申请成功")

  }).catch(reason => {
    data.friendsLinkDialog = false;
    friendsLinkForm.loading = false;
    ElMessage.error("该链接已经申请了，请勿重复申请！");
  })
}

</script>

<style scoped>
.apply-friend-link {
  margin-bottom: 20px;
}
</style>
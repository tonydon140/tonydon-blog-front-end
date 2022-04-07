<template>
  <div>
    <h3>欢迎来到后台</h3>
    <el-button @click="test">测试按钮</el-button>
    <el-upload
        class="avatar-uploader"
        action="http://localhost:6515/admin/upload/"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {hasLogin} from "@/api/user";
import {inject, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/token";

// 请求头
let headers = reactive({
  token: getToken()
})

let imageUrl = ref('');


function test() {

}

function handleAvatarSuccess(res) {
  console.log(res)
  imageUrl.value = res.data;
}

function beforeAvatarUpload(file) {
  console.log(file)
  if (file.type !== 'image/png') {
    ElMessage.error('Avatar picture must be PNG format!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
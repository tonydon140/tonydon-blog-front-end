<template>
  <div>
    <h3>欢迎来到后台</h3>
    <el-button @click="test">测试按钮</el-button>
  </div>
</template>

<script setup>
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
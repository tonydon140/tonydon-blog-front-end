<template>
  <div class="apply-friend-link">
    <h2 class="headline-2">申请友链</h2>
    <el-form :model="friendLinkForm">
      <el-row :gutter="20">

        <el-col :span="10">
          <el-form-item>
            <el-input type="text" v-model="friendLinkForm.name" placeholder="网站名称">
              <template #prepend>
                <el-icon>
                  <user-filled/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item>
            <el-input type="text" v-model="friendLinkForm.address" placeholder="网站链接：http://xxx">
              <template #prepend>
                <el-icon>
                  <promotion/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item>
            <el-input type="text" v-model="friendLinkForm.description" placeholder="个性签名">
              <template #prepend>
                <el-icon>
                  <reading/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item>
            <el-input type="text" v-model="friendLinkForm.logo" placeholder="网站logo图片链接：http://xxx.png/jpg">
              <template #prepend>
                <el-icon><PictureFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 申请按钮 -->
      <el-row>
        <el-col style="text-align: right">
          <el-button type="primary" @click="apply()" :loading="friendLinkForm.loading">申请友链</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script setup>
import {
  UserFilled, PictureFilled, Reading, Promotion
} from "@element-plus/icons-vue";
import {reactive} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import {applyFriendsLink} from "@/api/friend-link";


let friendLinkForm = reactive({
  name: '',
  logo: '',
  address: '',
  description: '',
  loading: false,
});

let regList = {
  logoReg: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/g,
  addressReg: /^((https|http|ftp|rtsp|mms)?:\/\/)\S+/g,
}

function apply() {
  // 1. 校验名称
  if (friendLinkForm.name.trim() === '') {
    ElMessage.error("网站名称不能为空");
    return;
  }

  // 2. 校验地址
  if (!friendLinkForm.address.match(regList.addressReg)) {
    ElMessage.error("网站地址格式不正确");
    return;
  }

  // 3. 校验Logo
  if (!friendLinkForm.logo.match(regList.logoReg)) {
    ElMessage.error("Logo图片格式不正确");
    return;
  }

  // 4. 校验描述
  if (friendLinkForm.description.trim() === '') {
    ElMessage.info("简单描述一下吧");
    return;
  }

  // 5. 申请友链
  friendLinkForm.loading = true;
  applyFriendsLink(friendLinkForm).then(value => {
    friendLinkForm.loading = false;
    ElNotification({
      title: '成功！',
      type: 'success',
      message: '您的友链已提交到后台进行审核，审核通过后将在前台展示！',
      duration: 0,
    });
  }).catch(reason => {
    friendLinkForm.loading = false;
    ElMessage.error("该链接已经申请了，请勿重复申请！");
  });
}
</script>

<style scoped>
.apply-friend-link {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
}


</style>
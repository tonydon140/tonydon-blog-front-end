<!-- 友情链接模块 -->
<template>
  <div class="friends-box">
    <h1>友链</h1>
    <el-row>
      <el-col :span="12" class="tf-item" v-for="item in data.friendsLink" :key="item.id">
        <a :href="item.address" target="_blank">
          <img :src="item.logo ? item.logo:'/img/tou.jpg'" alt="">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
        </a>
      </el-col>
    </el-row>

    <div class="apply-friend-link">
      <el-button @click="data.friendsLinkDialog = true">我也要申请友链</el-button>
    </div>

    <el-dialog v-model="data.friendsLinkDialog" title="申请友链" width="600px">
      <el-form
          ref="friendsLinkFormRef"
          :rules="rules"
          :model="friendsLinkForm"
          label-width="80px">

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
          <el-button type="primary" @click="apply(friendsLinkFormRef)" :loading="friendsLinkForm.loading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {getFriendsLinkList, applyFriendsLink} from '@/api/friends-link.js'
import {useStore} from "vuex";
import {getCurrentInstance, reactive, ref} from "vue";
import {ElMessage} from "element-plus";


let store = useStore();
let data = reactive({
  friendsLink: {},
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

// 获得友链
function getList() {
  getFriendsLinkList().then(value => {
    data.friendsLink = value;
  })
}

getList();


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
.friends-box {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
}

.friends-box h1 {
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
}

.friends-box .tf-item {
  transition: all 0.3s ease-out;
  border-radius: 5px;
  position: relative;
}

.friends-box .tf-item:hover {
  background: rgba(230, 244, 250, .5);
}

.friends-box .tf-item a {
  display: block;
  padding: 0 10px 0 90px;
  height: 90px;
}

.friends-box .tf-item a img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  object-fit: cover;
}

.friends-box .tf-item a h4 {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  padding-top: 15px;
  font-weight: bold;
}

.friends-box .tf-item a p {
  margin: 10px 0;
  font-size: 12px;
  line-height: 24px;
  color: #999;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.friends-box .apply-friend-link {
  margin-top: 12px;
  /*text-align: center;*/
}
</style>

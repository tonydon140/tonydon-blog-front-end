<!-- 友情链接模块 -->
<template>
  <div class="friends-box">
    <h1>友链</h1>
    <el-row>
      <el-col :span="12" class="tf-item" v-for="item in data.friendsLink" :key="item.id">
        <a :href="item.address" target="_blank">
          <img :src="item.logo?item.logo:'/img/tou.jpg'" :onerror="store.state.errorImg" alt="">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
        </a>
      </el-col>
    </el-row>
    <div class="apply-friend-link">
      <el-button @click="data.friendsLinkDialog = true">我也要申请友链</el-button>
    </div>

    <el-dialog v-model="data.friendsLinkDialog" title="申请友链" width="600px">
      <el-form :model="friendsLinkForm" label-width="80px">

        <el-form-item label="网站名称">
          <el-input
              type="text"
              placeholder="网站名称"
              v-model="friendsLinkForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label="网站地址">
          <el-input
              type="text"
              placeholder="网站地址"
              v-model="friendsLinkForm.description">
          </el-input>
        </el-form-item>

        <el-form-item label="网站Logo">

        </el-form-item>

        <el-form-item label="描述">
          <el-input
              type="text"
              placeholder="描述"
              v-model="friendsLinkForm.description">
          </el-input>
        </el-form-item>


      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.friendsLinkDialog = false">取消</el-button>
          <el-button type="primary" @click="addFriendsLink" :loading="friendsLinkForm.loading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {getAllLink} from '@/api/link.js'
import {useStore} from "vuex";
import {reactive} from "vue";

let store = useStore();
let data = reactive({
  friendsLink: {},
  friendsLinkDialog: false
})

let friendsLinkForm = reactive({
  loading: false
})

// 获得友链
function getList() {
  getAllLink().then((res) => {
    data.friendsLink = res
  })
}

getList();

function addFriendsLink(){

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
.friends-box .apply-friend-link{
  margin-top: 12px;
  /*text-align: center;*/
}
</style>

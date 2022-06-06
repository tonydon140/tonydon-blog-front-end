<!-- 友情链接模块 -->
<template>
  <div class="friends-box">
    <h2 class="headline-2">友链</h2>
    <el-row>
      <el-col :span="12" class="tf-item" v-for="item in data.friendsLink" :key="item.id">
        <a :href="item.address" target="_blank">
          <img :src="item.logo ? item.logo:'/img/tou.jpg'" alt="">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getFriendsLinkList} from '@/api/friend-link.js'
import {reactive} from "vue";

let data = reactive({
  friendsLink: {}
})

// 获得友链
function getList() {
  getFriendsLinkList().then(value => {
    data.friendsLink = value;
  })
}

getList();
</script>

<style scoped>
.headline-2{
  padding: 15px 0;
  font-size: 24px;
  font-weight: bold;
}

.friends-box {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
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
</style>

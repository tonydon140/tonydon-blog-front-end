<!-- 文章详情模块 -->
<template>
  <div class="detailBox tcommonBox">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(info.article.createTime,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(info.article.createTime,'date')"></span>
            </span>
    <header>
      <h1>
        <router-link :to="'/article/' + info.article.id" target="_blank">
          {{ info.article.title }}
        </router-link>
      </h1>
      <h2>
        <i class="fa fa-fw fa-user"></i>发表于 <span>{{ info.article.createTime }}</span> •
        <i class="fa fa-fw fa-eye"></i>{{ Number(info.article.viewCount) }} 次围观 •
      </h2>
      <div class="ui label">
        <router-link :to="'/category/'+info.article.categoryId">{{ info.article.categoryName }}</router-link>
      </div>
    </header>

    <MdEditor :model-value="info.article.content" :preview-only="true"></MdEditor>


    <div class="donate">
      <div class="donate-word">
        <span @click="info.isDonate=!info.isDonate">赞赏</span>
      </div>
      <el-row :class="info.isDonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="info.article.wechat_image ? info.article.wechat_image : '/img/wx_pay.png'"
                 :onerror="store.state.errorImg"/>
            <span>微信扫一扫，向我赞赏</span>
          </div>
        </el-col>
        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="info.article.alipay_image ? info.article.alipay_image : '/img/ali_pay.jpg'"
                 :onerror="store.state.errorImg" alt=""/>
            <span>支付宝扫一扫，向我赞赏</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import initDate from '@/utils/server'
import {getArticle, updateViewCount} from '@/api/article.js'
import MdEditor from 'md-editor-v3'
import {reactive, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import 'md-editor-v3/lib/style.css'
import router from "@/router";
import {ElMessage} from "element-plus";

let route = useRoute()
let store = useStore()
let info = reactive({
  aid: 1,          // 文章ID
  isDonate: true,   // 打开赞赏控制,
  article: {},    // 返回详情数据
})

// 年月日的编辑
function showInitDate(date, full) {
  return initDate(date, full);
}

function getArticleDetail() {
  getArticle(info.aid).then((response) => {
    info.article = response
  })
}

function routeChange() {
  // 1. 判断当前路由是否是文章页面
  if (route.path.startsWith("/article")) {
    let id = Number(route.params.aid);
    // 2. 如果 id 格式错误，返回上一页
    if (isNaN(id) || id <= 0) {
      router.back();
      return;
    }
    // 3. 设置文章 id，获取文章详情，更新访问量
    info.aid = id;
    getArticleDetail()
    updateViewCount(info.aid)
  }
}

routeChange()
watch(route, routeChange)

</script>

<style lang="less">


.detailBox .viewdetail {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
}

/*分享图标*/
.dshareBox {
  margin-top: 40px;
  position: relative;
}

.dshareBox a {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  font-size: 18px;
  border-radius: 50%;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  margin: 4px;
  background: #fff;
  transition: background 0.6s ease-out;
}

.dshareBox .ds-weibo {
  border: 1px solid #ff763b;
  color: #ff763b;
}

.dshareBox .ds-weibo:hover {
  color: #fff;
  background: #ff763b;
}

.dshareBox .ds-qq {
  color: #56b6e7;
  border: 1px solid #56b6e7;
}

.dshareBox .ds-qq:hover {
  color: #fff;
  background: #56b6e7;
}

.dshareBox .ds-wechat {
  color: #7bc549;
  border: 1px solid #7bc549;
}

.dshareBox .ds-wechat:hover {
  color: #fff;
  background: #7bc549;
}

.dshareBox .ds-wechat:hover .wechatShare {
  opacity: 1;
  visibility: visible;
}

.detailBox .bdshare-button-style0-32 a {
  float: none;
  background-image: none;
  text-indent: inherit;
}

/*点赞 收藏*/
.dlikeColBox {
  display: inline-block;
  float: right;
}

.dlikeBox, .dcollectBox {
  display: inline-block;
  padding: 0 10px;
  height: 35px;
  color: #e26d6d;
  line-height: 35px;
  border-radius: 35px;
  border: 1px solid #e26d6d;
  cursor: pointer;
}

/*赞赏*/
.donate-word {
  margin: 40px 0;
  text-align: center;
}

.donate-word span {
  display: inline-block;
  width: 80px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  background: #e26d6d;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}

.donate-body {
  display: none;
}

.donate-body-show {
  display: block;
}

.donate-item {
  text-align: right;
}

.donate-item:last-child {
  text-align: left;
}

.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}

.donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
}

.donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}

.donate-body .donate-item:first-of-type div {
  color: #44b549;
}

.donate-body .donate-item:nth-of-type(2) div {
  color: #00a0e9;
}

.bd_weixin_popup {
  position: fixed !important;
}

@font-face {
  font-family: octicons-link;
  src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
}
</style>

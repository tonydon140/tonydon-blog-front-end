<template>
  <div class="detail-box">
    <div class="body">

      <span class="s-round-date">
        <span class="month">
          {{ data.publishDate.date.month }} 月
        </span>
        <span class="day">
           {{ data.publishDate.date.day }}
        </span>
      </span>

      <div class="header">
        <div class="title">
          <router-link :to="'/article/' + data.article.id" target="_blank">
            {{ data.article.title }}
          </router-link>
        </div>

        <div class="meta-data">
          <span>
             <el-icon><Clock/></el-icon>
             {{ data.publishDate.format }}
          </span>
          <span>
             <el-icon><View/></el-icon>
             {{ data.article.viewCount }}
          </span>
          <span>
            <el-icon :size="16"><ChatLineSquare/></el-icon>
            {{ data.article.commentCount }}
          </span>
          <div class="ui label category">
            <router-link :to="'/category/'+data.article.categoryId">{{ data.article.categoryName }}</router-link>
          </div>
        </div>


      </div>
      <div class="content">
        <MdEditor :model-value="data.article.content" :preview-only="true"></MdEditor>
      </div>
    </div>

    <div class="footer">
      <span class="donate">
        <donate></donate>
      </span>

      <span class="update">
        最后更新：{{ data.updateDate.format }}
      </span>
    </div>
  </div>
</template>

<script setup>
import {getArticle, updateViewCount} from '@/api/article.js'
import MdEditor from 'md-editor-v3'
import {reactive, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import 'md-editor-v3/lib/style.css'
import router from "@/router";
import Donate from "@/components/user/Donate";
import {ChatLineSquare, View, Clock} from "@element-plus/icons-vue";
import {parseDate} from "@/utils/time";

let route = useRoute()
let store = useStore()
let data = reactive({
  aid: 1,               // 文章ID
  donatePanel: false,   // 捐赠面板
  article: {},          // 返回详情数据
  publishDate: {
    date: {},
    format: ''  // 22/06/10 14:21
  },
  updateDate: {
    date: {},
    format: ''  // 2022-05-20 14:21
  }
})


// dateStr: 2022-06-15T01:27:38
function formatDate(dateStr, isPublishDate) {
  let date = parseDate(dateStr);

  if (isPublishDate) {
    data.publishDate.date = date;
    data.publishDate.format = date.year.substring(2) + '/' + date.month + '/' + date.day + ' ' + date.hours + ':' + date.minutes;
  } else {
    data.updateDate.date = date;
    data.updateDate.format = date.year + '-' + date.month + '-' + date.day + ' ' + date.hours + ':' + date.minutes;
  }
}

function getArticleDetail() {
  getArticle(data.aid).then((res) => {
    data.article = res
    formatDate(res["publishTime"], true);
    formatDate(res["updateTime"], false);
  }).catch(err => {
    router.push("/home")
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
    data.aid = id;
    getArticleDetail()
    updateViewCount(data.aid).catch(ignore => {})
  }
}

routeChange()
watch(route, routeChange)

</script>

<style scoped>
.detail-box {
  background-color: #fff;
  margin-bottom: 20px;
}

.detail-box .body {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;

}

.detail-box .body .header .title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  text-shadow: 0 1px 1px rgb(0 0 0 / 50%);
}

.detail-box .body .header .meta-data {
  text-align: center;
  margin-bottom: 25px;
}

.detail-box .body .header .meta-data .category {
  left: 0;
  top: 45px;
}


.detail-box .body .header .meta-data span {
  font-size: 16px;
  margin-right: 1em;
  text-shadow: 0 1px 1px rgb(0 0 0 / 50%);
}

.detail-box .body .header .meta-data span .el-icon {
  vertical-align: text-top;
}

.detail-box .body .content {
  margin-bottom: 10px;
}

.detail-box .footer {
  padding: 8px 15px;
  clear: both;
  border-top: 1px solid #f3f3f3;
  height: 32px;
  vertical-align: middle;
}

.detail-box .footer .donate {
  float: left;
}

.detail-box .footer .update {
  float: right;
  position: relative;
  top: 7px;
}
</style>

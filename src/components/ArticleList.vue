<!-- 文章列表 -->
<template>
  <el-row class="share-list-box">

    <el-col :span="24" class="s-item tcommonBox" v-for="(article, index) in data.articleList" :key="article.id">

      <span class="s-round-date">
        <span class="month" v-html="showInitDate(article.createTime,'month')+'月'"></span>
        <span class="day" v-html="showInitDate(article.createTime,'date')"></span>
      </span>

      <header>
        <h1>
          <router-link :to="'/article/'+article.id" target="_blank">
            {{ article.title }}
          </router-link>
        </h1>

        <h2>
          <el-icon>
            <UserFilled/>
          </el-icon>
          发表于
          <el-icon>
            <Timer/>
          </el-icon>
          <span>{{ showInitDate(article.createTime, 'all') }}</span> •
          <el-icon>
            <View/>
          </el-icon>
          {{ article.viewCount }} 次围观 •
        </h2>

        <div class="ui label">
          <router-link :to="'/category/' + article.categoryId">
            {{ article.categoryName }}
          </router-link>
        </div>
      </header>

      <div class="article-content">
        <p style="text-indent:2em;">
          {{ article.summary }}
        </p>
        <p style="max-height:300px;overflow:hidden;text-align:center;">
          <img :src="article.thumbnail" alt="" class="maxW">
        </p>
      </div>

      <div class="view-detail">
        <router-link :to="'/article/'+article.id" target="_blank">
          阅读全文>>
        </router-link>
      </div>

    </el-col>
    <el-col class="view-more">
      <a v-show="data.hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>
      <a v-show="!data.hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
    </el-col>
  </el-row>
</template>

<script setup>
import initDate from '@/utils/server.js'
import {getArticleList} from '@/api/article'
import {ref, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import router from "@/router";
import {Timer, UserFilled, View} from "@element-plus/icons-vue";


let store = useStore();
let route = useRoute();

let data = reactive({
  articleList: [],
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    categoryId: 0
  },
  hasMore: true
})


// 显示初始化时间
function showInitDate(date, full) {
  return initDate(date, full)
}

// 获得文章列表
function getList() {
  getArticleList(data.queryParams).then((response) => {
    // 添加数据
    data.articleList = data.articleList.concat(response.rows);
    // 判断是否还有数据
    if (response.total <= data.articleList.length) {
      data.hasMore = false;
    } else {
      data.hasMore = true;
      data.queryParams.pageNum++;
    }
  })
}

// 展示数据
function showSearchShowList(initData) {
  if (initData) data.articleList = [];
  getList();
}

// 查看更多
function addMoreFun() {
  showSearchShowList(false)
}

// 路由改变
function routeChange() {
  // 1. 判断当前路由是否是分类页面
  if (route.path.startsWith("/category")) {
    // 2. 获取分类id，若id不合法跳转至未分类
    let categoryId = Number(route.params.id);
    if (isNaN(categoryId) || categoryId < 0) {
      router.push("/category");
      // 路由跳转之后需要 return 结束函数，否则后续代码依旧会执行
      return;
    }
    // 3. 设置查询分类
    data.queryParams.categoryId = categoryId;
  }
  // 4. 无论是不是分类页面，都需要展示数据
  showSearchShowList(true);
}

routeChange();
watch(route, routeChange);

</script>

<style scoped lang="less">
// 文章列表
.share-list-box {
  transition: all 0.5s ease-out;
  font-size: 15px;

  .el-col {

    // 阅读全文
    .view-detail {
      :hover {
        color: #00a0e9;
      }
    }
  }
}
</style>

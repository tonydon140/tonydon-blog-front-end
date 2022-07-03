<!-- 文章列表 -->
<template>
  <el-row class="share-list-box">

    <el-col :span="24" v-for="(article, index) in data.articleList" :key="article.id" class="article-box">

      <div class="article-content">
        <el-row :gutter="20">

          <el-col :span="8" class="img-thumbnail">
            <router-link :to="'/article/'+article.id" target="_blank">
              <img :src="article.thumbnail" alt="">
            </router-link>
          </el-col>

          <el-col :span="16" class="content">
            <div class="title">
              <router-link :to="'/article/'+article.id" target="_blank">
                {{ article.title }}
              </router-link>
            </div>

            <div class="summary">
              {{ article.summary }}
              <span v-show="article.summary.length > 150"
                    style="font-size: 1.5em">
                ...
              </span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="meta-footer">
        <div>
          <span class="float-left">
            <el-icon :size="16"><Calendar/></el-icon>
            {{ article.publishTime.substring(0, 10) }}
          </span>

          <span class="float-left">
             <el-icon :size="16"><View/></el-icon>
            {{ article.viewCount }}
          </span>

          <span class="float-left">
            <el-icon :size="16"><ChatLineSquare/></el-icon>
            {{ article.commentCount }}
          </span>

          <span class="read-all">
            <router-link :to="'/article/'+article.id" target="_blank">
              阅读全文
              <el-icon><ArrowRightBold/></el-icon>
            </router-link>
          </span>

          <span class="category">
            <router-link :to="'/category/' + article.categoryId">
              <el-tag>
                {{ article.categoryName }}
              </el-tag>
            </router-link>
          </span>
        </div>
      </div>

    </el-col>

    <el-col class="view-more">
      <a v-show="data.hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>
      <a v-show="!data.hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
    </el-col>
  </el-row>
</template>

<script setup>
import {getArticleList} from '@/api/article'
import {reactive, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import router from "@/router";
import {Calendar, ChatLineSquare, View, ArrowRightBold} from "@element-plus/icons-vue";


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

<style scoped>
.share-list-box {
  transition: all 0.5s ease-out;
  font-size: 15px;
}

.share-list-box .article-box {
  background-color: #fff;
  margin-bottom: 20px;
}

.article-content {
  padding: 20px;
}

.article-content .img-thumbnail {
  width: 288px;
  height: 162px;
}

.article-content .img-thumbnail img {
  padding: 2px;
  width: 100%;
  height: 100%;
  border: 1px solid #f3f3f3;
}


.article-content .content .title {
  margin-bottom: 15px;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-content .content .title a:hover {
  color: #00a0e9;
}

.article-content .content .summary {
  position: relative;
  line-height: 1.5em;
  /*设置容器高度为5倍行高就是显示5行*/
  height: 7.5em;
  overflow: hidden;
}


.meta-footer {
  height: 25px;
  clear: both;
  padding: 8px 20px;
  border-top: 1px solid #f3f3f3;
}

.meta-footer span .el-icon {
  vertical-align: text-bottom;
}

.meta-footer .float-left {
  float: left;
  margin-right: 1rem;
}

.meta-footer .read-all {
  float: right;
  margin-left: 2rem;
}

.meta-footer .read-all:hover {
  color: #00a0e9;
}

.meta-footer .category {
  float: right;
}
</style>

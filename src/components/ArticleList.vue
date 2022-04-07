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
          <i class="fa fa-fw fa-user"></i>发表于
          <i class="fa fa-fw fa-clock-o"></i>
            <span>{{ showInitDate(article.createTime, 'all') }}</span> •
          <i class="fa fa-fw fa-eye"></i>{{ article.viewCount }} 次围观 •
        </h2>

        <div class="ui label">
          <router-link :to="'/Share?classId=' + article.class_id">
            {{article.categoryName}}
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
        <router-link class="tcolors-bg" :to="'/article/'+article.id" target="_blank">
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


let store = useStore();
let route = useRoute();

let data = reactive({
  articleList:[],
  queryParams:{
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
    // console.log(data.articleList)
    // 判断是否还有数据
    if (response.total <=data.articleList.length) {
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
  data.queryParams.categoryId = route.query.classId === undefined ? 0 : parseInt(route.query.classId);
  showSearchShowList(true);
}

routeChange();
watch(route, routeChange);
// 无法监视
// watch(store.state.keywords, routeChange)

</script>

<style>
/*分享标题*/
.shareTitle {
  margin-bottom: 40px;
  position: relative;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
}

.share-class-two {
  width: 100%;
}

.share-class-two li {
  display: inline-block;
}

.share-class-two li a {
  display: inline-block;
  padding: 3px 7px;
  margin: 5px 10px;
  color: #fff;
  border-radius: 4px;
  background: #64609E;
  border: 1px solid #64609E;
  transition: transform 0.2s linear;
  -webkit-transition: transform 0.2s linear;
}

.share-class-two li a:hover {
  transform: translate(0, -3px);
  -webkit-transform: translate(0, -3px);
}

.share-class-two li a.active {
  background: #fff;
  color: #64609E;

}

/*文章列表*/
.share-list-box {
  transition: all 0.5s ease-out;
  font-size: 15px;
}


/*.share-list-box .view-more a:hover,.s-item .view-detail a:hover{
    background: #48456C;
}*/
</style>

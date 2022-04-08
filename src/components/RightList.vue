<!-- 右侧固定导航栏 -->
<template>
  <div class="right-list-box">
    <section>
      <div class="r1-head">
        <img
            :src="store.state.themeObj.center_smailimg ? store.state.themeObj.center_smailimg : '/img/img01.jpg'"
            alt=""
        />
        <h1 v-if="store.state.themeObj.user_start !== 0">
          <span>请别再呼唤我为孤独之人</span>
        </h1>
      </div>
      <div class="r1-body">
        <p>睡懒觉</p>
        <div class="catch-me">
          <div class="">
            <el-tooltip class="item" content="Github" placement="top">
              <a :href="catchMeObj.git" target="_blank"
              ><i class="fa fa-fw fa-github"></i
              ></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="QQ" placement="top">
              <a :href="catchMeObj.qq" target="_blank"
              ><i class="fa fa-fw fa-qq"></i
              ></a>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                content="微博"
                placement="top"
            >
              <a :href="catchMeObj.sina" target="_blank"
              ><i class="fa fa-fw fa-weibo"></i
              ></a>
            </el-tooltip>
          </div>
          <div class="">
            <el-tooltip
                class="item"
                effect="dark"
                content="微信"
                placement="top"
            >
              <a :href="catchMeObj.wechat" target="_blank">
                <i class="fa fa-fw fa-wechat"></i>
              </a>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                content="CSDN"
                placement="top"
            >
              <a :href="catchMeObj.csdn" target="_blank"><i class="">C</i></a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </section>

    <!--热门文章-->
    <section class="rs4">
      <h2 class="ui label">热门文章</h2>
      <ul>
        <li v-for="(item, index) in info.browseList" :key="item.id">
          <router-link :to="'/article/' + item.id" target="_blank">
            {{ item.title }}
          </router-link>
          —— {{ item.viewCount }} 次围观
        </li>
      </ul>
    </section>

    <!-- 右侧上滑小图片 -->
    <div
        v-if="store.state.themeObj.user_start !== 0"
        :class="info.gotoTop ? 'toTop hidden' : 'toTop goTop hidden'"
        @click="toTopFun"
    >
      <img
          :src="store.state.themeObj.right_img ? store.state.themeObj.right_img : '/img/scroll.png'"
          alt=""
      />
    </div>
    <div
        v-else
        :class="info.gotoTop ? 'toTophui hidden' : 'toTophui goTophui hidden'"
        @click="toTopFun"
    >
      <img
          :src="store.state.themeObj.right_img ? store.state.themeObj.right_img : '/img/scroll.png'"
          alt=""
      />
    </div>
  </div>
</template>


<script setup>
import {hotArticleList} from "@/api/article";
import {useStore} from "vuex";
import {reactive} from "vue";

let store = useStore();
let info = reactive({
  fixDo: false,
  loveMe: false,
  gotoTop: false,       // 返回顶部
  going: false,         // 是否正在执行上滑动作
  browseList: {},       // 热门文章 浏览量最多
  artCommentList: "",   // 最新评论
})

// 个人信息
let catchMeObj = reactive({
  git: "https://gitee.com",
  qq: "/img/qq.png",
  sina: "https://weibo.com",
  wechat: "/img/qq.jpg",
  csdn: "https://www.csdn.cn",
  job: "https://www.baidu.com",
})

// 向上
function toTopFun(e) {
  info.gotoTop = false;
  info.going = true;
  let timer = setInterval(function () {
    //获取滚动条距离顶部高度
    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
    let speed = Math.floor(-osTop / 7);
    document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
    //到达顶部，清除定时器
    if (osTop === 0) {
      info.going = false;
      clearInterval(timer);
      timer = null;
    }
  }, 30);
}

// 获得热门文章
function getHotArticleList() {
  hotArticleList().then((response) => {
    info.browseList = response;
  });
}

window.onscroll = function () {
  let t = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(t);
  if (!info.going) {
    info.gotoTop = t > 600;
  }
  info.fixDo = t > 1200;
};
//查询浏览量最多的10篇文章数据
getHotArticleList();

</script>

<style lang="less">
.right-list-box {
  position: relative;
}

.right-list-box section {
  transition: all 0.2s linear;
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.right-list-box section:hover {
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.right-list-box .r1-head {
  text-align: center;
  border-radius: 4px 4px 0 0;
  position: relative;
  /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
}

.right-list-box .r1-head img {
  width: 100%;
  min-height: 100px;
}

.right-list-box .r1-head h1 {
  position: absolute;
  bottom: 5px;
  margin: 0 0 0 -65px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  font-weight: 700;
  width: 130px;
  left: 50%;
}

.right-list-box .r1-head h1 span {
  opacity: 0.3;
}

.right-list-box .r1-body p {
  font-size: 14px;
  margin: 5px 0 8px 0;
  font-weight: 700;
  text-align: center;
}

.right-list-box .r1-body .catch-me {
  text-align: center;
}

.right-list-box .r1-body .catch-me a {
  display: inline-block;
  margin-bottom: 7px;
  position: relative;
  text-decoration: none;
}

.right-list-box .r1-body .catch-me a:hover i {
  color: #fff;
  background: #f4692c;
}

.right-list-box .r1-body .catch-me a i {
  display: inline-block;
  font-size: 18px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border-radius: 42px;
  color: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  font-style: normal;
  margin: 0 3.2px;
}

/*************do you like me*******************/
.right-list-box .rs2 {
  /*padding:10px 0 4px 0;*/
  min-height: 100px;
}

.right-list-box .rs2.fixed {
  position: fixed;
  top: 40px;
  width: 22%;
}

.right-list-box .rs2 p {
  color: #df2050;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
}

.right-list-box .rs2 div {
  color: #df2050;
  cursor: pointer;
  text-align: center;
  font-size: 40px;
  position: absolute;
  width: 100%;
  height: 100px;
  line-height: 100px;
  left: 0;
  top: 30px;
}

.right-list-box .rs2 div i.heart {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: 100px;
  margin-left: -20px;
  margin-top: -5px;
  background: url(/public/img/heart.png) no-repeat 0 0;
  cursor: pointer;
  -webkit-transition: background-position 1s steps(28);
  transition: background-position 1s steps(28);
  -webkit-transition-duration: 0s;
  transition-duration: 0s;
  vertical-align: middle;
}

.right-list-box .rs2 div i.heart:hover {
  transform: scale(1.15);
  //-webkit-transform: scale(1.15);
}

.right-list-box .rs2 div i.heart.active {
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  background-position: -2800px 0;
}

.right-list-box .rs2 div span {
  margin-left: -30px;
}

/**********排队来说*************/
.right-list-box .rs3 .rs3-item {
  font-size: 13px;
  line-height: 20px;
}

.right-list-box .rs3 .rs3-item a {
  display: block;
  padding: 5px;
  transition: all 0.3s ease-out;
  border-bottom: 1px solid #ddd;
  margin: 5px 0;
}

.right-list-box .rs3 .rs3-item a:hover {
  background: rgba(230, 244, 250, 0.5);
  border-radius: 5px;
}

.right-list-box .rs3 .rs3-photo {
  float: left;
}

.right-list-box .rs3 .rs3-photo img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.right-list-box .rs3 .rs3-inner {
  margin-left: 40px;
}

.right-list-box .rs3 .rs3-inner .rs3-author {
  font-weight: 700;
}

.right-list-box .rs3 .rs3-inner .rs3-text {
  font-size: 12px;
  text-align: justify;
}

.right-list-box .rs3 .rs3-item:last-child a {
  border-bottom: none;
}

/************排队看这些***************/
.right-list-box .rs4 li {
  padding: 8px 0;
  text-align: justify;
}

.right-list-box .rs4 li a {
  font-weight: 600;
}

.right-list-box .rs4 li a:hover {
  color: #64609e;
}

/*回到顶部*/
/*返回到顶部*/
.toTop {
  position: fixed;
  right: 40px;
  top: -150px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}

.goTop {
  top: -950px;
}

.toTop img,
.toTophui img {
  width: 100%;
  height: auto;
}

.toTophui {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 99;
  width: 120px;
  height: 120px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
  animation: toflow 2s ease-in-out infinite;
}

@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}

.goTophui {
  bottom: 120vh;
}
</style>

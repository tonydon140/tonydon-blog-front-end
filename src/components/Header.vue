<!-- 头部公用 -->
<template>
  <div class="">
    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu :default-active="param.activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect"
                     :ellipsis='false'
                     :router="true">

              <el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>

              <el-sub-menu index="/Share">
                <template #title><i class="fa fa-wa fa-archive"></i> 分类</template>
                <el-menu-item v-for="item in data.classListObj"
                              :key="item.id"
                              :index="'/Share?classId='+item.id">
                  {{ item.name }}
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
              <el-menu-item index="/FriendsLink"><i class="fa fa-wa fa-users"></i>友链</el-menu-item>

            </el-menu>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="headImgBox" :style="headImageStyle">

      <div class="scene">
        <div><span id="luke"></span></div>
      </div>

      <div class="h-information">
        <img
            :src="store.state.themeObj.head_portrait? store.state.themeObj.head_portrait:'/img/icon2.jpg'"
            alt="">
        <h2 class="h-description">
          {{ store.state.themeObj.autograph ? store.state.themeObj.autograph : "三更灯火五更鸡，正是男儿读书时" }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getAllCategory} from '@/api/category'
import {Typeit} from '@/utils/plug'
import {reactive, onMounted, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import router from "@/router";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";

let store = useStore();
let route = useRoute()

// 提高数据
// 想具有响应式的修改变量的指向，必须先存在响应式数据中
let data = reactive({
  userInfo: {},
  classListObj: []
})

// 头部图像样式
let headImageStyle = reactive({
  backgroundImage: ''
})

let param = reactive({
  activeIndex: '/',                         //当前选择的路由模块
  state: '',                                //icon点击状态
  pMenu: true,                              //手机端菜单打开
  projectList: ''                           //项目列表
})

// 获取分类列表
function getCategoryList() {
  getAllCategory().then((response) => {
    data.classListObj = response;
  })
}

// PC 菜单选择
function handleSelect(key, keyPath) {
  //    console.log(key, keyPath);
}


function routeChange() {
  param.pMenu = true;
  param.activeIndex = route.path === '/' ? '/Home' : route.path;

  // 获取分类
  getCategoryList()
  if ((route.name === "Share" || route.name === "Home") && store.state.keywords) {
    param.input = store.state.keywords;
  } else {
    param.input = '';
    store.state.keywords = '';
  }
}

watch(route, routeChange)


//判断当前页面是否被隐藏
// let hiddenProperty = 'hidden' in document ? 'hidden' :
//     'webkitHidden' in document ? 'webkitHidden' :
//         'mozHidden' in document ? 'mozHidden' :
//             null;
//
// let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
//
// function onVisibilityChange() {
//   // 被隐藏
//   if (!document[hiddenProperty]) {
//     if (route.path !== '/DetailShare') {
//       // !! 表示转为布尔值
//       param.hasLogin = !!localStorage.getItem('userInfo');
//     }
//   }
// }
//
// document.addEventListener(visibilityChangeEvent, onVisibilityChange);

routeChange();

// 页面加载完毕
onMounted(() => {
  let timer = setTimeout(function () {
    Typeit(store.state.themeObj.user_start, "#luke"); //打字机效果
    clearTimeout(timer);
  }, 500);
})


// 异步请求后台必应每日一图链接
axios.get("http://localhost:8011/user/bing-img").then(res => {
  headImageStyle.backgroundImage = 'url(' + res.data.data + ')';
}).catch(err => {
  console.log(err)
})


</script>

<style>
/*********头部导航栏********/

/*头部导航栏盒子*/

.headBack {
  width: 100%;
  background: rgba(40, 42, 44, 0.6);
  /*margin-bottom:30px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}

.headBox li.is-active {
  /*background: #48456C;*/
  background: rgba(73, 69, 107, 0.7);
}

.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom: none !important;
}

.headBox .el-menu {
  background: transparent;
  border-bottom: none !important;
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-sub-menu .el-sub-menu__title {
  height: 38px;
  line-height: 38px;
  border-bottom: none !important;
}

.headBox .el-sub-menu li.el-menu-item {
  height: 38px;
  line-height: 38px;
}

.headBox li .fa-wa {
  vertical-align: baseline;
}

.headBox ul li.el-menu-item,
.headBox ul li.el-menu-item.is-active,
.headBox ul li.el-menu-item:hover,
.headBox .el-sub-menu div.el-sub-menu__title,
.headBox .el-sub-menu__title i.el-sub-menu__icon-arrow {
  color: #fff;
}

/* 鼠标浮在菜单项上的：文字颜色和背景色*/
.headBox ul li.el-menu-item:hover {
  color: #fff !important;
  background: rgba(73, 69, 107, 0.7) !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #fff !important;
}

.headBox .el-menu--horizontal .el-sub-menu > .el-menu {
  top: 38px;
  border: none;
  padding: 0;
}

.headBox > ul li.el-menu-item:hover,
.headBox > ul li.el-sub-menu:hover .el-sub-menu__title {
  background: #48456C;
  border-bottom: none;
}

/*.headBox > ul .el-sub-menu:hover{*/
/*  color: #fff !important;*/
/*}*/
.headBox > ul .el-sub-menu .el-menu,
.headBox > ul .el-sub-menu .el-menu .el-menu-item {
  background: #48456C;
}

.headBox > ul .el-sub-menu .el-menu .el-menu-item {
  min-width: 0;
}

.headBox > ul .el-sub-menu .el-menu .el-menu-item:hover {
  background: #64609E;
}


/*pc搜索框*/

.headBox .pc-search-box {
  padding: 0;
  max-width: 170px;
  /*min-width: 30px;*/
  height: 100%;
  line-height: 38px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.headBox .pc-search-box:hover .pcsearchinput {
  opacity: 1;
  /*transform: scaleX(1);*/
  visibility: visible;
}

.headBox .pc-search-box i.pcsearchicon {
  color: #fff;
  padding-left: 10px;
}

.headBox .pc-search-box .pcsearchinput {
  width: 180px;
  padding: 10px 20px 10px 20px;
  background: rgba(40, 42, 44, 0.6);
  border-radius: 0 0 2px 2px;
  position: absolute;
  right: 0;
  top: 38px;
  opacity: 0;
  visibility: hidden;
  /*transform: scaleX(0);*/
  transform-origin: right;
  transition: all 0.3s ease-out;
}

.headBox .pc-search-box .hasSearched {
  opacity: 1;
  /*transform: scaleX(1);*/
  visibility: visible;
}

.headBox .pc-search-box .el-input {
  width: 100%;
}

.headBox .el-input__inner {
  height: 30px;
  border: none;
  background: #fff;
  /*border: 1px solid #333;*/
  border-radius: 2px;
  padding-right: 10px;
}

.headBox .userInfo {
  height: 100%;
  line-height: 38px;
  position: absolute;
  right: 30px;
  top: 0;
  color: #fff;
}

.headBox .userInfo a {
  color: #fff;
  font-size: 13px;
  transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
  color: #48456C;
}

.headBox .no-login {
  text-align: right;
}

.headBox .has-login {
  text-align: right;
  position: relative;
  min-width: 80px;
  cursor: pointer;
}

.headBox .has-login:hover ul {
  visibility: visible;
  opacity: 1;
}

.headBox .has-login ul {
  background: rgba(40, 42, 44, 0.6);
  padding: 5px 10px;
  position: absolute;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.headBox .has-login ul li {
  border-bottom: 1px solid #48456C;
}

.headBox .has-login ul li:last-child {
  border-bottom: 1px solid transparent;
}

/*******移动端*******/

.mobileBox {
  position: relative;
  height: 38px;
  line-height: 38px;
  color: #fff;
}

.hideMenu {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 38px;
}

.hideMenu ul.mlistmenu {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
  background: #48456C;
  color: #fff;
  border-right: none;
}

.hideMenu .el-sub-menu .el-menu {
  background: #64609E;
}

.hideMenu .el-menu-item,
.hideMenu .el-sub-menu__title {
  color: #fff;
}

.hideMenu > i {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.hideMenu .el-menu-item,
.el-sub-menu__title {
  height: 40px;
  line-height: 40px;
}

.mobileBox .searchBox {
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
  display: block;
  border-radius: 2px;
  border: none;
  height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
  display: block;
}

.hideMenu ul.mlistmenu .el-sub-menu__icon-arrow,
.mobileBox li.el-menu-item a {
  color: #fff;
}

.hideMenu > ul li.el-menu-item:hover,
.hideMenu > ul li.el-menu-item.is-active {
  background: #48576a;
}


/*头部背景图*/

.headImgBox {
  height: 650px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 90px;
}

.h-information {
  text-align: center;
  width: 70%;
  margin: auto;
  position: relative;
  top: 480px;
  padding: 40px 0;
  font-size: 16px;
  opacity: 0.98;
  background: rgba(230, 244, 249, 0.4);
  border-radius: 5px;
  z-index: 1;
  animation: b 1s ease-out;
  -webkit-animation: b 1s ease-out;
}

@-webkit-keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px)
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px)
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}

@keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px)
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px)
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}

.h-information img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  object-fit: cover;
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}

.h-information h2 a {
  background: linear-gradient(to right, #DF2050, #48456D);
  -webkit-background-clip: text;
  color: transparent;
}

.headImgBox .scene {
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 100px;
  font-weight: 200;
  color: #fff;
  position: absolute;
  left: 0;
  top: 160px;
  font-family: 'Sigmar One', Arial;
  text-shadow: 0 2px 2px #47456d;

}

.headImgBox .scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

.saying:after {
  content: "|";
  font-family: Arial, sans-serif;
  font-size: 1em;
  /*line-height: 0;*/
  display: inline-block;
  vertical-align: baseline;
  opacity: 1;
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
  animation: caret 500ms infinite;
}

@keyframes caret {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>

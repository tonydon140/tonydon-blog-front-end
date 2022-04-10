<!-- 头部公用 -->
<template>
  <div class="">
    <div class="headBack">
      <el-row class="head-container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu :default-active="param.activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect"
                     :router="true">

              <el-menu-item index="/Home">
                <el-icon>
                  <home-filled/>
                </el-icon>
                首页
              </el-menu-item>

              <el-sub-menu index="/category">
                <template #title>
                  <el-icon>
                    <management/>
                  </el-icon>
                  分类
                </template>
                <el-menu-item v-for="item in data.categoryList"
                              :key="item.id"
                              :index="'/category/'+item.id">
                  {{ item.name }}
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item index="/Reward">
                <el-icon>
                  <milk-tea/>
                </el-icon>
                赞赏
              </el-menu-item>

              <el-menu-item index="/FriendsLink">
                <el-icon>
                  <sugar/>
                </el-icon>
                友链
              </el-menu-item>

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
        <img :src="'/img/icon2.jpg'" alt="">
        <h2 class="h-description">爱睡懒觉的程序猿 TonyDon</h2>
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
import axios from "axios";
import {HomeFilled, Management, MilkTea, Sugar} from "@element-plus/icons-vue";

let store = useStore();
let route = useRoute()

// 提高数据
// 想具有响应式的修改变量的指向，必须先存在响应式数据中
let data = reactive({
  categoryList: {}
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
  getAllCategory().then(value => {
    data.categoryList = value;
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
  if (store.state.imageUrl === '') {
    getImage();
  }else{
    headImageStyle.backgroundImage = 'url(' + store.state.imageUrl + ')';
  }
}

watch(route, routeChange)

routeChange();

// 页面加载完毕
onMounted(() => {
  let timer = setTimeout(function () {
    Typeit(store.state.themeObj.user_start, "#luke"); //打字机效果
    clearTimeout(timer);
  }, 500);
})

// 异步
function getImage() {
  let randPage = Math.floor(Math.random() * 8000);
  let apiUrl = 'https://api.pexels.com/v1/search?query=nature&per_page=1&page=' + randPage;
  axios.get(apiUrl, {
    headers: {
      Authorization: '563492ad6f91700001000001585a4ded298445f8a953d909783267f2'
    }
  }).then(value => {
    console.log(value.data)
    store.state.imageUrl = value.data.photos[0].src.original + '?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920';
    headImageStyle.backgroundImage = 'url(' + store.state.imageUrl + ')';
  })
}


</script>

<style>
/*********头部导航栏********/

/* 头部导航栏盒子 */
.headBack {
  width: 100%;
  /*background: rgba(40, 42, 44, 0.6);*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}

/* 导航栏背景颜色 */
.headBox .el-menu {
  background-color: rgb(233, 233, 233, 0.6);
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-sub-menu .el-sub-menu__title {
  height: 38px;
  line-height: 38px;
  border-bottom: none !important;
}

/* 消除导航栏底部下划线 */
.headBox .el-menu--horizontal {
  border-bottom: none !important;
}

/******PC搜索框******/

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
  top: 490px;
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

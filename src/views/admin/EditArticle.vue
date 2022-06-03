<template>
  <div>
    <el-row>
      <el-col :span="19">

        <h2 v-if="$route.params.id">编辑文章</h2>
        <h2 v-else>撰写新文章</h2>

        <el-input v-model="data.title" placeholder="添加标题"/>
        <MdEditor
            class="md-editor"
            v-model="data.content"
            :on-upload-img="onUploadImg"
        />
      </el-col>
      <el-col :span="5">
        <div class="right-card">
          <el-card v-if="data.isPublish === '0'">
            <el-button class="publish-button" type="info" @click="saveDraft">保存草稿</el-button>
            <el-button class="publish-button" type="primary" @click="publish">发布</el-button>
          </el-card>
          <el-card v-else>
            <div>发布于：{{ data.publishTime }}</div>
            <el-button class="publish-button" type="primary" @click="updateArticle">更新</el-button>
          </el-card>

          <el-card>
            <el-collapse class="category-card">
              <el-collapse-item title="分类" name="1">
                <el-radio v-for="category in data.categoryList"
                          v-model="data.category"
                          :label="category.id"
                          :key="category.id">
                  {{ category.name }}
                </el-radio>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <el-card>
            <div class="thumbnail-card">
              <span class="thumbnail-header">首页图片</span>
              <el-upload
                  class="thumbnail-uploader"
                  action="http://localhost:6515/admin/upload/img"
                  :headers="{token: getToken()}"
                  :show-file-list="false"
                  :on-success="handleThumbnailSuccess"
                  :before-upload="beforeThumbnailUpload"
              >
                <el-image v-if="data.thumbnail" :src="data.thumbnail" class="thumbnail-image" fit="contain"/>
                <el-link v-else class="link">添加首页图片</el-link>
              </el-upload>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import MdEditor from "md-editor-v3";
import 'md-editor-v3/lib/style.css';
import axios from "axios";
import {ElMessage} from "element-plus";
import {reactive, defineProps, watch} from "vue";
import {getAllForAdmin} from "@/api/category";
import {getToken} from "@/utils/token";
import {
  saveDraftArticle,
  getArticleDetailById,
  publishArticle,
  updatePublishArticle
} from "@/api/article";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import router from "@/router";
import config from "@/api/config"

let store = useStore();
let route = useRoute();
let data = reactive({
  categoryList: [],
  id: NaN,
  title: '',
  content: '',
  category: 1,      // 文章分类，默认为未分类
  thumbnail: '',    // 文章缩略图
  isPublish: '0',   // 是否发布（0草稿，1已发布）
  publishTime: '',   // 发布时间
});

function clearData() {
  data.categoryList = [];
  data.id = NaN;
  data.title = '';
  data.content = '';
  data.category = 1;
  data.thumbnail = '';
  data.isPublish = '0';
  data.publishTime = '';
}

// 监视路由改变
function routeChange() {
  // 判断路由地址是否在本页
  if (!route.path.startsWith('/admin/edit')) return;

  // 获取 id，若 id 不存在直接退出
  let id = Number(route.params.id);
  if (!id) {
    clearData() // 清空 data 数据
    return;
  }

  // 如果 id 格式错误，返回上一页
  if (isNaN(id) || id <= 0) {
    ElMessage.error("异常地址");
    router.back();
    return;
  }

  data.id = id;
  // 获取文章详情
  getArticleDetailById(id).then(res => {
    // console.log(res)
    data.title = res.title;
    data.category = res.categoryId;
    data.content = res.content;
    data.thumbnail = res.thumbnail;
    data.isPublish = res.isPublish;
    data.publishTime = res.publishTime;
  }).catch(err => {
    ElMessage.error("文章不存在")
    router.back();
  })
}

routeChange();
watch(route, routeChange);


// 保存草稿，不检查标题，也不设置默认图片
function saveDraft() {
  saveDraftArticle(
      data.id,
      data.title,
      data.content,
      data.category,
      data.thumbnail,
      store.state.userInfo.id).then((res) => {
    ElMessage.success("保存成功！");
  });
}

// 发布文章
function publish() {
  // 1. 检查文章标题是否为空
  if (data.title.trim() === '') {
    ElMessage.error("文章标题不能为空！");
    return;
  }
  // 2. 设置默认的首页图片
  if (data.thumbnail === '') {
    data.thumbnail = "https://tonydon-blog.obs.cn-east-3.myhuaweicloud.com/img/2022/4/1/10ec72c4c99a46ef8b93f5ab2a5c2eff.jpg";
  }
  // 3. 发布文章
  publishArticle(
      data.id,
      data.title,
      data.content,
      data.category,
      data.thumbnail,
      store.state.userInfo.id).then((res) => {
    routeChange();    // 刷新页面
    ElMessage.success("发布成功！");
  }).catch(err => {
    ElMessage.success("发布失败！");
  })
}

// 更新已发布的文章
function updateArticle() {
  updatePublishArticle(
      data.id,
      data.title,
      data.content,
      data.category,
      data.thumbnail,
      store.state.userInfo.id
  ).then((res) => {
    routeChange();    // 刷新页面
    ElMessage.success("更新成功！");
  }).catch(err => {
    ElMessage.success("更新失败！");
  })
}

// 获得所有的分类
function getAllCategory() {
  getAllForAdmin().then((response) => {
    data.categoryList = response;
  })
}


getAllCategory();


// 文章内上传图片
async function onUploadImg(files, callback) {
  let result = await Promise.all(
      // map 遍历数组，将文件上传后台，返回图片地址
      Array.from(files).map(function (file) {
        return new Promise((resolve, reject) => {
          // 封装表单
          const form = new FormData();
          form.append("file", file);
          // 异步请求后台
          axios.post(config.baseAdminURL + "/upload/img", form, {
            headers: {
              'token': getToken(),
              'Content-Type': 'multipart/form-data'
            }
          }).then(value => {
            resolve(value)
          }).catch(reason => {
            reject(reason)
          })
        });
      }))
  // 将请求返回的地址传入回调函数
  callback(result.map(value => value.data.data))
}

// 上传首页图片之前，限制文件类型和大小
function beforeThumbnailUpload(file) {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage.error('首页图片只支持 png/jpg 格式！');
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

// 文件上传超过之后的函数
function handleThumbnailSuccess(res) {
  data.thumbnail = res.data;
}

</script>

<style scoped lang="less">
.el-row {
  .el-col {

    .el-input {
      margin-top: 15px;
      margin-bottom: 20px;
    }

    .md-editor {
      height: 80vh;
    }

    .right-card {
      margin-left: 20px;
      margin-top: 50px;

      .el-card {
        margin-bottom: 10px;

        .category-card {
          .el-collapse-item {
            // 单选框独占一行
            .el-radio {
              display: block;
            }
          }
        }

        .thumbnail-card {
          .thumbnail-header {
            display: block;
            margin-bottom: 8px;
          }

          .thumbnail-uploader {
            .thumbnail-image {
              height: 200px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
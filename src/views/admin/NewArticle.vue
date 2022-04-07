<template>
  <div>
    <el-row>
      <el-col :span="19">
        <h2>撰写新文章</h2>
        <el-input v-model="data.title" placeholder="添加标题"/>
        <MdEditor
            v-model="data.content"
            class="md-editor"
            :on-upload-img="onUploadImg"
        />
      </el-col>
      <el-col :span="5">
        <div class="right-card">
          <el-card>
            <el-button class="publish-button" type="info" @click="saveDraft">保存草稿</el-button>
            <el-button class="publish-button" type="primary" @click="publishArticle">发布</el-button>
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
import {reactive, ref, watch} from "vue";
import {getAllForAdmin} from "@/api/category";
import axios from "axios";
import {getToken} from "@/utils/token";
import {ElMessage} from "element-plus";
import {saveDraftArticle} from "@/api/article";
import {useStore} from "vuex";


let store = useStore();

let data = reactive({
  title: '',
  content: '',
  category: 1,      // 文章分类，默认为未分类
  categoryList: [],
  thumbnail: ''
});


// 保存草稿，不检查标题，也不设置默认图片
function saveDraft() {
  saveDraftArticle(null,
      data.title,
      data.content,
      data.category,
      data.thumbnail,
      store.state.userInfo.id).then((res) => {
    console.log(res)
    ElMessage.success("保存成功！");
  });


}

// 发布文章
function publishArticle() {
  // 1. 检查文章标题是否为空
  if (data.title.trim() === '') {
    ElMessage.error("文章标题不能为空！");
    return;
  }
  // 2. 设置默认的首页图片
  if (data.thumbnail === '') {
    data.thumbnail = "https://tonydon-blog.obs.cn-east-3.myhuaweicloud.com/img/2022/4/1/10ec72c4c99a46ef8b93f5ab2a5c2eff.jpg";
  }
  // 3.

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
          axios.post("http://localhost:6515/admin/upload/img", form, {
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
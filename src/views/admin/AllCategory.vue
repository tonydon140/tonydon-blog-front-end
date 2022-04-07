<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button @click="categoryDialog = true">添加分类</el-button>
    </div>
    <el-table :data="data.categoryList" stripe>
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="name" label="分类"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{scope.row.status === '0' ? '正常': '停用'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加/编辑分类对话框 -->
    <el-dialog v-model="categoryDialog" title="添加分类" width="600px">

      <el-form :model="categoryForm" label-width="80px">

        <el-form-item label="分类名">
          <el-input
              type="text"
              placeholder="分类名"
              v-model="categoryForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label="父分类">
          <el-select v-model="categoryForm.pid" placeholder="选择父分类" default-first-option>
            <el-option :key="-1" label="无" value="-1" ></el-option>
            <el-option
                v-for="item in data.categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
              type="text"
              placeholder="描述"
              v-model="categoryForm.description">
          </el-input>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="categoryDialog = false">取消</el-button>
          <el-button type="primary" @click="addCategory" :loading="categoryForm.loading">确定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {getAllForAdmin, removeCategoryById, saveCategory} from "@/api/category";
import {ElMessage} from "element-plus";

let data = reactive({
  categoryList: []
})

let categoryDialog = ref(false);

// 新建分类表单数据
let categoryForm = reactive({
  name: '',         // 分类名
  pid: '',          // 父分类 id
  description: '',  // 描述
  loading: false    // 是否在加载
})

function getAll() {
  getAllForAdmin().then((res) => {
    data.categoryList = res;
  })
}

getAll();

// 删除分类
function handleDelete(category) {
  removeCategoryById(category.id).then(() => {
    ElMessage.success("删除成功！")
    getAll();
  }).catch(() => {
    ElMessage.error("删除失败！")
  })
}

// 添加分类
function addCategory() {
  // 1. 分类名不为空
  if (categoryForm.name.trim() === '') {
    ElMessage.error("分类名不能为空")
    return;
  }

  // 2. 如果 pid 为空，提示选择
  if(categoryForm.pid === ''){
    ElMessage.error("请选择父分类")
    return;
  }

  // 3. 提交后台进行保存
  categoryForm.loading = true;
  saveCategory(categoryForm.name, categoryForm.pid, categoryForm.description).then((res) => {
    categoryForm.loading = false;
    categoryDialog.value = false;
    ElMessage.success("添加成功");
    getAll();
  }).catch((err)=>{
    ElMessage.error("添加失败")
  })
}

</script>

<style scoped>

</style>
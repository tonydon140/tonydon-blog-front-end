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
          {{ scope.row.status === '0' ? '正常' : '停用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small">
            编辑
          </el-button>
          <el-button
              v-if="scope.row.name !== '未分类'"
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
            <el-option :key="-1" label="无" value="-1"></el-option>
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
import {getAllForAdmin, removeCategoryById, saveCategory, confirmRemoveCategoryById} from "@/api/category";
import {ElMessage, ElMessageBox} from "element-plus";
import httpCode from "@/utils/http-code";

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

// 刷新分类列表
function refreshCategoryList() {
  getAllForAdmin().then((res) => {
    data.categoryList = res;
  });
}

refreshCategoryList();

// 删除分类
function handleDelete(category) {
  if (category.name === '未分类') {
    ElMessage.error("不能删除未分类！");
    return;
  }
  removeCategoryById(category.id).then(() => {
    ElMessage.success("删除成功！")
    refreshCategoryList();
  }).catch((code) => {
    // 如果分类中存在文章
    if (code === httpCode.CATEGORY_HAS_ARTICLE) {
      ElMessageBox.confirm('该分类下已经存在文章，是否删除该分类，并将分类下的文章移至未分类？', '系统提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认删除分类
        console.log("then");
        confirmRemoveCategoryById(category.id).then(() => {
          ElMessage.success("删除成功！")
          refreshCategoryList();
        }).catch();
      }).catch();
    }
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
  if (categoryForm.pid === '') {
    ElMessage.error("请选择父分类")
    return;
  }

  // 3. 提交后台进行保存
  categoryForm.loading = true;
  saveCategory(categoryForm.name, categoryForm.pid, categoryForm.description).then((res) => {
    categoryForm.loading = false;
    categoryDialog.value = false;
    ElMessage.success("添加成功");
    refreshCategoryList();
  }).catch((err) => {
    ElMessage.error("添加失败")
  })
}

</script>

<style scoped>

</style>
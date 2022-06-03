<template>
  <div>
    <div class="header">
      <el-button @click="registerForm = true">新增用户</el-button>
    </div>
    <el-table :data="data.userList" stripe style="width: 85%">
      <el-table-column prop="id" label="UID"/>
      <el-table-column prop="username" label="用户名">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image :src=" scope.row.avatar"></el-image>
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column prop="email" label="电子邮箱地址"/>
      <el-table-column prop="sex" label="性别"/>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            <el-icon>
              <edit/>
            </el-icon>
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">
            <el-icon>
              <close-bold/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑用户对话框 -->
    <el-dialog v-model="registerForm" title="添加用户" width="600px">

      <el-form :model="newUser" label-width="80px">

        <el-form-item label="用户名">
          <el-input
              type="text"
              placeholder="用户名"
              v-model="newUser.username">
          </el-input>
          <el-alert
              v-show="newUser.usernameErr"
              title="用户名错误"
              type="error"
              :closable="false">
          </el-alert>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input
              type="text"
              placeholder="昵称"
              v-model="newUser.nickname">
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input
              type="email"
              placeholder="邮箱"
              v-model="newUser.email">
          </el-input>
          <el-alert
              v-show="newUser.emailErr"
              title="邮箱错误"
              type="error"
              :closable="false">
          </el-alert>
        </el-form-item>


        <el-form-item label="密码">
          <el-input
              type="password"
              placeholder="密码：6-12位英文、数字、下划线"
              v-model="newUser.password">
          </el-input>
          <el-alert
              v-show="newUser.passwordErr"
              title="密码格式错误"
              type="error"
              :closable="false">
          </el-alert>
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input
              type="password"
              placeholder="确认密码"
              @keyup.enter.native="registerEnterFun"
              v-model="newUser.password2">
          </el-input>
          <el-alert
              v-show="newUser.password2Err"
              title="重复密码有误"
              type="error"
              :closable="false">
          </el-alert>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelRegister">取消</el-button>
          <el-button type="primary" @click="newRegister" :loading="newUser.loading">确定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {inject, reactive, ref} from "vue";
import {getUserList, removeUserById, register} from "@/api/user";
import {Edit, CloseBold} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {useStore} from "vuex";

let store = useStore();
let data = reactive({
  userList: []
})

// 新用户
let newUser = reactive({
  username: '',       // 新用户注册名
  nickname: '',       // 新用户昵称
  email: '',          // 新用户注册邮箱
  password: '',       // 新用户注册密码
  password2: '',      // 新用户注册重复密码
  usernameErr: false,  // 新用户注册用户名错误
  emailErr: false,    // 新用户注册邮箱错误
  passwordErr: false, // 新用户注册密码错误
  password2Err: false,// 新用户注册重复密码错误
  registerErr: false, // 已注册错误
  registerTitle: '该邮箱已注册',
  loading: false
})


let registerForm = ref(false);

// 获取所有用户
function list() {
  getUserList().then((res) => {
    // 转换性别
    let sexList = ['男', '女', '未知'];
    res.forEach(user => user.sex = sexList[user.sex])
    data.userList = res;
  })
}

list();


// 删除用户
function handleDelete(user) {
  // 1. 如果只有一个用户，则禁止删除
  if (data.userList.length === 1) {
    ElMessage.error("当前只有一个用户，禁止删除！");
    return;
  }
  // 2. 显示删除提示框
  ElMessageBox.confirm("此操作不可逆！！！", "您确定要删除吗？", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    removeUserById(user.id).then(() => {
      list();
      ElMessage.error("删除成功");
    }).catch(() => {
      ElMessage.error("删除失败");
    })
  })
}

// 编辑用户 todo
function handleEdit(user) {

}

// 回车注册
function registerEnterFun(e) {
  newRegister()
}

// 取消注册
function cancelRegister() {
  registerForm.value = false;
}

// 注册提交
function newRegister() {
  // 创建正则
  let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  let passwordReg = /^(\w){6,12}$/;
  // 用户名不为空
  newUser.usernameErr = !newUser.username;
  // 验证邮箱
  newUser.emailErr = !emailReg.test(newUser.email);

  // 验证密码不为空，且符合规则
  if (newUser.password && passwordReg.test(newUser.password)) {
    newUser.passwordErr = false;
    // 验证两次密码是否相同
    newUser.password2Err = newUser.password !== newUser.password2;
  } else {
    newUser.passwordErr = true;
  }

  // 验证全部通过
  if (!newUser.usernameErr && !newUser.emailErr && !newUser.passwordErr && !newUser.password2Err) {
    newUser.loading = true;
    // 用户注册
    register(
        newUser.username,
        newUser.nickname,
        newUser.email,
        newUser.password,
        store.state.userInfo.id
    ).then((response) => {
      // 注册成功，刷新页面
      window.location.reload();
      ElMessage.success("注册成功");
    }).catch((error) => {
      // 注册失败
      newUser.loading = false;
    })
  }
}

</script>

<style scoped>
.header {
  margin-bottom: 10px;
}

.el-alert {
  height: 20px;
  /*padding: 0;*/
}

</style>
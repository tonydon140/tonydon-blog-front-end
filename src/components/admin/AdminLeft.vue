<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
    <el-menu-item index="/admin/home">
      <el-icon>
        <house/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <!-- 文章菜单 -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <document/>
        </el-icon>
        <span>文章</span>
      </template>

      <el-menu-item index="/admin/all-article">
        <el-icon>
          <list/>
        </el-icon>
        <span>所有文章</span>
      </el-menu-item>

      <el-menu-item index="/admin/edit">
        <el-icon>
          <document-add/>
        </el-icon>
        <span>写文章</span>
      </el-menu-item>

      <el-menu-item index="/admin/all-category">
        <el-icon>
          <list/>
        </el-icon>
        <span>分类</span>
      </el-menu-item>

    </el-sub-menu>

    <el-menu-item index="/admin/comment">
      <el-icon>
        <ChatLineSquare/>
      </el-icon>
      <span>评论</span>
    </el-menu-item>

    <el-menu-item index="/admin/friend-link">
      <el-icon>
        <ChatLineSquare/>
      </el-icon>
      <span>友链</span>
    </el-menu-item>

    <el-menu-item index="/admin/user">
      <el-icon>
        <user></user>
      </el-icon>
      <span>用户</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {
  Document, House,
  ChatLineSquare,
  User, DocumentAdd, List
} from '@element-plus/icons-vue'

</script>

<style scoped>
.el-menu {
  height: calc(100vh - 25px);
}
</style>
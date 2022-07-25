<template>
  <div>
    <div>
      <h2>Redis</h2>

      <el-button @click="redis2MySQLHandler">访问量同步数据库</el-button>
      <span style="margin-left: 10px">
        Redis 中的访问量每天1点、7点、13点和19点自动同步至数据库，可以通过按钮手动同步。
        最后同步时间为：
      </span>
    </div>

  </div>
</template>

<script setup>
import {viewCount2DB} from "@/api/home";
import {ElMessage} from "element-plus";

// Redis 中的访问量同步置数据库
function redis2MySQLHandler() {
  viewCount2DB().then(res => {
    ElMessage.success("同步成功！");
  })
}


</script>

<style scoped>
h2 {
  font-size: 28px;
  margin-top: 7px;
  margin-bottom: 7px;
}

h3 {
  font-size: 24px;
  margin-top: 6px;
  margin-bottom: 6px;
}

h4 {
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}


</style>
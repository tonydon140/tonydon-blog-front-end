<!-- 赞赏模块 -->
<template>
  <div class="tRewardBox tcommonBox">
    <header>
      <h1>赞赏</h1>
    </header>

    <section>
      <div>如果我的文章对您有很大的帮助，您可以请我喝奶茶。请备注留下你的姓名/昵称方便我公布赞赏记录。</div>

      <el-divider/>

      <el-table :data="data.rewardList" border style="width: 100%">
        <el-table-column prop="payTime" label="日期" align="center"></el-table-column>
        <el-table-column prop="name" label="赞赏老爷" align="center"></el-table-column>
        <el-table-column prop="money" label="金额" align="center"></el-table-column>
      </el-table>
      <donate></donate>
    </section>
  </div>
</template>

<script setup>
import initDate from "@/utils/server";
import {reactive} from "vue";
import {useStore} from "vuex";
import Donate from "@/components/user/Donate";

let store = useStore();
let data = reactive({
  rewardList:[]
})



// 时间处理
function showInitDate(date, full) {
  return initDate(date, full);
}
</script>

<style scoped>
.tRewardBox section {
  padding-bottom: 20px;
}

.tRewardBox section h1 {
  margin: 10px 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}

.tRewardBox section p {
  margin: 10px 0;
  line-height: 24px;
}

.tRewardBox section hr {
  background: #ccc;
  margin-bottom: 30px;
}

.tRewardBox .donate-item {
  text-align: right;
  color: #44b549;
}

.tRewardBox .donate-item:last-child {
  text-align: left;
  color: #00a0e9;
}

.tRewardBox .donate-item img {
  width: 100%;
  display: block;
  height: auto;
}

.tRewardBox .donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  text-align: center;
  box-sizing: border-box;
}

.tRewardBox .donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}

.tRewardBox .el-table__body-wrapper {
  overflow: hidden;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: transparent;
}
</style>

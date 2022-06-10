<template>
  <div class="donate">

    <div class="donate-word">
      <el-button @click="info.donatePanel = true" type="success" color="#EB9999">
        请我喝奶茶
        <el-icon><milk-tea/></el-icon>
      </el-button>
    </div>

    <el-dialog v-model="info.donatePanel" width="40%">
      <el-row :gutter="30">

        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="info.wx_pay_image" alt=""/>
            <span>微信扫一扫，请我喝奶茶</span>
          </div>
        </el-col>

        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="info.alipay_image" alt=""/>
            <span>支付宝扫一扫，请我喝奶茶</span>
          </div>
        </el-col>

      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {MilkTea} from "@element-plus/icons-vue";

let info = reactive({
  alipay_image: '/img/ali_pay_square.jpg',
  wx_pay_image: '/img/wx_pay_square.png',
  donatePanel: false
})
</script>

<style scoped>
.donate-word {
  text-align: center;
}

.donate-item {
  text-align: center;
}

.donate-item:last-child {
  text-align: center;
}

.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}

.donate-item div {
  display: inline-block;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
}

.donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}

.donate-body .donate-item:first-of-type div {
  color: #44b549;
}

.donate-body .donate-item:nth-of-type(2) div {
  color: #00a0e9;
}
</style>
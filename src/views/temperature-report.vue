<template>
  <div class="temperature-container wrapper">
    <div class="page-title">上报体温</div>
    <el-input
      class="input-style"
      v-model="temperature"
      placeholder="请输入您的温度"
    ></el-input>
    <el-button type="primary" @click="confirmSubmit">确定上报</el-button>
    <el-button v-if="temperature" @click="edit">编辑</el-button>
  </div>
</template>
<script>
export default {
  name: "temperatureReport",
  data() {
    return {
      temperature: "",
      userInfo: {}
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
    }
  },
  methods: {
    // 上报体温
    confirmSubmit() {
      if (!this.temperature) {
        this.$message.warning("请输入您的体温！");
        return;
      }
      const params = {
        useeId: this.userInfo.userId,
        temperature: this.temperature
      };
    },
    // 编辑
    edit() {
      if (!this.temperature) {
        this.$message.warning("请输入您的体温！");
        return;
      }
      const params = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.input-style {
  margin-bottom: 20px;
}
</style>

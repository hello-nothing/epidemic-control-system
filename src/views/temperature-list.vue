<template>
  <div class="temperature-container wrapper">
    <div class="page-title">体温列表</div>
    <el-select
      v-model="className"
      placeholder="请选择班级"
      class="select-style"
    >
      <el-option
        v-for="item in classList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="temperature" label="温度" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)"
            >编辑体温</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑体温" :visible.sync="detailVisible" width="30%">
      <el-input
        class="select-style"
        v-model="temperature"
        placeholder="请输入您的温度"
      ></el-input>
      <el-button @click="confirm" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "temperatureList",
  data() {
    return {
      tableData: [
        {
          temperature: "37",
          userName: "葳蕤",
          createTime: "2016-05-03"
        }
      ],
      detailVisible: false,
      userInfo: {},
      className: "",
      classList: [
        {
          name: "一班",
          id: 0
        }
      ],
      temperature: ""
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
      this.getList();
    }
  },
  methods: {
    // 获取体温列表
    getList() {
      const params = {
        userId: this.userInfo.userId,
        userName: this.userInfo.userName,
        className: this.className
      };
    },
    // 编辑体温
    edit(item) {
      this.temperature = item.temperature;
      this.detailVisible = true;
    },
    // 确定
    confirm() {}
  }
};
</script>
<style lang="scss" scoped>
.select-style {
  margin-bottom: 30px;
}
</style>

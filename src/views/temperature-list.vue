<template>
  <div class="temperature-container wrapper">
    <div class="page-title">体温列表</div>
    <el-select
      v-model="className"
      placeholder="请选择学生"
      class="select-style"
      @change="classChange"
    >
      <el-option
        v-for="item in classList"
        :key="item.userId"
        :label="item.userName"
        :value="item.userId"
      >
      </el-option>
    </el-select>
    <el-table :data="tableData" border style="width: 100%;margin-bottom:30px;">
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
    <zhe-xian chartId="warn-container" :chartData="temperatureList"></zhe-xian>
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
import api from "../api/api";
import zheXian from "@/components/zheXian";

export default {
  name: "temperatureList",
  components: {
    zheXian
  },
  data() {
    return {
      tableData: [],
      detailVisible: false,
      userInfo: {},
      className: "",
      classList: [
        {
          name: "一班",
          id: 0
        }
      ],
      temperature: "",
      temperatureId: "",
      temUserId: "",
      temperatureList: []
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (info.userName) {
      this.userInfo = info;
      this.getStudentList();
      this.getList(info.userId)
    }
  },
  methods: {
    // 获取学生列表
    getStudentList() {
      api.getStudentList({ userId: this.userInfo.userId }).then(res => {
        const result = res.data;
        if (result.status === 200) {
          this.classList = result.data.list;
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    // 选择学生
    classChange(value) {
      this.temUserId = value;
      this.getStudenList(value);
    },
     // 获取体温列表
    getStudenList(id) {
      const params = {
        userId: id,
        type:0
      };
      api.getTemperatureList(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          this.tableData = result.data.list;
          this.temperatureList = result.data.list;
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    // 获取体温列表
    getList(id) {
      const params = {
        userId: id
      };
      api.getTemperatureList(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          this.tableData = result.data.list;
          this.temperatureList = result.data.list;
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    // 编辑体温
    edit(item) {
      this.temperature = item.temperature;
      this.temperatureId = item.temperatureId;
      this.detailVisible = true;
    },
    // 确定
    confirm() {
      const params = {
        userId: this.userInfo.userId,
        temperature: this.temperature,
        temperatureId: this.temperatureId
      };
      api.editTemperature(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("编辑成功！");
          this.detailVisible = false;
          this.getList();
        } else {
          this.$message.warning(result.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.select-style {
  margin-bottom: 30px;
}
</style>

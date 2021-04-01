<template>
  <div class="review-container wrapper">
    <div class="page-title">班级管理</div>
    <el-button
      type="primary"
      class="button-style"
      size="mini"
      @click="newAddGlass"
      >新增班级</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="className" label="班级名称" width="100">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteGlass(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增班级" :visible.sync="addVisible">
      <div class="list-box">
        <div class="list-title">班级名称：</div>
        <el-input
          class="select-style"
          v-model="className"
          placeholder="请输入班级名称"
        ></el-input>
      </div>
      <el-button @click="confirmAdd" type="primary">确定</el-button>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="deleteVisible" width="30%">
      <div class="delete-text">确认删除吗？</div>
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDelete">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "glassList",
  data() {
    return {
      tableData: [
        {
          uerName: "葳蕤",
          telephone: "1503274979",
          birthday: "2020-10-10 02:23:23",
          gender: "男",
          type: "学生",
          className: "计算机"
        }
      ],
      className: "",
      addVisible: false,
      deleteVisible: false
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
    // 新增班级
    newAddGlass() {
      this.addVisible = true;
    },
    // 确认新增
    confirmAdd() {
      if (!this.messageDesc) {
        this.$message.warning("请输入班级名称！");
        return;
      }
    },
    // 删除班级
    deleteGlass(item) {
      this.deleteVisible = true;
    },
    // 确认删除
    confirmDelete() {
      this.deleteVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .list-title {
    width: 100px;
    margin-right: 20px;
    text-align: right;
  }
  .select-style {
    flex: 1;
  }
}
</style>

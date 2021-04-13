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
      <el-table-column prop="department" label="院系名称" width="200">
      </el-table-column>
      <el-table-column prop="className" label="班级名称" width="200">
      </el-table-column>
      <el-table-column prop="teacherName" label="班级负责人" width="200">
      </el-table-column>
      <el-table-column prop="classNum" label="班级规定人数" width="200">
      </el-table-column>
      <el-table-column prop="nowClassNum" label="班级现有人数" width="200">
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
        <div class="list-title">院系名称：</div>
        <el-input
          v-model="addInfo.department"
          placeholder="请输入院系名称"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">班级名称：</div>
        <el-input
          v-model="addInfo.className"
          placeholder="请输入班级名称"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">班级负责人：</div>
        <el-input
          v-model="addInfo.teacherName"
          placeholder="请输入班级负责人"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">班级规定人数：</div>
        <el-input
          type="number"
          v-model="addInfo.classNum"
          placeholder="请输入班级规定人数"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">班级现有人数：</div>
        <el-input
          type="number"
          v-model="addInfo.nowClassNum"
          placeholder="请输入班级现有人数"
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
import api from "../api/api";
export default {
  name: "glassList",
  data() {
    return {
      tableData: [],
      className: "",
      addVisible: false,
      deleteVisible: false,
      deleteId: "",
      addInfo: {
        department: "",
        className: "",
        teacherName: "",
        classNum: 0,
        nowClassNum: 0
      }
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
      this.getGlassList();
    }
  },
  methods: {
    // 获取班级列表
    getGlassList() {
      api.getGlassList().then(res => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.tableData = result.data.list;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    // 新增班级
    newAddGlass() {
      this.addVisible = true;
    },
    // 确认新增
    confirmAdd() {
      if (!this.addInfo.department) {
        this.$message.warning("请输入院系名称！");
      } else if (!this.addInfo.className) {
        this.$message.warning("请输入班级名称！");
      } else if (!this.addInfo.teacherName) {
        this.$message.warning("请输入班级负责人！");
      } else if (this.addInfo.classNum <= 0) {
        this.$message.warning("班级规定人数不得小于0！");
      } else if (this.addInfo.nowClassNum <= 0) {
        this.$message.warning("班级现有人数不得小于0！");
      } else {
        const params = {
          className: this.className,
          userId: this.userInfo.userId
        };
        api.addGlass(params).then(res => {
          console.log(res);
          const result = res.data;
          if (result.status === 200) {
            this.$message.success("新增成功！");
            this.getGlassList();
            this.addVisible = false;
          } else {
            this.$message.wraning(result.message);
          }
        });
      }
    },
    // 删除班级
    deleteGlass(item) {
      this.deleteVisible = true;
      this.deleteId = item.classId;
    },
    // 确认删除
    confirmDelete() {
      api.deleteGlass({ classId: this.deleteId }).then(res => {
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("删除成功！");
          this.deleteVisible = false;
          this.className = "";
          this.getGlassList();
        } else {
          this.$message.wraning("删除失败！");
        }
      });
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
    width: 130px;
    margin-right: 20px;
    text-align: right;
  }
  .select-style {
    flex: 1;
  }
}
</style>

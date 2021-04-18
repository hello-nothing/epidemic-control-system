<template>
  <div class="tips-container wrapper">
    <div class="page-title">防疫小知识</div>
    <el-button v-if="userInfo.type != 3" type="primary" class="add-button" @click="newAdd"
      >新增</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="description" label="内容" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="edit(scope.row)"
            >编辑</el-button
          > -->
          <el-button v-if="userInfo.type != 3" size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-box"
      background
      @current-change="listCurrentChange"
      layout="prev, pager, next"
      :total="listTotal"
    >
    </el-pagination>
    <el-dialog title="删除" :visible.sync="deleteVisible" width="30%">
      <div class="delete-text">确认删除吗？</div>
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDelete">确 定</el-button>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="50%">
      <el-input
        class="select-style"
        v-model="title"
        placeholder="请输入标题"
      ></el-input>
      <el-input
        type="textarea"
        class="select-style"
        v-model="description"
        placeholder="请输入描述"
      ></el-input>
      <el-button @click="confirm" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import api from "../api/api";
export default {
  name: "tips",
  data() {
    return {
      tableData: [],
      deleteVisible: false,
      questionId: "",
      userInfo: {},
      title: "",
      description: "",
      addVisible: false,
      currentPage: 1,
      listTotal: 0,
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
      this.getQuestionList();
    }
  },
  methods: {
    listCurrentChange(val) {
      this.currentPage = val;
      this.getQuestionList();
    },
    // 删除
    handleDelete(item) {
      this.questionId = item.questionId;
      this.deleteVisible = true;
    },
    // 确认删除
    confirmDelete() {
      const param = {
        questionId: this.questionId,
      };
      api.deleteQuestion(param).then((res) => {
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("删除成功！");
          this.deleteVisible = false;
          this.currentPage = 1;
          this.getQuestionList();
        } else {
          this.$message.wraning("删除失败！");
        }
      });
    },
    // 新增防疫小知识
    newAdd() {
      this.addVisible = true;
    },
    // 获取防疫小知识
    getQuestionList() {
      const params = {
        pageSize: 5,
        currentPage: this.currentPage,
      };
      api.getQuestionList(params).then((res) => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.tableData = result.data.list;
          this.listTotal = result.data.total;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    // 确认新增
    confirm() {
      if (!this.title) {
        this.$message.warning("请输入标题!");
        return;
      }
      if (!this.description) {
        this.$message.warning("请输入描述!");
        return;
      }
      const params = {
        userId: this.userInfo.userId,
        title: this.title,
        description: this.description,
      };
      api.saveQuestion(params).then((res) => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("新增成功！");
          this.currentPage = 1;
          this.getQuestionList();
          this.addVisible = false;
        } else {
          this.$message.wraning(result.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-button,
.delete-text,
.select-style {
  margin-bottom: 30px;
}
</style>

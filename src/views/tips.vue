<template>
  <div class="tips-container wrapper">
    <div class="page-title">防疫小知识</div>
    <el-button type="primary" class="add-button" @click="newAdd"
      >新增</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="description" label="内容" width="180">
      </el-table-column>
      <el-table-column prop="views" label="浏览量" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="edit(scope.row)"
            >编辑</el-button
          > -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="删除" :visible.sync="deleteVisible" width="30%">
      <div class="delete-text">确认删除吗？</div>
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDelete">确 定</el-button>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-input
        class="select-style"
        v-model="title"
        placeholder="请输入标题"
      ></el-input>
      <el-input
        class="select-style"
        v-model="description"
        placeholder="请输入描述"
      ></el-input>
      <el-button @click="confirm" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tips",
  data() {
    return {
      tableData: [
        {
          title: "标题",
          createTime: "2016-05-03",
          description: "公告内容",
          views: "22"
        }
      ],
      deleteVisible: false,
      questionId: "",
      userInfo: {},
      title: "",
      description: "",
      addVisible: false
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
    // 删除
    handleDelete(item) {
      this.questionId = item.questionId;
      this.deleteVisible = true;
    },
    // 确认删除
    confirmDelete() {
      const param = {
        questionId: this.questionId
      };
    },
    // 新增防疫小知识
    newAdd() {
      this.addVisible = true;
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
        description: this.description
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.add-button,
.delete-text,
.select-style {
  margin-bottom: 30px;
}
</style>

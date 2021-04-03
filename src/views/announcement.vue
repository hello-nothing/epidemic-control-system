<template>
  <div class="announce-container wrapper">
    <div class="page-title">疫情公告</div>
    <el-button type="primary" class="add-button" @click="newAdd"
      >新增公告</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="description" label="公告内容" width="180">
      </el-table-column>
      <el-table-column prop="views" label="浏览量" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookDetail(scope.row)"
            >查看详情</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" type="" @click="lookMessage(scope.row)"
            >查看留言</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="删除" :visible.sync="deleteVisible" width="50%">
      <div class="delete-text">确认删除吗？</div>
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDelete">确 定</el-button>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detailVisible" width="50%">
      <div class="title-detail">
        公告内容：<span>{{ detailInfo.description }}</span>
      </div>
      <!-- <div class="title-detail">
        公告类型：<span>{{ detailInfo.type }}</span>
      </div> -->
      <div class="title-detail">
        浏览量：<span>{{ detailInfo.views }}</span>
      </div>
      <div class="title-detail">
        创建时间：<span>{{ detailInfo.createTime }}</span>
      </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="50%">
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
  name: "announcement",
  data() {
    return {
      tableData: [],
      deleteVisible: false,
      deleteId: "",
      currentPage: 1,
      pageSize: 10,
      detailInfo: {
        description: "",
        type: "",
        views: "",
        createTime: "",
      },
      detailVisible: false,
      addVisible: false,
      description: "",
      userInfo: {},
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (info.userName) {
      this.userInfo = info;
    }
    this.getList();
  },
  methods: {
    // 查看留言
    lookMessage(item) {
      this.$router.push({ path: "/leaveMessage", query: {id: item.noticeId }});
    },
    // 新增公告
    newAdd() {
      this.addVisible = true;
    },
    // 确认新增
    confirm() {
      if (!this.description) {
        this.$message.wraning("请输入公告描述!");
        return;
      }
      const params = {
        userId: this.userInfo.userId,
        description: this.description,
      };
      api.addAnnouncement(params).then((res) => {
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("新增成功！");
          this.addVisible = false;
        } else {
          this.$message.wraning(result.message);
        }
      });
    },
    // 获取公告列表
    getList() {
      const params = {
        description: "",
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      api.getAnnounceList(params).then((res) => {
        const result = res.data;
        if (result.status === 200) {
          this.tableData = result.data.list;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    // 查看公告详情
    lookDetail(item) {
      const params = {
        noticeId: item.noticeId,
      };
      api.getAnnounceDetail(params).then((res) => {
        const result = res.data;
        if (result.status === 200) {
          this.detailInfo = item;
          this.detailVisible = true;
          this.getList();
        } else {
          this.$message.wraning("查看失败！");
        }
      });
    },
    // 删除公告
    handleDelete(item) {
      this.deleteVisible = true;
      this.deleteId = item.noticeId;
    },
    // 确认删除
    confirmDelete() {
      const param = {
        noticeId: this.deleteId,
      };
      api.deleteAnnounce(param).then((res) => {
        const result = res.data;
        if (result.status === 200) {
          this.$message.success("删除成功！");
          this.deleteVisible = true;
          this.getList();
        } else {
          this.$message.wraning("查看失败！");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-button,
.delete-text {
  margin-bottom: 30px;
}
.title-detail {
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  span {
    font-weight: normal;
  }
}
</style>

<template>
  <div class="announce-container wrapper">
    <div class="page-title">疫情公告</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="description" label="公告内容" width="180">
      </el-table-column>
      <el-table-column prop="views" label="浏览量" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookDetail(scope.row)"
            >查看</el-button
          >
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
    <el-dialog title="详情" :visible.sync="detailVisible" width="30%">
      <div class="title-detail">
        公告内容：<span>{{ detailInfo.description }}</span>
      </div>
      <div class="title-detail">
        公告类型：<span>{{ detailInfo.type }}</span>
      </div>
      <div class="title-detail">
        浏览量：<span>{{ detailInfo.views }}</span>
      </div>
      <div class="title-detail">
        创建时间：<span>{{ detailInfo.createTime }}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "announcement",
  data() {
    return {
      tableData: [
        {
          createTime: "2016-05-03",
          type: "老师",
          description: "公告内容",
          views: "22"
        }
      ],
      deleteVisible: false,
      deleteId: "",
      currentPage: 1,
      pageSize: 10,
      detailInfo: {
        description: "",
        type: "",
        views: "",
        createTime: ""
      },
      detailVisible: false
    };
  },
  methods: {
    // 获取公告列表
    getList() {
      const params = {
        description: "",
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
    },
    // 查看公告详情
    lookDetail(item) {
      this.detailInfo = item;
      this.detailVisible = true;
    },
    // 删除公告
    handleDelete(item) {
      this.deleteVisible = true;
      this.deleteId = item.noticeId;
    },
    // 确认删除
    confirmDelete() {
      const param = {
        noticeId: this.deleteId
      };
    }
  }
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

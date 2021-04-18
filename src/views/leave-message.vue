<template>
  <div class="page-container wrapper">
    <div class="page-title">留言内容</div>
    <el-button
      type="primary"
      class="button-style"
      size="mini"
      @click="newAddMessage"
      >新增留言</el-button
    >
    <div class="message-box" v-for="(item, index) in messageList" :key="index">
      <div class="top-box">
        <div>留言昵称：{{ item.userName }}</div>
        <div>留言时间：{{ item.createTime }}</div>
      </div>
      <div class="content-words">留言内容：{{ item.description }}</div>
      <el-button
        class="button-style"
        type="primary"
        size="mini"
        @click="reply(item, index)"
        >回复留言</el-button
      >
      <el-button
        class="button-style"
        type=""
        size="mini"
        @click="lookReply(item)"
        >查看回复</el-button
      >
      <el-button class="button-style" size="mini" @click="deleteMessage(item)"
        >删除留言</el-button
      >
      <div v-show="item.isReply" class="reply-box">
        <el-input
          class="button-style"
          type="textarea"
          v-model="replyDesc"
        ></el-input>
        <el-button
          type="primary"
          class="button-style"
          size="mini"
          @click="confirmReply(item)"
          >确定</el-button
        >
        <el-button size="mini" class="button-style" @click="cancelReply(item)"
          >取消</el-button
        >
      </div>
    </div>
    <el-pagination
      class="page-box"
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="pageTotal"
    >
    </el-pagination>
    <el-dialog title="添加留言" :visible.sync="addVisible" width="30%">
      <el-input
        class="button-style"
        type="textarea"
        v-model="messageDesc"
      ></el-input>
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="deleteVisible" width="30%">
      <div class="delete-text">确认删除吗？</div>
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDelete">确 定</el-button>
    </el-dialog>
    <el-dialog title="回复列表" :visible.sync="detailVisible" width="50%">
      <div
        class="reply-list-box"
        v-for="(item, index) in replyList"
        :key="index"
      >
        <div class="title-detail">
          回复内容：<span>{{ item.description }}</span>
        </div>
        <div class="title-detail">
          回复时间：<span>{{ item.createTime }}</span>
        </div>
      </div>
      <el-pagination
        class="page-box"
        background
        @current-change="replyCurrentChange"
        layout="prev, pager, next"
        :total="replyTotal"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import api from "../api/api";
export default {
  name: "leaveMessage",
  data() {
    return {
      messageList: [],
      deleteVisible: false,
      replyDesc: "", // 回复内容
      isReply: false, // 显示回复框
      addVisible: false,
      messageDesc: "",
      pageTotal: 1,
      replyId: "",
      userInfo: {},
      messageId: "",
      detailVisible: false,
      replyList: [],
      replyTotal: 1000,
      replyPage: 1,
      messagePage: 1,
      messageDeleteId: ""
    };
  },
  mounted() {
    const id = this.$route.query;
    console.log(id);
    if (id.id) {
      this.getMessageList(id.id);
      this.messageId = id.id;
    }
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (info.userName) {
      this.userInfo = info;
    }
  },
  methods: {
    // 查看回复列表
    lookReply(item) {
      // this.replyList
      const params = {
        currentPage: this.replyPage,
        pageSize: 20,
        description: item.inquireId
      };
      api.getReplyList(params).then(res => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.replyList = result.data.list;
          this.detailVisible = true;
          this.replyTotal = result.data.total;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    replyCurrentChange(val) {
      this.replyPage = val;
      this.getReplyList();
    },
    // 页码改变
    handleCurrentChange(val) {
      console.log(val);
      this.messagePage = val;
      this.getMessageList(this.messageId);
    },
    // 获取留言列表
    getMessageList(id) {
      const params = {
        currentPage: this.messagePage,
        pageSize: 5,
        noticeId: id
      };
      api.getMessageList(params).then(res => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.messageList = result.data.list;
          this.messageList.forEach(ele => {
            ele.isReply = false;
          });
          this.pageTotal = result.data.total;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    // 回复留言
    reply(item, index) {
      console.log(item);
      item.isReply = true;
      this.replyId = item.inquireId;
      this.$forceUpdate();
    },
    // 确定回复
    confirmReply() {
      if (!this.replyDesc) {
        this.$message.warning("请输入内容！");
        return;
      }
      const params = {
        inquireId: this.replyId,
        description: this.replyDesc,
        userId: this.userInfo.userId
      };
      api.saveReplay(params).then(res => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.messageList.forEach(ele => {
            ele.isReply = false;
          });
          this.getMessageList(this.messageId);
          this.$forceUpdate();
          this.$message.success("回复成功！");
        } else {
          this.$message.wraning(result.message);
        }
      });
    },
    // 取消回复
    cancelReply(item) {
      item.isReply = false;
      this.replyDesc = "";
    },
    // 新增留言
    newAddMessage() {
      this.addVisible = true;
    },
    // 确认新增
    confirmAdd() {
      if (!this.messageDesc) {
        this.$message.warning("请输入留言内容！");
        return;
      }
    },
    // 删除留言
    deleteMessage(item) {
      console.log(item);
      this.deleteVisible = true;
      this.messageDeleteId = item.inquireId;
    },
    // 确认删除
    confirmDelete() {
      api
        .deleteMessage({
          inquireId: this.messageDeleteId,
          userId: this.userInfo.userId
        })
        .then(res => {
          console.log(res);
          const result = res.data;
          if (result.status === 200) {
            this.$message.success("删除成功！");
            this.deleteVisible = false;
          } else {
            this.$message.warning(result.message);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.message-box {
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 1px dashed #eeeeee;
}
.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}
.content-words,
.reply-list-box {
  padding-bottom: 20px;
}
.reply-list-box {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.reply-box {
  padding: 0 50px;
}
</style>

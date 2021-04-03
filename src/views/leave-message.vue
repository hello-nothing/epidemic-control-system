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
      <div class="content-words">{{ item.description }}</div>
      <el-button
        class="button-style"
        type="primary"
        size="mini"
        @click="reply(item)"
        >回复留言</el-button
      >
      <el-button class="button-style" size="mini" @click="deleteMessage(item)"
        >删除留言</el-button
      >
      <div v-if="item.isReply" class="reply-box">
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
  </div>
</template>
<script>
export default {
  name: "leaveMessage",
  data() {
    return {
      messageList: [
        {
          isReply: false, // 显示回复框
          description: "公告内容",
          userName: "葳蕤",
          createTime: "2020-10-10 02:01:01",
          replayList: [
            {
              replayId: "1",
              description: "回复", //回复内容
              userId: "3", //用户id
              createTime: "2020-10-10 02:01:01", //回复时间
              userName: "name" //用户昵称
            }
          ]
        },
        {
          isReply: false, // 显示回复框
          description: "公告内容",
          userName: "葳蕤",
          createTime: "2020-10-10 02:01:01",
          replayList: [
            {
              replayId: "1",
              description: "回复", //回复内容
              userId: "3", //用户id
              createTime: "2020-10-10 02:01:01", //回复时间
              userName: "name" //用户昵称
            }
          ]
        }
      ],
      deleteVisible: false,
      replyDesc: "", // 回复内容
      isReply: false, // 显示回复框
      addVisible: false,
      messageDesc: ""
    };
  },
  methods: {
    // 回复留言
    reply(item) {
      item.isReply = true;
    },
    // 确定回复
    confirmReply() {
      if (!this.replyDesc) {
        this.$message.warning("请输入内容！");
        return;
      }
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
.content-words {
  padding-bottom: 20px;
}
.reply-box {
  padding: 0 50px;
}
</style>

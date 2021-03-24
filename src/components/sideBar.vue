<template>
  <div class="head-container">
    <div class="head-top-box">
      <div class="head-title">
        <i
          class="el-icon-s-unfold iconfont"
          v-if="isCollapse"
          @click="isCollapse = false"
        ></i>
        <i
          class="el-icon-s-fold iconfont"
          v-else
          @click="isCollapse = true"
        ></i>
        校园疫情防控信息管理系统
      </div>
      <div class="right-box">
        <div class="user-box" v-if="userName">欢迎你，{{ userName }}</div>
        <div class="no-login" v-else>未登录</div>
        <i class="el-icon-switch-button setting-img" @click="exit"></i>
      </div>
    </div>
    <div class="index-content">
      <el-menu
        :collapse="isCollapse"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in navList"
          :key="index"
          :index="item.id"
          @click="selectNav(item, index)"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
      <slot></slot>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否退出登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { apiCollection, apiResource, apiFormSubmit } from "../api/index";

export default {
  name: "headerComBox",
  computed: {
    ...mapState({
      userName: state => state.name
    })
  },
  data() {
    return {
      dialogVisible: false,
      isCollapse: false,
      navList: [
        {
          name: "首页",
          id: "0",
          url: "/"
        },
        {
          name: "疫情公告",
          id: "1",
          url: "/announcement"
        },
        {
          name: "疫情数据",
          id: "2",
          url: "/epidemicData"
        },
        {
          name: "上报体温",
          id: "3",
          url: "/temperatureReport"
        },
        {
          name: "查看留言",
          id: "4",
          url: "/leaveMessage"
        },
        {
          name: "审核列表",
          id: "4",
          url: "/reviewList"
        },
        {
          name: "设置",
          id: "5",
          url: "/setting"
        }
        // {
        //   name: "用户管理",
        //   id: "7",
        //   url: "/userManage"
        // }
      ]
    };
  },
  created() {},
  methods: {
    ...mapMutations(["getUserName"]),
    // 退出登录
    exit() {
      this.dialogVisible = true;
    },
    confirm() {
      const arr = [apiCollection, apiResource, apiFormSubmit];
      arr.forEach(item => {
        item.defaults.headers["x-token"] = "";
      });
      localStorage.removeItem("isLogin");
      this.getUserName("");
      this.$router.replace({ path: "/login" });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 侧边栏选择
    selectNav(item, index) {
      this.$router.push(item.url);
    }
  }
};
</script>
<style lang="scss" scoped>
.head-container {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .head-top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 32px;
    background-color: #ffffff;
    box-shadow: 1px 2px 3px 0 #cacaca;
  }
  .head-title {
    font-size: 24px;
    font-weight: bold;
    .iconfont {
      cursor: pointer;
    }
  }
  .right-box {
    display: flex;
    position: relative;
    cursor: pointer;
    &:hover {
      .exit-box {
        display: block;
      }
    }
  }
  .user-box {
    font-size: 16px;
  }
  .setting-img {
    margin-left: 20px;
    font-size: 20px;
  }
  .index-content {
    display: flex;
    height: calc(100% - 60px);
  }
  .el-menu-vertical-demo {
    text-align: left;
    .el-menu-item {
      font-size: 16px;
    }
  }
}
</style>

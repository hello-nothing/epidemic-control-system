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
        <div class="user-box" v-if="userInfo.userName">欢迎你，{{ userInfo.userName }}</div>
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
          id: "1",
          url: "/"
        },
        {
          name: "疫情公告",
          id: "2",
          url: "/announcement"
        },
        {
          name: "疫情数据",
          id: "3",
          url: "/epidemicData"
        },
        {
          name: "防疫小知识",
          id: "4",
          url: "/tips"
        },
        {
          name: "上报体温",
          id: "5",
          url: "/temperatureReport"
        },
        {
          name: "体温列表",
          id: "6",
          url: "/temperatureList"
        },
        {
          name: "班级管理",
          id: "7",
          url: "/glassList"
        },
        {
          name: "用户管理",
          id: "8",
          url: "/reviewList"
        },
        {
          name: "设置",
          id: "9",
          url: "/setting"
        }
        // {
        //   name: "用户管理",
        //   id: "7",
        //   url: "/userManage"
        // }
      ],
      userInfo: {}
    };
  },
  created() {},
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
    }
  },
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
      if (this.userInfo.type === "学生" && item.url === "/temperatureList") {
        this.$message.warning("权限不足！");
        return;
      }
      if (this.userInfo.type === "教师" && item.url === "/temperatureReport") {
        this.$message.warning("权限不足！");
        return;
      }
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

<template>
  <div class="index-container" :style="{ backgroundImage: 'url(' + img + ')' }">
    <div class="logo-title-box">
      <div class="title-text">校园疫情防控信息管理系统</div>
    </div>
    <div class="login-module">
      <div class="login-title">请登录</div>
      <div class="prompt-message">登录失败请检查您的用户名和密码!</div>
      <div class="login-input-box">
        <div class="input-title">账号：</div>
        <el-input
          v-model="account"
          prefix-icon="el-icon-user"
          placeholder="请输入账号"
        ></el-input>
      </div>
      <div class="login-input-box">
        <div class="input-title">密码：</div>
        <el-input
          prefix-icon="el-icon-lock"
          v-model="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </div>
      <div class="login-button-box">
        <input class="login-button" disabled type="text" name="" id="" />
        <div class="login-text" @click="login">登录</div>
      </div>
      <div class="last-module">
        <div class="remember-text" @click="regist">注册</div>
        <div class="forger-text" @click="forgetPassword">忘记密码?</div>
      </div>
    </div>
    <el-dialog title="用户注册" :visible.sync="addVisible">
      <div class="list-box">
        <div class="list-title">用户名：</div>
        <el-input v-model="info.userName" placeholder="请输入用户名"></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">密码：</div>
        <el-input v-model="info.password" placeholder="请输入密码"></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">手机号：</div>
        <el-input
          v-model="info.telephone"
          placeholder="请输入手机号"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">姓别：</div>
        <el-select v-model="info.gender" placeholder="请选择性别">
          <el-option
            v-for="item in sexList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="list-box">
        <div class="list-title">出生年月日：</div>
        <el-date-picker
          v-model="info.birthday"
          type="date"
          placeholder="请选择你的出生年月日"
        >
        </el-date-picker>
      </div>
      <div class="list-box">
        <div class="list-title">班级选择：</div>
        <el-select v-model="info.className" placeholder="请选择班级">
          <el-option
            v-for="item in glassList"
            :key="item.className"
            :label="item.className"
            :value="item.className"
          >
          </el-option>
        </el-select>
      </div>
      <div class="list-box">
        <div class="list-title">用户类型：</div>
        <el-select v-model="info.type">
          <el-option label="学生" value="3"></el-option>
          <el-option label="老师 " value="2
          "></el-option>
          <el-option label="管理员" value="1"></el-option>
        </el-select>
      </div>
      <el-button @click="confirmAdd" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import api from "../api/api";
import backgroundImg from "../assets/background.png";
export default {
  data() {
    return {
      img: backgroundImg,
      password: "",
      account: "",
      info: {
        userName: "",
        password: "",
        type: "",
        telephone: "",
        gender: "",
        birthday: "",
        className: ""
      },
      addVisible: false,
      sexList: [
        {
          name: "男",
          id: 1
        },
        {
          name: "女",
          id: 2
        }
      ],
      glassList: []
    };
  },

  mounted() {
    this.getGlassList();
  },
  methods: {
    // 忘记密码
    forgetPassword() {
      this.$message.info("请联系管理员修改密码！");
    },
    // 获取班级
    getGlassList() {
      api.getGlassList().then(res => {
        console.log(res);
        const result = res.data;
        if (result.status === 200) {
          this.glassList = result.data.list;
        } else {
          this.$message.wraning("获取数据失败！");
        }
      });
    },
    // 注册
    regist() {
      this.addVisible = true;
    },
    // 确认注册
    confirmAdd() {
      if (!this.info.userName) {
        this.$message.warning("请输入用户名!");
      } else if (!this.info.password) {
        this.$message.warning("请输入密码!");
      } else if (!this.info.type) {
        this.$message.warning("请选择用户类型!");
      } else {
        for (let i = 0; i < this.glassList.length; i++) {
          if (this.glassList[i].className === this.info.className) {
            this.info.classId = this.glassList[i].classId;
          }
        }
        console.log(this.info);
        api.regist(this.info).then(res => {
          console.log(res);
          const result = res.data;
          if (result.status === 200) {
            this.$message.success("注册成功！");
            this.addVisible = false;
          } else {
            this.$message.warning(result.message);
          }
        });
      }
    },
    // 登录
    login() {
      if (!this.account) {
        this.$message.warning("请输入账号！");
      } else if (!this.password) {
        this.$message.warning("请输入密码！");
      } else {
        const params = {
          userName: this.account,
          password: this.password
        };
        api.login(params).then(res => {
          console.log(res);
          const result = res.data;
          if (result.status === 200) {
            window.localStorage.setItem("isLogin", true);
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(result.data)
            );
            this.$message.success("登录成功！");
            this.$router.replace({ path: "/" });
          } else {
            this.$message.warning(result.message);
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index-container {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .logo-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 100px 0 94px;
  }
  .title-text {
    padding-left: 40px;
    font-size: 66px;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0px 0px 10px rgba(102, 54, 13, 0.6);
  }

  .have-message {
    height: 513px;
  }
  .login-module {
    width: 400px;
    margin: 0 auto;
    padding: 38px 56px 50px;
    background-color: #ffffff;
  }
  .prompt-message {
    display: none;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 16px;
    color: #873a3a;
    background-color: #ffc6c6;
    border-radius: 4px;
  }
  .login-title {
    position: relative;
    margin-bottom: 50px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    line-height: 22px;
  }
  .login-title::after {
    position: absolute;
    bottom: -16px;
    left: 45%;
    width: 40px;
    height: 4px;
    background: linear-gradient(
      90deg,
      rgba(0, 143, 226, 1) 0%,
      rgba(0, 178, 156, 1) 100%
    );
    content: "";
  }
  .login-input-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .input-title {
    padding-right: 20px;
    font-size: 16px;
  }
  .code-title {
    padding-right: 4px;
  }
  .input-pattern {
    flex: 1;
    padding: 0 24px;
    line-height: 48px;
    outline: none;
    background: rgba(250, 252, 254, 1);
    border: 1px solid rgba(223, 232, 241, 1);
    border-radius: 4px;
  }
  .code-input {
    width: 100px;
    line-height: 38px;
  }
  .again-button {
    margin-left: 16px;
    font-size: 14px;
    color: #666666;
    text-align: center;
    cursor: pointer;
  }
  .again-button:hover {
    color: #008fe2;
  }
  .code-image {
    width: 90px;
    height: 38px;
    margin-left: 16px;
    line-height: 38px;
    font-size: 16px;
    text-align: center;
    border: 1px solid rgba(223, 232, 241, 1);
    border-radius: 4px;
  }
  /deep/ .el-input {
    flex: 1;
  }
  .login-button-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 22px;
    background: linear-gradient(
      90deg,
      rgba(0, 143, 226, 1) 0%,
      rgba(0, 178, 156, 1) 100%
    );
    border-radius: 4px;
    cursor: pointer;
  }
  .login-button {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
  }
  .login-text {
    position: absolute;
    top: 16px;
    width: 100%;
    font-size: 18px;
    line-height: 18px;
    color: #ffffff;
    text-align: center;
  }
  .last-module {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .remember-choose {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .hidden-button {
    display: none;
  }
  .active-image {
    width: 20px;
    height: 20px;
    // background-image: url(../images/active.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .no-choose {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgba(223, 232, 241, 1);
  }
  .remember-text {
    padding-left: 14px;
    cursor: pointer;
    &:hover {
      color: #008fe2;
    }
  }
  .forger-text {
    color: #999999;
    cursor: pointer;
    &:hover {
      color: #008fe2;
    }
  }
    @media screen and (max-width: 750px) {
    .title-text {
      padding: 0;
      font-size: 30px;
      text-align: center;
    }
    .logo-title-box{
      padding-bottom: 10px;
    }
    .login-module {
      width: calc(100% - 100px);
      padding: 38px 20px 50px;
    }
  }
}
.list-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .list-title {
    width: 100px;
    text-align: right;
  }
}
@media screen and (max-width: 750px) {
  .index-container {
    width: 100%;
    height: 100%;
  }
}
</style>

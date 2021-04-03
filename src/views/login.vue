<template>
  <div class="index-container" :style="{ backgroundImage: 'url(' + img + ')' }">
    <div class="logo-title-box">
      <div class="title-text">校园疫情防控信息管理系统</div>
      <div
        class="title-image"
        style="background-image: url(assets/mobileTitle.png);"
      ></div>
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
        <div class="remember-text">注册</div>
        <div class="forger-text">忘记密码?</div>
      </div>
    </div>
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
      account: ""
    };
  },

  mounted() {},
  methods: {
    login() {
      if (!this.account) {
        this.message.warning("请输入账号！");
      } else if (!this.password) {
        this.message.warning("请输入密码！");
      } else {
        const params = {
          userName: this.account,
          passWord: this.password
        };
        window.localStorage.setItem("isLogin", true);
        const userInfo = {
          userName: "葳蕤",
          userId: "222",
          type: "学生",
        };
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$router.replace({ path: "/" });
        // api.login(params).then(res=> {
        //   console.log(res);
        //   const result = res;
        // })
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
  .logo-image {
    width: 101px;
    height: 107px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .title-image {
    display: none;
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
}
</style>

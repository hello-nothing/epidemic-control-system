<template>
  <div class="index-container" :style="{ backgroundImage: 'url(' + img + ')' }">
    <div class="logo-title-box">
      <div class="title-text">校园疫情防控信息管理系统</div>
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
    login() {}
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
}
</style>

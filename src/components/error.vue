<template>
  <div class="page-container-one">
    <img :src="img" class="error-image" alt="error" />
    <div class="text-content">
      <div class="text-two">抱歉，您访问的页面出错啦</div>
      <div class="text-one">建议你去别处看看...</div>
      <div class="button" @click="back()">去首页</div>
    </div>
  </div>
</template>

<script>
import errorImg from "@/assets/error-one.png";
export default {
  components: {},
  name: "error",
  data() {
    return {
      img: errorImg
    };
  },
  methods: {
    // 返回
    back() {
      this.$router.replace({ path: "/" });
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-container-one {
  width: 100%;
  height: 100%;
  padding-top: 220px;
  text-align: center;
  background-color: #fff;
  .error-image {
    width: 200px;
    height: 164px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .text-content {
    padding-top: 10px;
    text-align: center;
  }

  .text-two {
    padding: 24px 0 12px 0;
    font-size: 20px;
    color: #2f2f4f;
    font-weight: 700;
  }
  .text-one {
    padding-bottom: 40px;
    font-size: 14px;
    color: #697386;
  }

  .button {
    width: 124px;
    margin: 0 auto;
    line-height: 42px;
    font-size: 17px;
    color: #0066ff;
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #0066ff;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>

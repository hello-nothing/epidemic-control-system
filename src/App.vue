<template>
  <div id="app">
    <side-bar v-if="$route.name !== 'login'">
      <router-view />
    </side-bar>
    <router-view v-else />
  </div>
</template>

<script>
import {
  apiCollection,
  apiResource,
  apiFormSubmit,
  apiDelete,
  apiPut
} from "./api/index";
import router from "./router";
import sideBar from "@/components/sideBar";

export default {
  name: "App",
  components: {
    sideBar
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    const loginToken = localStorage.getItem("x-token");
    const arr = [apiCollection, apiResource, apiFormSubmit, apiDelete, apiPut];
    if (loginToken) {
      arr.forEach(item => {
        item.defaults.headers["x-token"] = loginToken;
      });
      setTimeout(() => {
        router.push("/").catch(data => {});
      }, 100);
    }
  }
};
</script>

<style>
#app {
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
p {
  margin: 0;
}
.wrapper {
  padding: 32px;
}
.page-title {
  padding-bottom: 30px;
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
</style>

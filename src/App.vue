<template>
  <div id="app">
    <router-view />
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

export default {
  name: "App",
  components: {
    
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
</style>

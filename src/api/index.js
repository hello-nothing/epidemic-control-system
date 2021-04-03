import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "../router";
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

let baseurl = process.env.NODE_ENV === "production" ? "" : "http://38670m585s.zicp.vip";

export let apiCollection = Vue.axios.create({
  method: "GET",
  baseURL: baseurl
});

export let apiResource = Vue.axios.create({
  method: "POST",
  baseURL: baseurl
});
export let apiFormSubmit = Vue.axios.create({
  method: "POST",
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
const axiosInstace = [
  apiCollection,
  apiResource,
  apiFormSubmit,
];
axiosInstace.forEach(item => {
  item.defaults.withCredentials = true;
  item.defaults.headers["Requested-with"] = "restful";
  item.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error && error.response) {
        router.push("/error");
      }
    }
  );
});

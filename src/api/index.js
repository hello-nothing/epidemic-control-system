import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "../router";
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

let baseurl = process.env.NODE_ENV === "production" ? "" : "";
let imageUrl =
  process.env.NODE_ENV === "production"
    ? "http://192.168.0.189:9010"
    : "http://192.168.0.189:9010";

export let imgUrl = imageUrl;
export const upload_url = "http://192.168.0.189:9010/public/upload";
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

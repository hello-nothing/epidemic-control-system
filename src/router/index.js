import Vue from "vue";
import Router from "vue-router";
import Error from "@/components/error";
import Login from "@/views/login";
import Index from "@/views/index";
Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        noNeedLogin: true,
        title: "登录"
      }
    },
    {
      path: "/error",
      name: "error",
      component: Error,
      meta: {
        title: "出错了"
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!to.meta.noNeedLogin) {
    if (window.localStorage.getItem("isLogin")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
router.afterEach(function(to, from) {
  document.title = to.meta.title; //跳转后设置页面的title
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;

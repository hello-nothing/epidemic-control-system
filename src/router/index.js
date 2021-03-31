import Vue from "vue";
import Router from "vue-router";
import Error from "@/components/error";
import Login from "@/views/login";
import Index from "@/views/index";
import Announcement from "@/views/announcement";
import  TemperatureList from "@/views/temperature-list";
import EpidemicData from "@/views/epidemic-data";
import LeaveMessage from "@/views/leave-message";
import ReviewList from "@/views/review-list";
import Setting from "@/views/setting";
import TemperatureReport from "@/views/temperature-report";
import Tips from "@/views/tips";

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
      path: "/announcement",
      name: "announcement",
      component: Announcement,
      meta: {
        title: "疫情公告"
      }
    },
    {
      path: "/tips",
      name: "tips",
      component: Tips,
      meta: {
        title: "防疫小知识"
      }
    },
    {
      path: "/temperatureList",
      name: "temperatureList",
      component: TemperatureList,
      meta: {
        title: "体温列表"
      }
    },
    {
      path: "/epidemicData",
      name: "epidemicData",
      component: EpidemicData,
      meta: {
        title: "疫情数据"
      }
    },
    {
      path: "/leaveMessage",
      name: "leaveMessage",
      component: LeaveMessage,
      meta: {
        noNeedLogin: true,
        title: "留言板"
      }
    },
    {
      path: "/reviewList",
      name: "reviewList",
      component: ReviewList,
      meta: {
        noNeedLogin: true,
        title: "用户管理"
      }
    },
    {
      path: "/temperatureReport",
      name: "temperatureReport",
      component: TemperatureReport,
      meta: {
        noNeedLogin: true,
        title: "体温看板"
      }
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting,
      meta: {
        noNeedLogin: true,
        title: "设置"
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

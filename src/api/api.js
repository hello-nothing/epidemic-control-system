import {
  apiCollection,
  apiResource,
  apiFormSubmit,
  apiDelete,
  apiPut
} from "./index";
export default {
  login: opts => {
    return apiResource({ url: "/user/login/v1", data: opts });
  },
  // 关于我门信息管理模块
  getAboutInfo: opts => {
    return apiCollection({ url: "/back/about", params: { ...opts } });
  },

};

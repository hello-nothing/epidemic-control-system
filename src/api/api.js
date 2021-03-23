import {
  apiCollection,
  apiResource,
  apiFormSubmit,
  apiDelete,
  apiPut
} from "./index";
export default {
  login: opts => {
    return apiResource({ url: "/back/login", data: opts });
  },
  // 关于我门信息管理模块
  getAboutInfo: opts => {
    return apiCollection({ url: "/back/about", params: { ...opts } });
  },
  newAddAboutInfo: opts => {
    return apiResource({ url: "/back/about", data: opts });
  },
  editAboutInfo: (id, opts) => {
    return apiPut({ url: `/back/about/${id}`, data: opts });
  },
  deleteAboutUs: id => {
    return apiDelete({ url: `/back/about/${id}` });
  },
  // 轮播图管理
  getHomeSlide: opts => {
    return apiCollection({ url: "/back/carousel", params: { ...opts } });
  },
  deleteHomeSlide: id => {
    return apiDelete({ url: `/back/carousel/${id}` });
  },
  uploadFile(opts) {
    const { file } = opts;
    const formData = new FormData();

    function getBlobBydataURI(dataURI, type) {
      var binary = atob(dataURI);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    }

    const $Blob = getBlobBydataURI(file, "image/jpeg");
    formData.append("file", $Blob, "file_" + Date.parse(new Date()) + ".jpeg");
    return apiFormSubmit({
      url: "/public/upload",
      data: formData
    });
  },
  slideNewAdd: opts => {
    return apiResource({ url: "/back/client-logo", data: opts });
  },
  // 客户logo管理模块
  getCLientLogo: opts => {
    return apiCollection({ url: "/back/client-logo", params: { ...opts } });
  },
  deleteCLientLogo: id => {
    return apiDelete({ url: `/back/client-logo/${id}` });
  },
  CLientLogoNewAdd: opts => {
    return apiResource({ url: "/back/client-logo", data: opts });
  },
  // 招聘管理模块
  getRecritManage: opts => {
    return apiCollection({ url: "/back/jobs", params: { ...opts } });
  },
  recritInfoNewAdd: opts => {
    return apiResource({ url: "/back/jobs", data: opts });
  },
  updateRecruitInfo: (id, opts) => {
    return apiPut({ url: `/back/jobs/${id}`, data: opts });
  },
  deleteRecruitInfo: id => {
    return apiDelete({ url: `/back/jobs/${id}` });
  },
  // 新闻管理模块
  getNewsManage: opts => {
    return apiCollection({ url: "/back/news", params: { ...opts } });
  },
  NewsInfoNewAdd: opts => {
    return apiResource({ url: "/back/news", data: opts });
  },
  updateNewsInfo: (id, opts) => {
    return apiPut({ url: `/back/news/${id}`, data: opts });
  },
  deleteNewsInfo: id => {
    return apiDelete({ url: `/back/news/${id}` });
  },
  // 用户信息管理模块
  getUserManage: opts => {
    return apiCollection({ url: "/back/user", params: { ...opts } });
  },
  UserInfoNewAdd: opts => {
    return apiResource({ url: "/back/user", data: opts });
  },
  updateUserInfo: (id, opts) => {
    return apiPut({ url: `/back/user/${id}`, data: opts });
  },
  deleteUserInfo: id => {
    return apiDelete({ url: `/back/user/${id}` });
  },
  // 产品管理
  getProductInfo: id => {
    return apiCollection({ url: `/back/product/${id}` });
  },
  productInfoNewAdd: opts => {
    return apiResource({ url: "/back/product", data: opts });
  },
  updateProductInfo: (id, opts) => {
    return apiPut({ url: `/back/product/${id}`, data: opts });
  },
  deleteProductInfo: id => {
    return apiDelete({ url: `/back/product/${id}` });
  },
};

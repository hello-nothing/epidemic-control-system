import {
  apiCollection,
  apiResource,
  apiFormSubmit
} from "./index";
export default {
  // 登录
  login: opts => {
    return apiResource({
      url: "/user/login/v1",
      data: opts
    });
  },
  // 注册
  regist: opts => {
    return apiResource({
      url: "/user/register/v1",
      data: opts
    });
  },
  // 添加公告
  addAnnouncement: opts => {
    return apiResource({
      url: "/notice/saveNotice/v1",
      data: opts
    });
  },
  //获取公告列表
  getAnnounceList: opts => {
    return apiCollection({
      url: "/notice/noticeList/v1",
      params: {
        ...opts
      }
    });
  },
  //获取公告详情
  getAnnounceDetail: opts => {
    return apiCollection({
      url: "/notice/noticeDetail/v1",
      params: {
        ...opts
      }
    });
  },
  // 删除公告
  deleteAnnounce: opts => {
    return apiCollection({
      url: "/notice/deleteNotice/v1",
      params: {
        ...opts
      }
    });
  },
  // 体温上报
  saveTemperature: opts => {
    return apiResource({
      url: "/temperature/saveTemperature/v1",
      data: opts
    });
  },
  // 获取体温列表
  getTemperatureList: opts => {
    return apiCollection({
      url: "/temperature/temperatureList/v1",
      params: {
        ...opts
      }
    });
  },
  // 编辑体温
  editTemperature: opts => {
    return apiResource({
      url: "/temperature/updateTemperature/v1",
      data: opts
    });
  },
  // 获取防疫小知识列表
  getQuestionList: opts => {
    return apiCollection({
      url: "/question/questionList/v1",
      params: {
        ...opts
      }
    });
  },
  // 防疫小知识保存
  saveQuestion: opts => {
    return apiResource({
      url: "/question/saveQuestion/v1",
      data: opts
    });
  },
  // 防疫小知识删除
  deleteQuestion: opts => {
    return apiCollection({
      url: "/question/questionDelete/v1",
      params: {
        ...opts
      }
    });
  },
  // 添加留言
  addMessage: opts => {
    return apiResource({
      url: "/inquire/saveInquire/v1",
      data: opts
    });
  },
  // 获取留言列表
  getMessageList: opts => {
    return apiCollection({
      url: "/inquire/inquireList/v1",
      params: {
        ...opts
      }
    });
  },
  // 删除留言
  deleteMessage: opts => {
    return apiCollection({
      url: "/inquire/deleteInquire/v1",
      params: {
        ...opts
      }
    });
  },
  // 编辑用户
  editUser: opts => {
    return apiResource({
      url: "/user/updateUser/v1",
      data: opts
    });
  },
  // 用户详情
  getUserDetail: opts => {
    return apiCollection({
      url: "/user/userDetail/v1",
      params: {
        ...opts
      }
    });
  },
  // 获取用户列表
  getUserList: opts => {
    return apiCollection({
      url: "/user/userList/v1",
      params: {
        ...opts
      }
    });
  },
  // 审核
  checkUser: opts => {
    return apiResource({
      url: "/user/check/v1",
      data: opts
    });
  },
  // 回复留言
  saveReplay: opts => {
    return apiResource({
      url: "/reply/saveReply/v1",
      data: opts
    });
  },
  // 删除回复
  deleteReply: opts => {
    return apiCollection({
      url: "/replay/deleteReply/v1",
      params: {
        ...opts
      }
    });
  },
  // 获取回复列表
  getReplyList: opts => {
    return apiCollection({
      url: "/reply/replyList/v1",
      params: {
        ...opts
      }
    });
  },
  // 添加班级
  addGlass: opts => {
    return apiResource({
      url: "/class/saveClass/v1",
      data: opts
    });
  },
  // 获取班级列表
  getGlassList: opts => {
    return apiCollection({
      url: "/class/classList/v1",
      params: {
        ...opts
      }
    });
  },
  // 删除班级
  deleteGlass: opts => {
    return apiResource({
      url: "/class/deleteClass/v1",
      data: opts
    });
  },
};

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 请求的代称，写在Axios里的BaseUrl
        target: "http://38670m585s.zicp.vip", // 真实请求URl
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "", //当你的接口中没有/api字眼时，采用这种，直接替换成空即可
        },
      },
    },
  },
};

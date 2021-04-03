import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: JSON.parse(localStorage.getItem("userInfo")) || {}
  },
  getters: {
    userName: state => {
      return state.name;
    }
  },
  mutations: {
    getUserName(state, data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      state.name = data;
    }
  },
  actions: {
    getUserName({ commit }, data) {
      commit("getUserName", data);
    }
  }
});

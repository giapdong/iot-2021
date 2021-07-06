import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // namespaced: true,
  state: {
    socket: null
  },
  getters: {},
  mutations: {
    setSocket(state, socket) {
      state.socket = socket
    }
  },
  actions: {},
  modules: {}
})

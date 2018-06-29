import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  data: null,
  selectShow: false,
  selectOptionIndex: 0,
  selectValueIndex: 0,
  selectPoint: {
    x: '121.446761',
    y: '31.247562'
  }
}

const mutations = {
  data (state, data) {
    state.data = data
  },
  selectShow (state, data) {
    state.selectShow = data
  },
  selectOptionIndex (state, data) {
    state.selectOptionIndex = data
  },
  selectValueIndex (state, data) {
    state.selectValueIndex = data
  },
  selectPoint (state, data) {
    state.selectPoint = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
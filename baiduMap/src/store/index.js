import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  data: [],
  headerConfig: {
    showHeader: false,
    showBack: true,
    title: '自如客住上海',
    showShare: true
  },
  shareShow: false,
  selectShow: false,
  selectPoint: {
    x: '121.481584',
    y: '31.234816'
  },
  selectIndex: 0
}

const mutations = {
  data (state, data) {
    state.data = data
  },
  setHeaderConfig(state, data) {
    Object.assign(state.headerConfig, data)
  },
  shareShow (state, data) {
    state.shareShow = data
  },
  selectShow (state, data) {
    state.selectShow = data
  },
  selectPoint(state, data) {
    state.selectPoint = data
  },
  selectIndex(state, data) {
    state.selectIndex = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SAVE_HOMETOP](state, home_top) {
    state.home_top = home_top
  },
  add(state) {
    state.num++;
  },
  reduce(state) {
    state.num--
  }
}

export default mutations

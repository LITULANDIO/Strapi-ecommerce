import { createStore } from 'vuex'

export default createStore({
  state: {
    showCart: false
  },
  mutations: {
    SET_SHOW_CART(state, payload){
      state.showCart = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

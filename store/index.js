import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      addToCart(state, product) {
        state.cart.push(product);
      }
    },
    actions: {
      addToCart({commit}, product) {
        commit('addToCart', product);
      }
    },
    getters: {
      cartItemCount: state => state.cart.length
    }
  });
};

export default store;

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token: ''
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    }
  },

  actions: {
    register({ commit }, obj) {
      fetch('http://127.0.0.1:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              commit('setToken', tkn.token)
            }
          });
    }
  },
  modules: {
  }
})

// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    checkAuthState({ commit }) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('clearUser');
        }
      });
    },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit('clearUser');
      } catch (error) {
        console.error('Logout failed:', error.message);
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
});

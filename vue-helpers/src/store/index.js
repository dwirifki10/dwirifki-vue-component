import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";

import todo from './modules/todo.js';

Vue.use(Vuex)

const Secure = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: 'items'
});

const todoState = createPersistedState({
  key: 'items',
  path: ['todo.items'],
  storage: {
    getItem: (key) => Secure.get(key),
    setItem: (key, value) => Secure.set(key, value),
    removeItem: (key) => Secure.remove(key)
  },
});

export default new Vuex.Store({
  modules: {
    todo
  },
  plugins: [todoState],
})

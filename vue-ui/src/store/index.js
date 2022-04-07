import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import news from "./modules/news.js";

Vue.use(Vuex);

const Secure = new SecureLS({
  encodingType: "aes",
  encryptionSecret: "items",
});

const stateItems = createPersistedState({
  key: "items",
  paths: ["news.items"],
  storage: {
    getItem: (key) => Secure.get(key),
    setItem: (key, value) => Secure.set(key, value),
    removeItem: (key) => Secure.remove(key),
  },
});

const statePage = createPersistedState({
  key: "page",
  paths: ["news.page"],
  storage: {
    getItem: (key) => Secure.get(key),
    setItem: (key, value) => Secure.set(key, value),
    removeItem: (key) => Secure.remove(key),
  },
});

export default new Vuex.Store({
  modules: { news },
  plugins: [stateItems, statePage],
});

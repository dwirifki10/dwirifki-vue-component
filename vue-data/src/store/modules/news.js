import axios from "axios";
const dataJSON = require("./index.json");

const state = () => ({
  items: [],
  errors: [],
  query: "top-headlines?country=id&category=technology",
});

const getters = {
  getItems: (state) => {
    return state.items;
  },
  getErrors: (state) => {
    return state.errors;
  },
};

const mutations = {
  setItems(state, payload) {
    state.items = payload;
  },
  setErrors(state, payload) {
    state.errors = payload;
  },
};

const actions = {
  storeItems({ commit, state }) {
    let { query } = state;
    axios
      .get(query)
      .then((response) => {
        commit("setItems", response.data.articles);
      })
      .catch((err) => {
        commit("setItems", dataJSON.articles);
        commit("setErrors", err);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

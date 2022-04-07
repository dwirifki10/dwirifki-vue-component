import axios from "axios";
const dataJson = require("./index.json");

const state = () => ({
  items: [],
  searchItems: [],
  errors: [],
  query: "top-headlines?country=id&pageSize=5",
  page: 1,
  sourceName: "",
  searchNews: "",
});

const getters = {
  getItems: (state) => {
    return state.items;
  },
  getErrors: (state) => {
    return state.errors;
  },
  getPage: (state) => {
    return state.page;
  },
  getSourceName: (state) => {
    return state.sourceName;
  },
  getSearchNews: (state) => {
    return state.searchNews;
  },
  getSearchItems: (state) => {
    return state.searchItems;
  },
};

const mutations = {
  setItems(state, payload) {
    state.items = [...state.items, ...payload];
  },
  setErrors(state, payload) {
    state.errors = payload;
  },
  setPage(state, page) {
    state.page = page;
  },
  setSourceName(state, source) {
    state.sourceName = source;
  },
  setSearchNews(state, title) {
    state.searchNews = title;
  },
  setSearchItems(state, payload) {
    state.searchItems = payload;
  },
};

const actions = {
  storeItems({ commit, state }, page) {
    let { query } = state;
    axios
      .get(query + "&page=" + page)
      .then((response) => {
        commit("setPage", page);
        commit("setItems", response.data.articles);
      })
      .catch((err) => {
        commit("setErrors", err);
        commit("setItems", dataJson.articles);
      });
  },
  searchItems({ commit }, title) {
    const result = axios
      .get("everything?" + "q=" + title)
      .then((response) => {
        commit("setSearchItems", response.data.articles);
        return response.data.articles;
      })
      .catch((err) => {
        commit("setErrors", err);
      });
    return result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

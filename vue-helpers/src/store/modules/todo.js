/* eslint-disable */
const state = () => ({
	items : [],
});

const getters = {
	getItems : state => {
		return state.items
	}
};

const mutations = {
	setItems(state, payload) {
		state.items = payload
	}
};

const actions = {
	store({ commit, state }, payload){
		let { items } = state;
		items.push({
			id: payload.id,
			message: payload.message,
			description: payload.description
		});
		commit("setItems", items);
	},
	destroy({ commit, state }, id){
		let { items } = state;
		
		const indexObj = items.findIndex((e) => e.id == id);
        items.splice(indexObj, 1);
        commit("setItems", items);
	},
	modify({ commit, state }, payload){
		let { items } = state;

		const result = items.filter((item) => item.id == payload.id);
     	result.map((res) => res.message = payload.newMessage);
     	commit("setItems", items);
	},
	add({ commit, state}, payload){
		let { items } = state;

  		const result = items.filter((item) => item.id == payload.id);
  		result.map((item) => item.description = payload.description);
  		commit("setItems", items); 
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

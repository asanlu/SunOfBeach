import {
    categoryList,
    recommendList
} from "../../models/article.js"

export default {
    namespaced:true,
    state: {
        category: []
    },
    getters: {

    },
    mutations: {
        setCategory(state, payload) {
            // console.log(state,payload)
            state.curComment = [{
                    categoryName: "推荐",
                    id: "1000000000",
                    order: -1,
                },
                ...payload,
            ];

        }
    },
    actions: {
        async getCategory (context, playload) {
            const res = await categoryList();
            context.commit('setCategory', res.data);
        }
    }
}

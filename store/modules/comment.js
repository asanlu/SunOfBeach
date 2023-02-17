export default {
    state: {
        curComment: {}
    },
    getters: {

    },
    mutations: {
        updateCurComment(state, payload) {
            // console.log(state,payload)
            state.curComment = {
                ...payload
            };
        }
    },
    actions: {
        saveCurComment(context) {

        }
    }
}

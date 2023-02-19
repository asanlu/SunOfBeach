import {
    login,
    getCaptcha,
} from "../../models/login"

export default {
    namespaced:true,
    state: {
        userinfo: {},
        captchaURL: '',
        l_c_i: '',
        sob_token: '',
    },
    getters: {

    },
    mutations: {
        setCapCode(state, payload) {
            // console.log(state,payload)
            state.captchaURL = payload.base64URL;
            state.l_c_i = payload.l_c_i;
        },
        setSobToken(e){
            console.log('data', e);
            state.sob_token = payload.sob_token;
            uni.setStorage({
                sob_token: payload.sob_token
            })
        }
    },
    actions: {
        async getCapCode(context, playload) {
            const res = await getCaptcha();
            context.commit('setCapCode', res);
        },
        async toLogin(context, playload) {
            const res = await login();
            context.commit('setCapCode', res);
        },
    }
}

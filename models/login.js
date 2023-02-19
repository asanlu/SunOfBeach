import {
    request
} from "@/utssdk/http"

// 验证码
export const getCaptcha = () => {
    return request(`/uc/ut/captcha?code=${Date.now()}`, {
        responseType: 'arraybuffer'
    });
}

// 登录
export const login = (params = {}) => {
    const captcha = params.captcha || 'recommend';
    return request(`/uc/user/login/${captcha}`, {
        method: 'POST',
        data: params,
        header: {
            l_c_i: params.l_c_i
        }
    });
}

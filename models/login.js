import {
    request
} from "@/utssdk/http"

// 验证码
export const getCaptcha = (params = {}) => {
    return request(`/uc/ut/captcha?code=${Date.now()}`);
}

// 登录
export const uploadImg = (params = {}) => {
    const captcha = params.captcha || 'recommend';
    return request(`/uc/user/login/${captcha}`, {
        method: 'POST',
        data: params.data,
    });
}
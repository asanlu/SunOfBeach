import {
    request
} from "@/utssdk/http"

// 获取问答列表 
export const getFAQList = (params = {}) => {
    // lastest最新的，noanswer等待解决的，hot热门的
    const state = params.state || 'lastest';
    const page = params.page || 1;
    return request(`/ct/wenda/list?page=${page}&state=${state}&category=-2`);
}

export const getFAQDetail = (id) => {
    // lastest最新的，noanswer等待解决的，hot热门的
    return request(`/ct/wenda/${id}`);
}
export const getFAQDetail1 = (params = {}) => {
    const captcha = params.captcha || 'recommend';
    return request(`/uc/user/login/${captcha}`, {
        method: 'POST',
        data: params.data,
    });
}

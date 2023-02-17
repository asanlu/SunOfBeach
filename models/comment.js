import {
    request
} from "@/utssdk/http.js"

// 摸鱼模块
// 获取动态列表
export const commentList = (params = {}) => {
    const ltype = params.type || 'recommend'
    return request(`/ct/moyu/list/${ltype}/${1}`, {
        data: params.data,
    });
}
// 获取动态评论
export const commentDetail = (id) => {
    return request(`/ct/moyu/comment/${id}/${1}?sort=1`);
}

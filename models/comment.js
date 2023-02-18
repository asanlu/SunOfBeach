import {
    request
} from "@/utssdk/http"

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

// 获取首页话题
export const commentTopicsssssss = () => {
    return request(`/ct/moyu/topic/index`);
}

// 获取关注的话题列表
export const commentTopic = () => {
    return request(`/ct/moyu/topic?followState=false`);
}

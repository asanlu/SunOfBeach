import {
    request
} from "@/utssdk/http"

// 摸鱼模块
// 获取动态列表
export const uploadImg = (params = {}) => {
    const ltype = params.type || 'recommend'
    return request(`/oss/image/mo_yu`, {
        method: 'POST',
        data: params.data,
    });
}
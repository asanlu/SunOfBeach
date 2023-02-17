import {
    request
} from "@/utssdk/http.js"

// 分类列表
export const categoryList = () => {
    return request('/ct/category/list');
}
// 获取推荐内容 page:页码，从1开始, id:分类的ID
export const recommendList = (id) => {
    const urlId = id ? `${id}/1` : '1';
    return request(`/ct/content/home/recommend/${urlId}`);
}
// 获取推荐内容 page:页码，从1开始, id:分类的ID
export const articleDetail = (id) => {
    return request(`/ct/article/detail/${id}`);
}

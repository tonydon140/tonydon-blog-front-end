import request from '@/utils/request'
import adminReq from '@/utils/request-admin';

// 查询文章列表
export function getArticleList(query) {
    return request({
        url: '/article/articleList',
        method: 'get',
        params: query
    })
}

//查询最热文章
export function hotArticleList() {
    return request({
        url: '/article/hotArticleList',
        method: 'get'
    })
}

//获取文章详情
export function getArticle(id) {
    return request({
        url: '/article/' + id,
        method: 'get'
    })
}

/**
 * 根据文章 id 添加访问量
 * @param id
 * @return {*}
 */
export function updateViewCount(id) {
    return request({
        url: '/article/updateViewCount/' + id,
        method: 'put'
    })
}

/**
 * 发布文章
 * @return {*}
 */
export function publishArticle() {
    return adminReq({
        url: '/article/publish',
        method: 'post'
    })
}


export function saveDraftArticle(id, title, content, categoryId, thumbnail, createBy) {
    return adminReq({
        url: '/article/draft',
        method: 'post',
        data: {
            id,
            title,
            content,
            categoryId,
            thumbnail,
            createBy
        }
    })
}

export function uploadImage() {

}

/**
 * 为后台获取所有的文章
 * @return {*} Promise
 */
export function getArticleListForAdmin(){
    return adminReq({
        url: '/article',
        method: 'get'
    })
}
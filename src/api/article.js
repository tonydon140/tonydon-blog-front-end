import request from '@/utils/request-user'
import adminReq from '@/utils/request-admin';

// 查询文章列表
export function getArticleList(query) {
    return request({
        url: '/article/' + query.pageNum + '/' + query.pageSize + '/' + query.categoryId,
        method: 'get'
    })
}

//查询最热文章
export function hotArticleList() {
    return request({
        url: '/article/hot',
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
export function publishArticle(id, title, content, categoryId, thumbnail, publishBy) {
    return adminReq({
        url: '/article/publish',
        method: 'post',
        data: {
            id,
            title,
            content,
            categoryId,
            thumbnail,
            publishBy
        }
    })
}

/**
 * 更新已发布的文章
 */
export function updatePublishArticle(id, title, content, categoryId, thumbnail, updateBy) {
    return adminReq({
        url: '/article/' + id,
        method: 'put',
        data: {
            id,
            title,
            content,
            categoryId,
            thumbnail,
            updateBy
        }
    })
}


export function saveDraftArticle(id, title, content, categoryId, thumbnail, updateBy) {
    return adminReq({
        url: '/article/draft',
        method: 'post',
        data: {
            id,
            title,
            content,
            categoryId,
            thumbnail,
            updateBy
        }
    })
}

export function uploadImage() {

}

export function removeArticleById(id) {
    return adminReq({
        url: '/article/' + id,
        method: 'delete'
    })
}

/**
 * 为后台获取所有的文章
 * @return {*} Promise
 */
export function getArticleListForAdmin() {
    return adminReq({
        url: '/article',
        method: 'get'
    })
}

export function getArticleDetailById(id) {
    return adminReq({
        url: '/article/' + id,
        method: 'get'
    })
}
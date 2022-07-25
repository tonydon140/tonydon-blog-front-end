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

export function removeArticleById(id) {
    return adminReq({
        url: '/article/' + id,
        method: 'delete'
    })
}


export function findArticlePageAdmin(pageNum, pageSize){
    return adminReq({
        url: '/article/' + pageNum + '/' + pageSize,
        method: 'GET'
    })
}

export function findArticleByIdAdmin(id) {
    return adminReq({
        url: '/article/' + id,
        method: 'get'
    })
}
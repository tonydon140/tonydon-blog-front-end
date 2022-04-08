import request from '@/utils/request'

// 发送文章评论
export function sendComment(type, articleId, rootId, toCommentId, toCommentUserId, content) {
    return request({
        url: '/comment',
        method: 'post',
        data: {
            "articleId": articleId,
            "type": type,
            "rootId": rootId,
            "toCommentId": toCommentId,
            "toCommentUserId": toCommentUserId,
            "content": content
        }
    })
}

/**
 * 获得文章的评论
 * @param query 查询参数
 * @return {*} Promise
 */
export function getArticleComment(query) {
    return request({
        url: '/comment/' + query.articleId + '/' + query.pageNum + '/' + query.pageSize,
        method: 'get'
    })
}

/**
 * 获得友链的评论
 * @param query
 * @return {*}
 */
export function getLinkComment(query) {
    return request({
        url: '/comment/linkCommentList',
        method: 'get',
        params: query
    })
}
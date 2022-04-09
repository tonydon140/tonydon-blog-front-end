import request from '@/utils/request'


/**
 * 发送评论
 * @param articleId 当前文章id
 * @param nickname  评论用户名
 * @param avatar    头像
 * @param email     电子邮箱
 * @param content   评论内容
 * @return {*}      Promise
 */
export function sendComment(articleId, nickname, avatar, email, content) {
    return saveComment(articleId, nickname, avatar, email, -1, content);
}

// 回复评论
export function replyComment(articleId, nickname, avatar, email, replyId, content){
    return saveComment(articleId, nickname, avatar, email, replyId, content);
}

// 保存评论
function saveComment(articleId, nickname, avatar, email, replyId, content) {
    return request({
        url: '/comment',
        method: 'post',
        data: {
            articleId,
            nickname,
            avatar,
            email,
            replyId,
            content
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

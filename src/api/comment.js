import request from '@/utils/request'
import requestAdmin from "@/utils/request-admin";


/**
 * 发送评论
 * @return {*}      Promise
 * @param commentForm 评论表单
 */
export function sendComment(commentForm) {
    return saveComment(commentForm.articleId, commentForm.nickname,
        commentForm.avatar, commentForm.email, commentForm.replyId, commentForm.content);
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


export function getCommentList(query){
    return requestAdmin({
        url: '/comment/' + query.pageNum + '/' + query.pageSize,
        method: 'get'
    })
}

export function removeComment(id){
    return requestAdmin({
        url: '/comment/' + id,
        method: 'delete'
    })
}

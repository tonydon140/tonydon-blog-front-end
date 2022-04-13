import request from '@/utils/request'

// 查询所有审核通过的友链列表
export function getFriendsLinkList() {
    return request({
        url: '/friends-link',
        method: 'get',
    })
}

/**
 * 申请友链
 * @param form  友链表单
 * @returns {*} Promise
 */
export function applyFriendsLink(form) {
    return request({
        url: '/friends-link',
        method: 'post',
        data: {
            name: form.name,
            logo: form.logo,
            description: form.description,
            address: form.address
        }
    })
}


import request from '@/utils/request'
import requestAdmin from "@/utils/request-admin";

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

export function getAllFriendLink() {
    return requestAdmin({
        url: '/friend-link',
        method: 'get'
    })
}

export function passFriendLinkById(id){
    return requestAdmin({
        url: '/friend-link/' + id,
        method: 'put'
    })
}

export function removeFriendLinkById(id){
    return requestAdmin({
        url: '/friend-link/' + id,
        method: 'delete'
    })
}
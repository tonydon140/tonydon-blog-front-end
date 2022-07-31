import adminReq from '@/utils/request-admin'
import {getToken} from "@/utils/token";
import router from "@/router";

/**
 * 用户登陆
 * @param username 用户名
 * @param password 密码
 * @return {*} promise
 */
export function login(username, password) {
    return adminReq({
        url: '/user/login',
        method: 'post',
        data: {'username': username, 'password': password}
    })
}

/**
 * 注册用户
 * @param username  用户名
 * @param nickname  昵称
 * @param email     电子邮箱
 * @param password  密码
 * @param createBy  进行注册的用户id
 * @return {*}
 */
export function register(username, nickname, email, password, createBy) {
    return adminReq({
        url: '/user',
        method: 'post',
        data: {
            "username": username,
            "nickname": nickname,
            "email": email,
            "password": password,
            "createBy": createBy
        }
    })
}

/**
 * 退出登陆
 * @return {*} promise
 */
export function logout() {
    return adminReq({
        url: '/user/logout',
        method: 'post'
    })
}

/**
 * 获取所有的用户信息
 * @return {*} promise
 */
export function getUserList() {
    return adminReq({
        url: '/user',
        method: 'get'
    })
}

/**
 * 通过他token获取用户信息
 * @returns {*} promise
 */
export function getUserInfoByToken() {
    return adminReq({
        url: '/user/info',
        method: 'get'
    })
}


export function savaUserInfo(userinfo) {
    return adminReq({
        url: '/user/userInfo',
        method: 'put',
        data: userinfo
    })
}

/**
 * 判断用户是否登陆
 * @return {Promise<unknown>} 返回一个 promise
 */
export function hasLogin() {
    return new Promise(function (resolve, reject) {
        // 1. 获取本地 token
        let token = getToken();
        if (token == null) {
            // 2. token 不存在，直接跳转到登陆页面
            reject();
        } else {
            // 3. 请求后台，验证用户是否已经登陆
            getUserInfoByToken().then(() => {
                resolve();
            }).catch(() => {
                reject();
            })
        }
    })
}

/**
 * 根据用户 id 删除用户
 * @param id 用户 id
 * @return {*} promise
 */
export function removeUserById(id) {
    return adminReq({
        url: '/user/' + id,
        method: 'delete',
    })
}


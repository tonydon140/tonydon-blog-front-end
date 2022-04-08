const TOKEN_KEY = 'token'

/**
 * 获取 token
 * @returns {string} token 字符串
 */
export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
}

/**
 * 存储 token
 * @param token token 字符串
 */
export function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

/**
 * 删除 token
 */
export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY)
}

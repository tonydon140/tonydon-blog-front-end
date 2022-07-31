import axios from 'axios'
import {ElNotification, ElMessageBox, ElMessage} from 'element-plus'
import router from '@/router'
import {getToken} from '@/utils/token'
import errorCode from '@/utils/errorCode'
import config from "@/utils/config";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // 表示请求URL公共部分
    baseURL: config.baseAdminURL,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 如果是登陆请求，不携带token
    if (config.url === '/login') return config;
    // 非登陆请求，携带 token
    config.headers['Authorization'] = getToken()
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

/**
 * 响应成功的回调函数
 * @param res
 * @return {Promise<never>|*}
 */
function fulfilled(res) {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'];

    // 响应成功直接返回
    if (code === 200) {
        return res.data.data;
    }


    if (code === 401) {
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            router.push('/login').then(r => {
            });
        })
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        ElMessage.error(msg);
        return Promise.reject(new Error(msg))
    } else {
        ElNotification.error({
            title: '错误！',
            message: msg
        });
        return Promise.reject(code);
    }
}

/**
 * 响应失败的回调函数
 * @param err
 * @return {Promise<never>}
 */
function rejected(err) {
    console.log('err: ' + err)
    let {message} = err
    if (message === 'Network Error') {
        message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
        message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(err)
}

// 响应拦截器
service.interceptors.response.use(fulfilled, rejected)

export default service
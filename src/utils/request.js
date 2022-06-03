import axios from 'axios';
import {ElNotification, ElMessage} from 'element-plus';
import errorCode from '@/utils/errorCode';
import config from "@/api/config";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // 表示请求URL公共部分
    baseURL: config.baseFrontURL,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?'
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            let part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== 'undefined') {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                            const params = propName + '[' + key + ']'
                            const subPart = encodeURIComponent(params) + '='
                            url += subPart + encodeURIComponent(value[key]) + '&'
                        }
                    }
                } else {
                    url += part + encodeURIComponent(value) + '&'
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default'];

        if (code === 500) {
            ElMessage({
                message: msg,
                type: 'error'
            })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            ElNotification.error({
                title: msg
            })
            return Promise.reject('error')
        } else {
            return res.data.data
        }
    },
    error => {
        console.log('err' + error)
        let {message} = error
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
        return Promise.reject(error)
    }
)

export default service
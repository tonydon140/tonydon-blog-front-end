import axios from 'axios';
import {ElNotification, ElMessage} from 'element-plus';
import errorCode from '@/utils/errorCode';
import config from "@/utils/config";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // 表示请求URL公共部分
    baseURL: config.baseFrontURL,
    // 超时
    timeout: 10000
})


// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default'];

        // 服务器内部错误信息
        if (code === 500) {
            ElMessage.error(msg);
            console.log('500 ' + msg);
            return Promise.reject(msg);
        }
        // 其他错误信息
        else if (code !== 200) {
            ElNotification.error({title: msg});
            return Promise.reject(msg);
        }
        // 未出现错误
        else {
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
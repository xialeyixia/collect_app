import axios from 'axios'

// 创建 axios 实例
const http = axios.create({
    timeout: 15000, // 请求超时时间
    headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器 (添加 token)
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器 (统一错误处理)
http.interceptors.response.use(
    (response) => {
        // 直接返回响应数据的主体
        return response.data
    },
    (error) => {
        // 统一错误处理
        let message = ''
        if (error.response) {
            // 服务器返回非常规状态码 (2xx 范围外的)
            message = handleErrorCode(error.response.status)
        } else if (error.request) {
            // 请求已发出但没有响应
            message = '服务器无响应，请检查网络'
        } else {
            // 请求配置出错
            message = '请求配置错误'
        }

        // 可在此处添加全局错误提示 (如使用 ElementUI 的 Message)
        console.error('请求错误:', message)
        return Promise.reject(message)
    }
)

// 状态码错误处理
function handleErrorCode(status) {
    const errorMap = {
        400: '请求参数错误',
        401: '未授权，请重新登录',
        403: '拒绝访问',
        404: '请求资源不存在',
        500: '服务器内部错误',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
    }
    return errorMap[status] || `连接错误 (${status})`
}

/**
 * 封装的 GET 方法
 * @param {string} url 请求地址
 * @param {object} params 查询参数 (自动转为 URL 查询字符串)
 * @param {object} config 自定义配置 (将覆盖实例默认配置)
 * @returns {Promise} 返回 Promise 对象
 */
export const get = (url, params = {}, config = {}) => {
    return http.get(url, {
        params, // 自动序列化参数
        ...config, // 自定义配置
    })
}

// 可选：导出整个实例
export default http

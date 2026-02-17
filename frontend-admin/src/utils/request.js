/**
 * Axios 请求封装
 * 统一处理请求配置、拦截器、错误处理
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { createLogger } from './logger'

const logger = createLogger('HTTP')

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 记录请求日志
    logger.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data
    })

    return config
  },
  (error) => {
    logger.error('Request error', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, config } = response

    // 记录响应日志
    logger.debug(`Response: ${config.method?.toUpperCase()} ${config.url}`, data)

    // 根据业务状态码处理
    if (data.code && data.code !== 200) {
      logger.warn(`Business error: ${data.message}`)
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }

    return data
  },
  (error) => {
    logger.error('Response error', error)

    // HTTP 状态码错误处理
    const { response } = error
    let message = '网络错误，请稍后重试'

    if (response) {
      switch (response.status) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = '登录已过期，请重新登录'
        // 可以在这里触发登出逻辑
        break
      case 403:
        message = '没有权限访问'
        break
      case 404:
        message = '请求的资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = `请求失败 (${response.status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * GET 请求
 */
export const get = (url, params = {}, config = {}) => {
  return service.get(url, { params, ...config })
}

/**
 * POST 请求
 */
export const post = (url, data = {}, config = {}) => {
  return service.post(url, data, config)
}

/**
 * PUT 请求
 */
export const put = (url, data = {}, config = {}) => {
  return service.put(url, data, config)
}

/**
 * DELETE 请求
 */
export const del = (url, params = {}, config = {}) => {
  return service.delete(url, { params, ...config })
}

export default service

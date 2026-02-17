/**
 * 用户管理 API
 * 统一的数据访问层，便于后续切换到真实后端
 */
import { createLogger } from '@/utils/logger'
import { mockApi } from '@/mock/data'

const logger = createLogger('UserAPI')

// 是否使用 Mock 数据
const USE_MOCK = true

/**
 * 模拟异步请求
 */
const mockAsync = (fn, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, delay)
  })
}

/**
 * 获取用户列表
 * @param {Object} params - 查询参数
 */
export const getUserList = async (params = {}) => {
  logger.info('获取用户列表', params)

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.getUsers(params))
    logger.debug('用户列表结果', result)
    return result
  }

  // return get('/users', params)
}

/**
 * 新增用户
 * @param {Object} data - 用户数据
 */
export const addUser = async (data) => {
  logger.info('新增用户', { ...data, password: '***' })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.addUser(data))
    logger.debug('新增用户结果', result)
    return result
  }

  // return post('/users', data)
}

/**
 * 更新用户
 * @param {number} id - 用户ID
 * @param {Object} data - 用户数据
 */
export const updateUser = async (id, data) => {
  logger.info('更新用户', { id, ...data, password: data.password ? '***' : undefined })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.updateUser(id, data))
    logger.debug('更新用户结果', result)
    return result
  }

  // return put(`/users/${id}`, data)
}

/**
 * 删除用户
 * @param {number} id - 用户ID
 */
export const deleteUser = async (id) => {
  logger.info('删除用户', { id })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.deleteUser(id))
    logger.debug('删除用户结果', result)
    return result
  }

  // return del(`/users/${id}`)
}

/**
 * 切换用户状态
 * @param {number} id - 用户ID
 */
export const toggleUserStatus = async (id) => {
  logger.info('切换用户状态', { id })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.toggleUserStatus(id))
    logger.debug('切换用户状态结果', result)
    return result
  }

  // return put(`/users/${id}/status`)
}

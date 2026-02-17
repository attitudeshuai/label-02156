/**
 * 借阅管理 API
 * 统一的数据访问层，便于后续切换到真实后端
 */
import { createLogger } from '@/utils/logger'
import { mockApi, books, users } from '@/mock/data'

const logger = createLogger('BorrowAPI')

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
 * 获取借阅记录列表
 * @param {Object} params - 查询参数
 */
export const getBorrowList = async (params = {}) => {
  logger.info('获取借阅记录列表', params)

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.getBorrows(params))
    logger.debug('借阅记录列表结果', result)
    return result
  }

  // return get('/borrows', params)
}

/**
 * 新增借阅记录
 * @param {Object} data - 借阅数据
 */
export const addBorrow = async (data) => {
  logger.info('新增借阅记录', data)

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.addBorrow(data))
    logger.debug('新增借阅结果', result)
    return result
  }

  // return post('/borrows', data)
}

/**
 * 归还图书
 * @param {number} id - 借阅记录ID
 */
export const returnBook = async (id) => {
  logger.info('归还图书', { id })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.returnBook(id))
    logger.debug('归还图书结果', result)
    return result
  }

  // return put(`/borrows/${id}/return`)
}

/**
 * 获取可借阅的图书列表
 */
export const getAvailableBooks = async () => {
  logger.info('获取可借阅图书列表')

  if (USE_MOCK) {
    return books
  }

  // return get('/books/available')
}

/**
 * 获取可借阅的用户列表（非管理员）
 */
export const getBorrowers = async () => {
  logger.info('获取借阅人列表')

  if (USE_MOCK) {
    return users.filter(u => u.role !== 'admin')
  }

  // return get('/users/borrowers')
}

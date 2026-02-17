/**
 * 图书管理 API
 * 统一的数据访问层，便于后续切换到真实后端
 */
import { createLogger } from '@/utils/logger'
import { mockApi } from '@/mock/data'

const logger = createLogger('BookAPI')

// 是否使用 Mock 数据（可通过环境变量控制）
const USE_MOCK = true

/**
 * 模拟异步请求（Mock 场景）
 */
const mockAsync = (fn, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, delay)
  })
}

/**
 * 获取图书列表
 * @param {Object} params - 查询参数
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.category - 分类
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页条数
 */
export const getBookList = async (params = {}) => {
  logger.info('获取图书列表', params)

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.getBooks(params))
    logger.debug('图书列表结果', result)
    return result
  }

  // 真实 API 调用（预留）
  // return get('/books', params)
}

/**
 * 获取图书详情
 * @param {number} id - 图书ID
 */
export const getBookDetail = async (id) => {
  logger.info('获取图书详情', { id })

  if (USE_MOCK) {
    const result = await mockAsync(() => {
      const { list } = mockApi.getBooks({})
      return list.find(book => book.id === id) || null
    })
    logger.debug('图书详情结果', result)
    return result
  }

  // return get(`/books/${id}`)
}

/**
 * 新增图书
 * @param {Object} data - 图书数据
 */
export const addBook = async (data) => {
  logger.info('新增图书', data)

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.addBook(data))
    logger.debug('新增图书结果', result)
    return result
  }

  // return post('/books', data)
}

/**
 * 更新图书
 * @param {number} id - 图书ID
 * @param {Object} data - 图书数据
 */
export const updateBook = async (id, data) => {
  logger.info('更新图书', { id, data })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.updateBook(id, data))
    logger.debug('更新图书结果', result)
    return result
  }

  // return put(`/books/${id}`, data)
}

/**
 * 删除图书
 * @param {number} id - 图书ID
 */
export const deleteBook = async (id) => {
  logger.info('删除图书', { id })

  if (USE_MOCK) {
    const result = await mockAsync(() => mockApi.deleteBook(id))
    logger.debug('删除图书结果', result)
    return result
  }

  // return del(`/books/${id}`)
}

/**
 * 获取图书分类列表
 */
export const getCategories = async () => {
  logger.info('获取图书分类')

  if (USE_MOCK) {
    const { categories } = await import('@/mock/data')
    return categories
  }

  // return get('/books/categories')
}

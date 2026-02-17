/**
 * 日志工具类
 * 提供统一的日志记录方案，支持不同级别的日志输出
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

// 当前日志级别，生产环境只输出 WARN 及以上
const currentLevel = import.meta.env.PROD ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG

// 日志存储（用于错误追踪）
const logHistory = []
const MAX_LOG_HISTORY = 100

/**
 * 格式化时间戳
 */
const getTimestamp = () => {
  const now = new Date()
  return now.toISOString()
}

/**
 * 格式化日志消息
 */
const formatMessage = (level, module, message, data) => {
  return {
    timestamp: getTimestamp(),
    level,
    module,
    message,
    data
  }
}

/**
 * 存储日志到历史记录
 */
const storeLog = (logEntry) => {
  logHistory.push(logEntry)
  if (logHistory.length > MAX_LOG_HISTORY) {
    logHistory.shift()
  }
}

/**
 * Logger 类
 */
class Logger {
  constructor(module = 'App') {
    this.module = module
  }

  /**
   * 调试日志
   */
  debug(message, data = null) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      const logEntry = formatMessage('DEBUG', this.module, message, data)
      storeLog(logEntry)
      console.log(
        `%c[${logEntry.timestamp}] [DEBUG] [${this.module}]`,
        'color: #909399',
        message,
        data !== null ? data : ''
      )
    }
  }

  /**
   * 信息日志
   */
  info(message, data = null) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      const logEntry = formatMessage('INFO', this.module, message, data)
      storeLog(logEntry)
      console.log(
        `%c[${logEntry.timestamp}] [INFO] [${this.module}]`,
        'color: #409EFF',
        message,
        data !== null ? data : ''
      )
    }
  }

  /**
   * 警告日志
   */
  warn(message, data = null) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      const logEntry = formatMessage('WARN', this.module, message, data)
      storeLog(logEntry)
      console.warn(
        `[${logEntry.timestamp}] [WARN] [${this.module}]`,
        message,
        data !== null ? data : ''
      )
    }
  }

  /**
   * 错误日志
   */
  error(message, error = null) {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      const logEntry = formatMessage('ERROR', this.module, message, {
        error: error?.message || error,
        stack: error?.stack
      })
      storeLog(logEntry)
      console.error(
        `[${logEntry.timestamp}] [ERROR] [${this.module}]`,
        message,
        error || ''
      )
    }
  }

  /**
   * API 请求日志
   */
  api(method, url, data = null, response = null) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      const logEntry = formatMessage('API', this.module, `${method} ${url}`, {
        request: data,
        response
      })
      storeLog(logEntry)
      console.log(
        `%c[${logEntry.timestamp}] [API] [${this.module}]`,
        'color: #67C23A',
        `${method} ${url}`,
        { request: data, response }
      )
    }
  }
}

/**
 * 创建模块专属 Logger
 */
export const createLogger = (module) => {
  return new Logger(module)
}

/**
 * 获取日志历史记录
 */
export const getLogHistory = () => {
  return [...logHistory]
}

/**
 * 清空日志历史
 */
export const clearLogHistory = () => {
  logHistory.length = 0
}

/**
 * 默认 Logger 实例
 */
export default new Logger('App')

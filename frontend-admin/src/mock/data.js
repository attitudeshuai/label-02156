// Mock Data for Library Management System

// Book Categories
export const categories = [
  '计算机',
  '文学',
  '历史',
  '经济',
  '艺术',
  '科学',
  '教育',
  '医学',
  '法律',
  '其他'
]

// Mock Books
export const books = [
  {
    id: 1,
    title: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    isbn: '978-7-115-27579-0',
    category: '计算机',
    publisher: '人民邮电出版社',
    publishDate: '2012-03-29',
    stock: 15,
    cover: '/covers/javascript.svg',
    description: '本书是JavaScript超级畅销书的最新版，从最初的JavaScript介绍到最新的JavaScript实践，整理并更新了所有内容。',
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    title: 'Vue.js设计与实现',
    author: '霍春阳',
    isbn: '978-7-115-58311-7',
    category: '计算机',
    publisher: '人民邮电出版社',
    publishDate: '2022-01-01',
    stock: 20,
    cover: '/covers/vuejs.svg',
    description: '本书从源码层面解读Vue.js框架的设计与实现，帮助读者深入理解Vue.js的设计理念和实现原理。',
    createTime: '2024-01-16 14:20:00',
    updateTime: '2024-01-16 14:20:00'
  },
  {
    id: 3,
    title: '活着',
    author: '余华',
    isbn: '978-7-5063-3074-3',
    category: '文学',
    publisher: '作家出版社',
    publishDate: '2012-08-01',
    stock: 30,
    cover: '/covers/alive.svg',
    description: '讲述了一个人历经沧桑和磨难的一生，感人至深。',
    createTime: '2024-01-17 09:15:00',
    updateTime: '2024-01-17 09:15:00'
  },
  {
    id: 4,
    title: '三体',
    author: '刘慈欣',
    isbn: '978-7-229-03093-3',
    category: '科学',
    publisher: '重庆出版社',
    publishDate: '2008-01-01',
    stock: 25,
    cover: '/covers/three-body.svg',
    description: '科幻小说巅峰之作，讲述地球文明与三体文明的故事。',
    createTime: '2024-01-18 16:45:00',
    updateTime: '2024-01-18 16:45:00'
  },
  {
    id: 5,
    title: '经济学原理',
    author: '曼昆',
    isbn: '978-7-301-15083-9',
    category: '经济',
    publisher: '北京大学出版社',
    publishDate: '2015-05-01',
    stock: 18,
    cover: '/covers/economics.svg',
    description: '经济学入门经典教材，通俗易懂。',
    createTime: '2024-01-19 11:00:00',
    updateTime: '2024-01-19 11:00:00'
  }
]

// Mock Users
export const users = [
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    email: 'admin@library.com',
    phone: '13800138001',
    role: 'admin',
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    username: 'zhangsan',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138002',
    role: 'user',
    status: 1,
    createTime: '2024-01-10 10:30:00'
  },
  {
    id: 3,
    username: 'lisi',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138003',
    role: 'user',
    status: 1,
    createTime: '2024-01-12 14:20:00'
  },
  {
    id: 4,
    username: 'wangwu',
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138004',
    role: 'user',
    status: 0,
    createTime: '2024-01-15 09:15:00'
  }
]

// Mock Borrow Records
export const borrowRecords = [
  {
    id: 1,
    bookId: 1,
    bookTitle: 'JavaScript高级程序设计',
    userId: 2,
    userName: '张三',
    borrowDate: '2024-01-20',
    dueDate: '2024-02-20',
    returnDate: '',
    status: 'borrowing',
    createTime: '2024-01-20 10:00:00'
  },
  {
    id: 2,
    bookId: 3,
    bookTitle: '活着',
    userId: 3,
    userName: '李四',
    borrowDate: '2024-01-15',
    dueDate: '2024-02-15',
    returnDate: '2024-02-10',
    status: 'returned',
    createTime: '2024-01-15 14:30:00'
  },
  {
    id: 3,
    bookId: 4,
    bookTitle: '三体',
    userId: 2,
    userName: '张三',
    borrowDate: '2024-01-01',
    dueDate: '2024-02-01',
    returnDate: '',
    status: 'overdue',
    createTime: '2024-01-01 09:00:00'
  },
  {
    id: 4,
    bookId: 2,
    bookTitle: 'Vue.js设计与实现',
    userId: 4,
    userName: '王五',
    borrowDate: '2024-01-25',
    dueDate: '2024-02-25',
    returnDate: '',
    status: 'borrowing',
    createTime: '2024-01-25 11:00:00'
  }
]

// Helper functions for CRUD operations
let bookIdCounter = books.length + 1
let userIdCounter = users.length + 1
let borrowIdCounter = borrowRecords.length + 1

export const mockApi = {
  // Books
  getBooks: (params = {}) => {
    let result = [...books]
    
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      result = result.filter(book => 
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.isbn.includes(keyword)
      )
    }
    
    if (params.category) {
      result = result.filter(book => book.category === params.category)
    }
    
    const total = result.length
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    result = result.slice(start, start + pageSize)
    
    return { list: result, total }
  },
  
  addBook: (book) => {
    const newBook = {
      ...book,
      id: bookIdCounter++,
      createTime: new Date().toLocaleString(),
      updateTime: new Date().toLocaleString()
    }
    books.unshift(newBook)
    return newBook
  },
  
  updateBook: (id, book) => {
    const index = books.findIndex(b => b.id === id)
    if (index !== -1) {
      books[index] = { ...books[index], ...book, updateTime: new Date().toLocaleString() }
      return books[index]
    }
    return null
  },
  
  deleteBook: (id) => {
    const index = books.findIndex(b => b.id === id)
    if (index !== -1) {
      books.splice(index, 1)
      return true
    }
    return false
  },
  
  // Users
  getUsers: (params = {}) => {
    let result = [...users]
    
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.phone.includes(keyword)
      )
    }
    
    const total = result.length
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    result = result.slice(start, start + pageSize)
    
    return { list: result, total }
  },
  
  addUser: (user) => {
    const newUser = {
      ...user,
      id: userIdCounter++,
      status: 1,
      createTime: new Date().toLocaleString()
    }
    users.unshift(newUser)
    return newUser
  },
  
  updateUser: (id, user) => {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...user }
      return users[index]
    }
    return null
  },
  
  deleteUser: (id) => {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users.splice(index, 1)
      return true
    }
    return false
  },
  
  toggleUserStatus: (id) => {
    const user = users.find(u => u.id === id)
    if (user) {
      user.status = user.status === 1 ? 0 : 1
      return user
    }
    return null
  },
  
  // Borrow Records
  getBorrows: (params = {}) => {
    let result = [...borrowRecords]
    
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      result = result.filter(record => 
        record.bookTitle.toLowerCase().includes(keyword) ||
        record.userName.toLowerCase().includes(keyword)
      )
    }
    
    if (params.status) {
      result = result.filter(record => record.status === params.status)
    }
    
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    result = result.slice(start, start + pageSize)
    const total = result.length
    
    return { list: result, total }
  },
  
  addBorrow: (borrow) => {
    const book = books.find(b => b.id === borrow.bookId)
    const user = users.find(u => u.id === borrow.userId)
    
    const newBorrow = {
      ...borrow,
      id: borrowIdCounter++,
      bookTitle: book?.title || '',
      userName: user?.name || '',
      returnDate: '',
      status: 'borrowing',
      createTime: new Date().toLocaleString()
    }
    borrowRecords.unshift(newBorrow)
    return newBorrow
  },
  
  returnBook: (id) => {
    const record = borrowRecords.find(r => r.id === id)
    if (record) {
      record.returnDate = new Date().toISOString().split('T')[0]
      record.status = 'returned'
      return record
    }
    return null
  }
}

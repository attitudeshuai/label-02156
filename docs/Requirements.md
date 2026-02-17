# 需求文档 - 图书管理系统前端

> 版本: 1.1  
> 状态: ✅ 已确认  
> 创建时间: 2026-02-08  
> 确认时间: 2026-02-08

---

## 1. 项目概述

### 1.1 项目名称
图书管理系统前端 (Library Management System Frontend)

### 1.2 项目目标
构建一个现代化、美观的图书管理系统前端应用，提供图书管理和用户管理功能，面向图书馆管理员使用。

### 1.3 技术栈
| 类别 | 技术选型 |
|------|----------|
| 框架 | Vue 3 (Composition API) |
| UI 组件库 | Element Plus |
| 构建工具 | Vite |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| HTTP 请求 | Axios |
| 样式 | SCSS + Element Plus 主题 |

---

## 2. 功能需求

### 2.1 系统布局
- **登录页面**: 用户登录入口
- **主布局**: 左侧菜单 + 顶部导航栏 + 内容区域
- **响应式设计**: 适配桌面端

### 2.2 图书管理模块
| 功能 | 描述 |
|------|------|
| 图书列表 | 分页展示所有图书，支持搜索、筛选 |
| 新增图书 | 表单录入图书信息（书名、作者、ISBN、分类、出版社、出版日期、库存数量、封面图片） |
| 编辑图书 | 修改已有图书信息 |
| 删除图书 | 删除图书记录（带确认提示） |
| 图书详情 | 查看图书完整信息 |
| 图书分类 | 按分类筛选图书 |

### 2.3 用户管理模块
| 功能 | 描述 |
|------|------|
| 用户列表 | 分页展示所有用户，支持搜索 |
| 新增用户 | 表单录入用户信息（用户名、密码、姓名、邮箱、手机号、角色） |
| 编辑用户 | 修改用户信息 |
| 删除用户 | 删除用户记录（带确认提示） |
| 用户状态 | 启用/禁用用户 |

### 2.4 借阅管理模块
| 功能 | 描述 |
|------|------|
| 借阅列表 | 分页展示所有借阅记录，支持搜索、筛选 |
| 新增借阅 | 登记借阅信息（借阅人、图书、借阅日期、应还日期） |
| 归还图书 | 登记归还操作，更新借阅状态 |
| 借阅状态 | 区分：借阅中、已归还、已逾期 |
| 逾期提醒 | 高亮显示逾期未还的记录 |

### 2.5 通用功能
| 功能 | 描述 |
|------|------|
| 登录/登出 | 用户认证 |
| 权限控制 | 基于角色的菜单权限 |
| 数据模拟 | 使用 Mock 数据进行前端展示（无后端） |

---

## 3. 非功能需求

### 3.1 美观度要求 (Dribbble 标准)
- 现代化扁平设计风格
- 统一的色彩体系和字体规范
- 精细的间距和对齐
- 表格、表单、弹窗等组件的视觉优化
- 操作反馈（Loading、Success、Error 状态）
- 空状态和异常状态的友好展示

### 3.2 工程规范
- 组件化开发
- 代码分层清晰（视图层 / API 层 / Mock 层分离）
- ESLint 代码规范（eslint-plugin-vue + eslint:recommended）
- 统一的日志系统（支持 DEBUG/INFO/WARN/ERROR 多级别）
- Axios 请求封装（统一拦截器、错误处理）
- 注释完整

---

## 4. Docker 交付标准

```bash
# 启动命令
docker compose up --build -d

# 访问地址
http://localhost:8081
```

- 使用 Nginx 作为静态资源服务器
- 支持 ARM64 / AMD64 双架构

---

## 5. 数据结构定义

### 5.1 图书 (Book)
```typescript
interface Book {
  id: number
  title: string          // 书名
  author: string         // 作者
  isbn: string           // ISBN
  category: string       // 分类
  publisher: string      // 出版社
  publishDate: string    // 出版日期
  stock: number          // 库存数量
  cover: string          // 封面图片URL
  description: string    // 简介
  createTime: string     // 创建时间
  updateTime: string     // 更新时间
}
```

### 5.2 用户 (User)
```typescript
interface User {
  id: number
  username: string       // 用户名
  name: string           // 姓名
  email: string          // 邮箱
  phone: string          // 手机号
  role: 'admin' | 'user' // 角色
  status: 0 | 1          // 状态: 0-禁用, 1-启用
  createTime: string     // 创建时间
}
```

### 5.3 借阅记录 (BorrowRecord)
```typescript
interface BorrowRecord {
  id: number
  bookId: number         // 图书ID
  bookTitle: string      // 图书名称
  userId: number         // 借阅人ID
  userName: string       // 借阅人姓名
  borrowDate: string     // 借阅日期
  dueDate: string        // 应还日期
  returnDate: string     // 实际归还日期
  status: 'borrowing' | 'returned' | 'overdue'  // 状态
  createTime: string     // 创建时间
}
```

---

## 6. 页面清单

| 页面 | 路由 | 描述 |
|------|------|------|
| 登录页 | /login | 用户登录 |
| 首页/仪表盘 | /dashboard | 系统概览 |
| 图书列表 | /books | 图书管理主页 |
| 用户列表 | /users | 用户管理主页 |
| 借阅列表 | /borrows | 借阅管理主页 |

---

## 7. 冲突解决记录

| 冲突点 | AI 分析 | 用户决策 |
|--------|---------|----------|
| 功能范围 | 初版仅含图书管理、用户管理 | 用户要求添加借阅管理模块 |

---

## 8. 确认结果

- [x] 功能范围：已添加借阅管理模块
- [x] 技术栈：Vue 3 + Element Plus + Vite + Pinia（用户确认合理）
- [x] 数据结构：无需调整

---

**✅ 需求已确认 - 2026-02-08**

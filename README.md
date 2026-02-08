# 图书管理系统前端

一个现代化的图书管理系统前端应用，基于 Vue 3 + Element Plus 技术栈构建。

---

## 1. How to Run

```bash
docker compose up --build -d
```

---

## 2. Services

| 服务 | 地址 |
|------|------|
| 前端管理系统 | http://localhost:8081 |

---

## 3. 测试账号

| 账号 | 密码 | 角色 |
|------|------|------|
| admin | 123456 | 管理员 |
| user | 123456 | 普通用户 |

---

## 4. 题目内容

请创建图书管理系统的前端项目工程，使用vue+element技术栈，包括图书管理，用户管理等功能

---

## 项目介绍

本项目是一个图书管理系统的前端应用，提供图书管理、用户管理、借阅管理等功能，面向图书馆管理员使用。

### 功能模块

- **图书管理**: 图书的增删改查、分类筛选、库存管理
- **用户管理**: 用户的增删改查、状态管理、角色权限
- **借阅管理**: 借阅登记、归还操作、逾期提醒

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue | 3.4.21 |
| UI 组件库 | Element Plus | 2.6.1 |
| 构建工具 | Vite | 5.1.6 |
| 路由 | Vue Router | 4.3.0 |
| 状态管理 | Pinia | 2.1.7 |
| HTTP 客户端 | Axios | 1.6.7 |
| 样式预处理 | SCSS | 1.71.1 |
| 容器化 | Docker + Nginx | Alpine |

---

## 项目结构

```
label-02156/
├── docker-compose.yml          # Docker 编排配置
├── README.md                   # 项目说明文档
├── .gitignore                  # Git 忽略配置
├── docs/                       # 项目文档
│   ├── Requirements.md         # 需求文档
│   ├── Roadmap.md              # 开发路线图
│   ├── DesignSpec.md           # 设计规范
│   ├── AuditReport.md          # 审计报告
│   └── SelfTestReport.md       # 自测报告
└── frontend-admin/             # 前端项目
    ├── Dockerfile              # Docker 构建文件
    ├── nginx.conf              # Nginx 配置
    ├── docker-entrypoint.sh    # 启动脚本
    ├── package.json            # 依赖配置
    ├── vite.config.js          # Vite 配置
    ├── index.html              # 入口 HTML
    ├── public/                 # 静态资源
    │   └── covers/             # 图书封面
    └── src/                    # 源代码
        ├── main.js             # 入口文件
        ├── App.vue             # 根组件
        ├── router/             # 路由配置
        ├── stores/             # 状态管理
        ├── layouts/            # 布局组件
        ├── mock/               # Mock 数据
        ├── views/              # 页面视图
        │   ├── login/          # 登录页
        │   ├── dashboard/      # 首页仪表盘
        │   ├── books/          # 图书管理
        │   ├── users/          # 用户管理
        │   └── borrows/        # 借阅管理
        └── assets/             # 样式资源
            └── styles/         # SCSS 样式
```

---

## 冲突解决记录

| 冲突点 | AI 分析 | 用户决策 |
|--------|---------|----------|
| 功能范围 | 初版仅含图书管理、用户管理 | 用户要求添加借阅管理模块 |

---

## 开发说明

### 本地开发

```bash
cd frontend-admin
npm install
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### Docker 构建

```bash
docker compose up --build -d
```

---

## 页面预览

### 登录页面
现代化渐变背景登录界面，支持账号密码登录

### 首页仪表盘
展示图书总数、用户数、借阅统计等概览信息

### 图书管理
支持图书的搜索、筛选、增删改查操作，封面展示

### 用户管理
支持用户的管理和状态切换，角色权限控制

### 借阅管理
支持借阅登记和归还操作，逾期记录高亮显示

---

## 文档清单

| 文档 | 说明 |
|------|------|
| [Requirements.md](docs/Requirements.md) | 需求文档 |
| [Roadmap.md](docs/Roadmap.md) | 开发路线图 |
| [DesignSpec.md](docs/DesignSpec.md) | 设计规范 |
| [AuditReport.md](docs/AuditReport.md) | 审计报告 |
| [SelfTestReport.md](docs/SelfTestReport.md) | 自测报告 |

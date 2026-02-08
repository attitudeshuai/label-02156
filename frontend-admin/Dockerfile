# ===========================================
# 图书管理系统前端 - Docker 构建配置
# 支持平台: linux/amd64, linux/arm64
# ===========================================

# Build stage - 构建阶段
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --registry=https://registry.npmmirror.com

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ===========================================
# Production stage - 生产阶段
# ===========================================
FROM nginx:alpine

LABEL maintainer="Library Management System"
LABEL description="图书管理系统前端服务"
LABEL version="1.0.0"

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy startup script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start with custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

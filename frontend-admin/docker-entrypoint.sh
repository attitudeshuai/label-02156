#!/bin/sh

echo "============================================"
echo "  图书管理系统前端服务"
echo "  Library Management System Frontend"
echo "============================================"
echo ""
echo "🚀 Startup Success - 启动成功!"
echo ""
echo "📚 访问地址: http://localhost:8081"
echo ""
echo "🔑 测试账号:"
echo "   管理员: admin / 123456"
echo "   用户:   user / 123456"
echo ""
echo "============================================"
echo ""

# Start nginx
exec nginx -g "daemon off;"

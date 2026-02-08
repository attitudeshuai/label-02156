<template>
  <div class="page-container">
    <div class="page-header">
      <h2>系统概览</h2>
    </div>
    
    <!-- Statistics Cards -->
    <el-row :gutter="24" class="stats-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: rgba(64, 158, 255, 0.1)">
              <el-icon :size="32" color="#409EFF"><Reading /></el-icon>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ stats.totalBooks }}</p>
              <p class="stat-label">图书总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: rgba(103, 194, 58, 0.1)">
              <el-icon :size="32" color="#67C23A"><User /></el-icon>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ stats.totalUsers }}</p>
              <p class="stat-label">用户总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: rgba(230, 162, 60, 0.1)">
              <el-icon :size="32" color="#E6A23C"><DocumentCopy /></el-icon>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ stats.borrowing }}</p>
              <p class="stat-label">借阅中</p>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: rgba(245, 108, 108, 0.1)">
              <el-icon :size="32" color="#F56C6C"><Warning /></el-icon>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ stats.overdue }}</p>
              <p class="stat-label">逾期未还</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- Quick Actions -->
    <el-row :gutter="24">
      <el-col :xs="24" :lg="12">
        <el-card class="action-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" @click="$router.push('/books')">
              <el-icon><Plus /></el-icon>
              新增图书
            </el-button>
            <el-button type="success" @click="$router.push('/users')">
              <el-icon><Plus /></el-icon>
              新增用户
            </el-button>
            <el-button type="warning" @click="$router.push('/borrows')">
              <el-icon><Plus /></el-icon>
              登记借阅
            </el-button>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :lg="12">
        <el-card class="action-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
            </div>
          </template>
          <div class="system-info">
            <div class="info-item">
              <span class="info-label">系统名称</span>
              <span class="info-value">图书管理系统</span>
            </div>
            <div class="info-item">
              <span class="info-label">版本号</span>
              <span class="info-value">v1.0.0</span>
            </div>
            <div class="info-item">
              <span class="info-label">技术栈</span>
              <span class="info-value">Vue 3 + Element Plus</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Mock statistics data
const stats = reactive({
  totalBooks: 1280,
  totalUsers: 356,
  borrowing: 89,
  overdue: 12
})
</script>

<style lang="scss" scoped>
.stats-row {
  margin-bottom: 24px;
  
  .el-col {
    margin-bottom: 16px;
  }
}

.stat-card {
  .stat-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .stat-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .stat-info {
    flex: 1;
    
    .stat-value {
      margin: 0 0 4px;
      font-size: 28px;
      font-weight: 600;
      color: #303133;
    }
    
    .stat-label {
      margin: 0;
      font-size: 14px;
      color: #909399;
    }
  }
}

.action-card {
  margin-bottom: 24px;
  
  .card-header {
    font-size: 16px;
    font-weight: 600;
  }
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.system-info {
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #EBEEF5;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      color: #909399;
    }
    
    .info-value {
      color: #303133;
      font-weight: 500;
    }
  }
}
</style>

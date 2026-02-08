<template>
  <div class="page-container">
    <div class="page-header">
      <h2>借阅管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        登记借阅
      </el-button>
    </div>
    
    <!-- Search Bar -->
    <div class="search-bar">
      <el-input
        v-model="searchForm.keyword"
        placeholder="搜索图书名称/借阅人"
        clearable
        style="width: 300px"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      
      <el-select
        v-model="searchForm.status"
        placeholder="借阅状态"
        clearable
        style="width: 150px"
      >
        <el-option label="借阅中" value="borrowing" />
        <el-option label="已归还" value="returned" />
        <el-option label="已逾期" value="overdue" />
      </el-select>
      
      <el-button type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon>
        搜索
      </el-button>
      
      <el-button @click="handleReset">
        <el-icon><Refresh /></el-icon>
        重置
      </el-button>
    </div>
    
    <!-- Table -->
    <div class="table-container">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
        :row-class-name="getRowClassName"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="bookTitle" label="图书名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="userName" label="借阅人" width="100" />
        <el-table-column prop="borrowDate" label="借阅日期" width="120" />
        <el-table-column prop="dueDate" label="应还日期" width="120">
          <template #default="{ row }">
            <span :class="{ 'text-danger': isOverdue(row) }">
              {{ row.dueDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="returnDate" label="归还日期" width="120">
          <template #default="{ row }">
            {{ row.returnDate || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-tooltip v-if="row.status !== 'returned'" content="归还图书" placement="top">
                <el-button type="success" circle size="small" @click="handleReturn(row)">
                  <el-icon><Check /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tag v-else type="info" size="small">已归还</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- Pagination -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSearch"
          @current-change="handleSearch"
        />
      </div>
    </div>
    
    <!-- Add Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="登记借阅"
      width="500px"
      class="borrow-dialog"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="选择图书" prop="bookId">
          <el-select
            v-model="formData.bookId"
            placeholder="请选择图书"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="book in bookOptions"
              :key="book.id"
              :label="book.title"
              :value="book.id"
              :disabled="book.stock <= 0"
            >
              <span>{{ book.title }}</span>
              <span style="float: right; color: #909399; font-size: 12px">
                库存: {{ book.stock }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借阅人" prop="userId">
          <el-select
            v-model="formData.userId"
            placeholder="请选择借阅人"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="user in userOptions"
              :key="user.id"
              :label="user.name"
              :value="user.id"
              :disabled="user.status === 0"
            >
              <span>{{ user.name }}</span>
              <span style="float: right; color: #909399; font-size: 12px">
                {{ user.username }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借阅日期" prop="borrowDate">
          <el-date-picker
            v-model="formData.borrowDate"
            type="date"
            placeholder="请选择借阅日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="应还日期" prop="dueDate">
          <el-date-picker
            v-model="formData.dueDate"
            type="date"
            placeholder="请选择应还日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { mockApi, books, users } from '@/mock/data'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const bookOptions = ref([])
const userOptions = ref([])

const searchForm = reactive({
  keyword: '',
  status: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const formRef = ref(null)
const formData = reactive({
  bookId: null,
  userId: null,
  borrowDate: '',
  dueDate: ''
})

const rules = {
  bookId: [{ required: true, message: '请选择图书', trigger: 'change' }],
  userId: [{ required: true, message: '请选择借阅人', trigger: 'change' }],
  borrowDate: [{ required: true, message: '请选择借阅日期', trigger: 'change' }],
  dueDate: [{ required: true, message: '请选择应还日期', trigger: 'change' }]
}

onMounted(() => {
  loadData()
  loadOptions()
})

const loadData = () => {
  loading.value = true
  setTimeout(() => {
    const result = mockApi.getBorrows({
      ...searchForm,
      page: pagination.page,
      pageSize: pagination.pageSize
    })
    tableData.value = result.list
    pagination.total = result.total
    loading.value = false
  }, 300)
}

const loadOptions = () => {
  bookOptions.value = books
  userOptions.value = users.filter(u => u.role !== 'admin')
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = ''
  handleSearch()
}

const handleAdd = () => {
  resetForm()
  // Set default dates
  const today = new Date()
  const dueDate = new Date(today)
  dueDate.setDate(dueDate.getDate() + 30)
  
  formData.borrowDate = today.toISOString().split('T')[0]
  formData.dueDate = dueDate.toISOString().split('T')[0]
  
  dialogVisible.value = true
}

const handleReturn = (row) => {
  ElMessageBox.confirm('确定要归还该图书吗？', '提示', {
    type: 'warning'
  }).then(() => {
    mockApi.returnBook(row.id)
    ElMessage.success('归还成功')
    loadData()
  }).catch(() => {})
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      mockApi.addBorrow(formData)
      ElMessage.success('借阅登记成功')
      dialogVisible.value = false
      loadData()
    }
  })
}

const handleDialogClose = () => {
  resetForm()
}

const resetForm = () => {
  formData.bookId = null
  formData.userId = null
  formData.borrowDate = ''
  formData.dueDate = ''
  formRef.value?.resetFields()
}

const getStatusType = (status) => {
  const types = {
    borrowing: 'primary',
    returned: 'success',
    overdue: 'danger'
  }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = {
    borrowing: '借阅中',
    returned: '已归还',
    overdue: '已逾期'
  }
  return texts[status] || status
}

const isOverdue = (row) => {
  if (row.status === 'returned') return false
  return new Date(row.dueDate) < new Date()
}

const getRowClassName = ({ row }) => {
  if (row.status === 'overdue') return 'overdue-row'
  return ''
}
</script>

<style lang="scss" scoped>
.text-danger {
  color: #F56C6C;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  .el-button {
    margin: 0 !important;
  }
}

:deep(.overdue-row) {
  background-color: rgba(245, 108, 108, 0.05) !important;
}

// Dialog form spacing
:deep(.borrow-dialog) {
  .el-dialog__body {
    padding-top: 24px;
  }
}
</style>

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '')
  const userRole = computed(() => userInfo.value?.role || '')

  // Actions
  function login(loginData) {
    // Mock login
    const mockUsers = {
      admin: { id: 1, username: 'admin', name: '管理员', role: 'admin' },
      user: { id: 2, username: 'user', name: '普通用户', role: 'user' }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers[loginData.username]
        if (user && loginData.password === '123456') {
          const mockToken = 'mock_token_' + Date.now()
          token.value = mockToken
          userInfo.value = user
          localStorage.setItem('token', mockToken)
          localStorage.setItem('userInfo', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 500)
    })
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    userName,
    userRole,
    login,
    logout
  }
})

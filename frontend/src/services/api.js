import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  createAdmin: (adminData) => api.post('/auth/create-admin', adminData),
}

// Tickets API
export const ticketsAPI = {
  create: (ticketData) => api.post('/tickets/', ticketData),
  getAll: (params = {}) => api.get('/tickets/admin', { params }),
  getById: (id) => api.get(`/tickets/admin/${id}`),
  update: (id, data) => api.put(`/tickets/admin/${id}`, data),
  delete: (id) => api.delete(`/tickets/admin/${id}`),
}

// Chat API
export const chatAPI = {
  sendMessage: (message) => api.post('/chat/messages', message),
  getMessages: (params = {}) => api.get('/chat/messages', { params }),
  markAsRead: (messageId) => api.put(`/chat/messages/${messageId}/read`),
  getUsers: () => api.get('/chat/users'),
}

// Blog API
export const blogAPI = {
  getArticles: (params = {}) => api.get('/blog/articles', { params }),
  getArticleBySlug: (slug) => api.get(`/blog/articles/${slug}`),
  getCategories: (language = 'he') => api.get('/blog/categories', { params: { language } }),
  
  // Admin endpoints
  getAllArticles: (params = {}) => api.get('/blog/admin/articles', { params }),
  createArticle: (articleData) => api.post('/blog/admin/articles', articleData),
  getArticleById: (id) => api.get(`/blog/admin/articles/${id}`),
  updateArticle: (id, data) => api.put(`/blog/admin/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/blog/admin/articles/${id}`),
}

export default api
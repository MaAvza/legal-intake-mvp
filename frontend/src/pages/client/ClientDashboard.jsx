import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { chatAPI } from '../../services/api'

const ClientDashboard = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        const response = await chatAPI.getMessages({ limit: 5 })
        setRecentMessages(response.data)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentMessages()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('client.dashboard')}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">שלום, {user?.full_name}</span>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {t('client.quickActions')}
            </h2>
            <div className="space-y-3">
              <Link
                to="/client/chat"
                className="block w-full bg-primary-600 text-white text-center py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('client.openChat')}
              </Link>
              <Link
                to="/client/profile"
                className="block w-full bg-gray-200 text-gray-800 text-center py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('client.editProfile')}
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {t('client.recentActivity')}
            </h2>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div key={message.id} className="border-b pb-2">
                    <p className="text-sm text-gray-600 truncate">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(message.created_at).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                אין הודעות אחרונות
              </p>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              פרטי חשבון
            </h2>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-600">שם:</span>
                <p className="font-medium">{user?.full_name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">אימייל:</span>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">תאריך הצטרפות:</span>
                <p className="font-medium">
                  {new Date(user?.created_at).toLocaleDateString('he-IL')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-primary-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary-800 mb-2">
            זקוק לעזרה?
          </h3>
          <p className="text-primary-700 mb-4">
            אם יש לך שאלות או זקוק לסיוע, אנא פנה אלינו דרך הצ'אט או שלח לנו אימייל.
          </p>
          <Link
            to="/client/chat"
            className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            פתח צ'אט
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
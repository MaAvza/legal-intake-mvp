import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { chatAPI } from '../../services/api'

const ChatPage = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatAPI.getMessages({ limit: 100 })
        setMessages(response.data)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return

    setSending(true)
    
    try {
      const response = await chatAPI.sendMessage({ message: newMessage })
      setMessages(prev => [...prev, response.data])
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('שגיאה בשליחת ההודעה')
    } finally {
      setSending(false)
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/client" 
                className="text-gray-500 hover:text-gray-700"
              >
                ← חזור ללוח הבקרה
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('chat.title')}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">מחובר</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '60vh' }}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>עדיין לא נשלחו הודעות</p>
                <p className="text-sm mt-2">שלח הודעה ראשונה כדי להתחיל את השיחה</p>
              </div>
            ) : (
              <div className="space-y-4" dir="rtl">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.is_from_admin ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.is_from_admin
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-primary-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.is_from_admin ? 'text-gray-500' : 'text-primary-100'
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={sendMessage} className="flex space-x-2" dir="rtl">
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'שולח...' : t('chat.send')}
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder={t('chat.placeholder')}
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage(e)
                  }
                }}
              />
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              לחץ Enter לשליחה, Shift+Enter לשורה חדשה
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
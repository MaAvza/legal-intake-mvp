import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Turnstile } from '@marsidev/react-turnstile'
import { ticketsAPI } from '../../services/api'

const TicketForm = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    event_summary: '',
    urgency_level: 'Low'
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!turnstileToken) {
      setMessage('אנא השלם את האימות')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      await ticketsAPI.create({
        ...formData,
        turnstile_token: turnstileToken
      })
      
      setMessage(t('ticket.success'))
      setMessageType('success')
      
      // Reset form
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        event_summary: '',
        urgency_level: 'Low'
      })
      setTurnstileToken('')
      
    } catch (error) {
      setMessage(error.response?.data?.detail || 'שגיאה בשליחת הפנייה')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {t('ticket.title')}
      </h2>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ticket.name')} *
          </label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="הכנס שם מלא"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ticket.email')} *
          </label>
          <input
            type="email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ticket.phone')} *
          </label>
          <input
            type="tel"
            name="client_phone"
            value={formData.client_phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="050-1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ticket.urgency')}
          </label>
          <select
            name="urgency_level"
            value={formData.urgency_level}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="Low">{t('ticket.urgency.low')}</option>
            <option value="Medium">{t('ticket.urgency.medium')}</option>
            <option value="High">{t('ticket.urgency.high')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ticket.summary')} *
          </label>
          <textarea
            name="event_summary"
            value={formData.event_summary}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="תאר את האירוע או הבעיה המשפטית בפירוט..."
          />
        </div>

        {/* Turnstile Captcha */}
        <div className="flex justify-center">
          <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAABkMYinukE_NjZO'}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken('')}
            onExpire={() => setTurnstileToken('')}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !turnstileToken}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? t('loading') : t('ticket.submit')}
        </button>
      </form>
    </div>
  )
}

export default TicketForm
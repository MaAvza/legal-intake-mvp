// Path: frontend/src/components/shared/CookieConsentBanner.jsx

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CookieConsentBanner = () => {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Show banner after 2 seconds for better UX
      setTimeout(() => setIsVisible(true), 2000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        console.error('Error loading cookie preferences:', e)
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    setIsVisible(false)
  }

  const handleAcceptSelected = () => {
    const selected = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookieConsent', JSON.stringify(selected))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary))
    setIsVisible(false)
  }

  const togglePreference = (key) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-primary-900/30 backdrop-blur-sm z-[998] animate-fade-in"
        onClick={() => !showSettings && setIsVisible(false)}
      />

      {/* Banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[999] bg-white border-t-2 border-primary-300 shadow-xl animate-slide-up ${
          i18n.language === 'he' ? 'text-right' : 'text-left'
        }`}
        dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          
          {!showSettings ? (
            // Simple View
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Cookie Icon */}
                  <div className="shrink-0 w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="8" cy="10" r="1.5" />
                      <circle cx="16" cy="10" r="1.5" />
                      <circle cx="12" cy="14" r="1.5" />
                      <circle cx="8" cy="16" r="1.5" />
                      <circle cx="16" cy="16" r="1.5" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-primary-800 mb-2">
                      {i18n.language === 'he' 
                        ? 'אנו משתמשים בעוגיות' 
                        : 'Мы используем файлы cookie'}
                    </h3>
                    <p className="text-sm text-primary-700 leading-relaxed max-w-2xl">
                      {i18n.language === 'he'
                        ? 'אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש, לנתח תנועה באתר ולספק תוכן מותאם אישית. על ידי לחיצה על "אישור הכל" אתה מסכים לשימוש בכל העוגיות.'
                        : 'Мы используем файлы cookie для улучшения пользовательского опыта, анализа трафика сайта и предоставления персонализированного контента. Нажимая "Принять все", вы соглашаетесь на использование всех файлов cookie.'}
                    </p>
                    <Link 
                      to="/privacy-policy" 
                      className="text-sm text-accent-500 hover:text-accent-600 underline mt-2 inline-block"
                    >
                      {i18n.language === 'he' ? 'מדיניות פרטיות' : 'Политика конфиденциальности'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="btn btn-outline text-sm py-2 px-4"
                >
                  {i18n.language === 'he' ? 'דחה הכל' : 'Отклонить все'}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="btn btn-ghost text-sm py-2 px-4"
                >
                  {i18n.language === 'he' ? 'הגדרות' : 'Настройки'}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-primary text-sm py-2 px-4"
                >
                  {i18n.language === 'he' ? 'אישור הכל' : 'Принять все'}
                </button>
              </div>
            </div>
          ) : (
            // Settings View
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-800">
                  {i18n.language === 'he' ? 'הגדרות עוגיות' : 'Настройки cookie'}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 flex items-center justify-center text-primary-600 hover:text-accent-500 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-sm text-primary-700 mb-6">
                {i18n.language === 'he'
                  ? 'בחר אילו סוגי עוגיות אתה מאשר. עוגיות הכרחיות לא ניתנות לביטול.'
                  : 'Выберите, какие типы файлов cookie вы разрешаете. Необходимые файлы cookie не могут быть отключены.'}
              </p>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <CookieOption
                  title={i18n.language === 'he' ? 'עוגיות הכרחיות' : 'Необходимые cookie'}
                  description={i18n.language === 'he'
                    ? 'עוגיות אלה חיוניות לתפקוד האתר ואינן ניתנות לביטול.'
                    : 'Эти файлы cookie необходимы для работы сайта и не могут быть отключены.'}
                  checked={true}
                  disabled={true}
                  onChange={() => {}}
                />

                {/* Functional Cookies */}
                <CookieOption
                  title={i18n.language === 'he' ? 'עוגיות פונקציונליות' : 'Функциональные cookie'}
                  description={i18n.language === 'he'
                    ? 'עוגיות אלה מאפשרות פונקציות משופרות כמו העדפות שפה וזכירת נתונים.'
                    : 'Эти файлы cookie обеспечивают расширенные функции, такие как языковые предпочтения и запоминание данных.'}
                  checked={preferences.functional}
                  onChange={() => togglePreference('functional')}
                />

                {/* Analytics Cookies */}
                <CookieOption
                  title={i18n.language === 'he' ? 'עוגיות אנליטיות' : 'Аналитические cookie'}
                  description={i18n.language === 'he'
                    ? 'עוגיות אלה עוזרות לנו להבין כיצד משתמשים באתר ולשפר את השירות.'
                    : 'Эти файлы cookie помогают нам понять, как используется сайт, и улучшить наш сервис.'}
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                />

                {/* Marketing Cookies */}
                <CookieOption
                  title={i18n.language === 'he' ? 'עוגיות שיווקיות' : 'Маркетинговые cookie'}
                  description={i18n.language === 'he'
                    ? 'עוגיות אלה משמשות להצגת פרסומות רלוונטיות ומותאמות אישית.'
                    : 'Эти файлы cookie используются для показа релевантной и персонализированной рекламы.'}
                  checked={preferences.marketing}
                  onChange={() => togglePreference('marketing')}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleRejectAll}
                  className="btn btn-outline text-sm py-2 px-4"
                >
                  {i18n.language === 'he' ? 'דחה הכל' : 'Отклонить все'}
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="btn btn-primary text-sm py-2 px-4"
                >
                  {i18n.language === 'he' ? 'שמור בחירות' : 'Сохранить выбор'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

// Cookie Option Component
const CookieOption = ({ title, description, checked, disabled, onChange }) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-background-100 rounded-lg border border-primary-200">
      <div className="shrink-0 mt-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
          />
          <div className={`w-11 h-6 rounded-full peer transition-all
            ${disabled 
              ? 'bg-primary-200 cursor-not-allowed' 
              : 'bg-primary-200 peer-checked:bg-primary-600 cursor-pointer'
            }
            peer-focus:ring-2 peer-focus:ring-primary-300
            after:content-[''] after:absolute after:top-0.5 after:left-[2px]
            after:bg-white after:rounded-full after:h-5 after:w-5
            after:transition-all peer-checked:after:translate-x-full
          `}/>
        </label>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-primary-800 mb-1">
          {title}
          {disabled && (
            <span className="ml-2 text-xs font-normal text-accent-500">
              ({i18n.language === 'he' ? 'תמיד פעיל' : 'Всегда активно'})
            </span>
          )}
        </h4>
        <p className="text-xs text-primary-700 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default CookieConsentBanner
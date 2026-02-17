// Path: frontend/src/components/public/HomePage.jsx

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import TicketForm from '../forms/TicketForm'
import Footer from '@/components/layout/Footer'
import CookieConsentBanner from '@/components/shared/CookieConsentBanner'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [isReadingAloud, setIsReadingAloud] = useState(false)

  // Show contact popup after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactPopup(true)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  const handleReadAloud = () => {
    const textToRead = i18n.language === 'he' 
      ? "עזריה אבזבקייב עורך דין. מומחה בענייני משפחה, נדל״ן, ודיני עבודה"
      : "Azaria Abezbakaev, Attorney at Law. Expert in Family Law, Real Estate, and Labor Law"
    
    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.lang = i18n.language === 'he' ? 'he-IL' : 'ru-RU'
    utterance.pitch = 1
    utterance.rate = 0.9
    
    window.speechSynthesis.speak(utterance)
    setIsReadingAloud(true)
    
    setTimeout(() => setIsReadingAloud(false), 2000)
  }

  const services = [
    {
      title: i18n.language === 'he' ? 'דיני משפחה' : 'Семейное право',
      titleEn: 'Family Law',
      description: i18n.language === 'he' 
        ? 'גירושין, מזונות, צוואות וירושה. ליווי מקצועי ורגיש בתקופות מורכבות'
        : 'Разводы, алименты, завещания и наследство. Профессиональное сопровождение',
      gradient: 'from-primary-600 to-primary-700',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    },
    {
      title: i18n.language === 'he' ? 'דיני נדל״ן' : 'Недвижимость',
      titleEn: 'Real Estate Law',
      description: i18n.language === 'he'
        ? 'קנייה ומכירה, חוזים וטאבו. ייצוג משפטי מלא בעסקאות נדל״ן'
        : 'Купля-продажа, договоры, регистрация. Полное юридическое сопровождение',
      gradient: 'from-success-500 to-success-600',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      featured: true,
    },
    {
      title: i18n.language === 'he' ? 'דיני עבודה' : 'Трудовое право',
      titleEn: 'Labor Law',
      description: i18n.language === 'he'
        ? 'זכויות עובדים, פיטורים, פיצויים ופנסיה. הגנה על זכויותיך במקום העבודה'
        : 'Права работников, увольнения, компенсации. Защита ваших прав на работе',
      gradient: 'from-accent-500 to-accent-600',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen bg-white" dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-primary-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Language Toggle + Logo */}
            <div className="flex items-center gap-8">
              {/* Language Toggle */}
              <div className="flex items-center gap-2 text-sm font-semibold">
                <button
                  onClick={() => toggleLanguage('he')}
                  className={`transition-all ${
                    i18n.language === 'he' 
                      ? 'text-accent-500 opacity-100' 
                      : 'text-primary-600 opacity-50 hover:opacity-75'
                  }`}
                >
                  עב
                </button>
                <span className="text-primary-300">/</span>
                <button
                  onClick={() => toggleLanguage('ru')}
                  className={`transition-all ${
                    i18n.language === 'ru' 
                      ? 'text-accent-500 opacity-100' 
                      : 'text-primary-600 opacity-50 hover:opacity-75'
                  }`}
                >
                  RU
                </button>
              </div>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-lg font-bold text-primary-800 leading-tight">
                    עזריה אבזבקייב
                  </span>
                  <span className="text-xs text-primary-600 uppercase tracking-wide">
                    עורך דין | שירותים משפטיים
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="nav-link">
                {i18n.language === 'he' ? 'אודות' : 'О нас'}
              </a>
              <a href="#articles" className="nav-link">
                {i18n.language === 'he' ? 'מאמרים' : 'Статьи'}
              </a>
              <a href="#policies" className="nav-link">
                {i18n.language === 'he' ? 'מדיניות' : 'Политика'}
              </a>
            </div>

            {/* Right: Login Button */}
            <Link to="/login" className="btn btn-primary">
              {i18n.language === 'he' ? 'התחברות / הרשמה' : 'Вход / Регистрация'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Accessibility Bar */}
      <div className="bg-background-300 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex justify-end">
          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all text-sm font-semibold ${
              isReadingAloud
                ? 'bg-accent-500 border-accent-500 text-white'
                : 'bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            </svg>
            <span>{i18n.language === 'he' ? 'קריאה בקול' : 'Читать вслух'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section - Expertise Cards */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer ${
                  service.featured 
                    ? 'md:-translate-y-8 md:scale-105' 
                    : 'hover:-translate-y-4 hover:scale-102'
                } shadow-lg hover:shadow-xl`}
                style={{ minHeight: '450px' }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={service.imageUrl}
                    alt={service.titleEn}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 
                             brightness-50 group-hover:brightness-75 transition-all duration-500 
                             group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-80`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 text-white z-10">
                  <h3 className="text-3xl font-bold mb-3 font-serif">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-90 mb-6">
                    {service.description}
                  </p>
                  <button className="self-start px-6 py-3 border-2 border-white rounded-md font-bold 
                                   transition-all hover:bg-white hover:text-primary-900">
                    {i18n.language === 'he' ? 'למידע נוסף' : 'Подробнее'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-background-300">
        <div className="container mx-auto px-4">
          <TicketForm />
        </div>
      </section>

      {/* Contact Popup (appears after 30s) */}
      {showContactPopup && (
        <div 
          className="fixed bottom-8 left-8 z-50 bg-white rounded-2xl shadow-2xl border-2 
                     border-primary-200 w-96 animate-slide-in-left overflow-hidden"
          style={{
            animation: 'slideInLeft 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
          }}
        >
          <button
            onClick={() => setShowContactPopup(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center 
                     text-primary-600 hover:text-accent-500 text-2xl font-bold z-10"
          >
            ×
          </button>
          
          <div className="p-8 text-right">
            <h2 className="text-2xl font-bold text-primary-800 mb-4 font-serif">
              יש לכם שאלה?
            </h2>
            <ul className="mb-4 space-y-2">
              <li className="text-accent-500 font-semibold text-lg">
                סכסוך עם בעל הדירה?
              </li>
              <li className="text-accent-500 font-semibold text-lg">
                ענייני ירושה?
              </li>
            </ul>
            <p className="text-primary-700 mb-6 text-sm">
              השאירו פנייה, אחזור אליכם בהקדם
            </p>
            <a 
              href="#contact-form" 
              onClick={() => setShowContactPopup(false)}
              className="block w-full bg-success-500 text-primary-900 text-center py-3 
                       rounded-lg font-bold hover:bg-primary-600 hover:text-white transition-all"
            >
              מלא טופס פנייה
            </a>
          </div>
        </div>
      )}

      {/* Footer - Updated styling */}
      <Footer></Footer>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .nav-link {
          position: relative;
          color: var(--primary-600);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent-500);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: var(--primary-800);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default HomePage
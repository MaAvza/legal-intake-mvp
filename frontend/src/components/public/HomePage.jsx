import { useTranslation } from 'react-i18next'
import TicketForm from '../forms/TicketForm'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            משרד עורכי דין מקצועי
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            אנו מספקים שירותים משפטיים מקצועיים ואמינים. 
            צרו קשר עמנו לקבלת ייעוץ משפטי מותאם אישית.
          </p>
          <a 
            href="#contact-form" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            פנו אלינו עכשיו
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" dir="rtl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            השירותים שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">דיני משפחה</h3>
              <p className="text-gray-600">
                גירושין, מזונות, משמורת ילדים וכל הנושאים הקשורים לדיני משפחה
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">דיני נדל"ן</h3>
              <p className="text-gray-600">
                קנייה ומכירה, חוזים, סכסוכי שכירות ויעוץ בתחום הנדל"ן
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">דיני עבודה</h3>
              <p className="text-gray-600">
                זכויות עובדים, פיטורים, הטרדות מיניות ויעוץ בדיני עבודה
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TicketForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 משרד עורכי דין. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
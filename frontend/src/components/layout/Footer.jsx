import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-300 pt-16 pb-8 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Brand & About */}
            <div>
              <h4 className="text-primary-800 font-bold text-lg mb-4 pb-2 border-b-2 border-accent-500 inline-block font-serif">
                {i18n.language === 'he' ? 'עזריה אבזבקייב' : 'Азария Абзбакаев'}
              </h4>
              <p className="text-primary-700 text-sm leading-relaxed mb-4">
                {i18n.language === 'he' 
                  ? 'עורך דין מומחה בדיני משפחה, נדל״ן ודיני עבודה. שירות מקצועי ואישי ללקוחותינו.'
                  : 'Адвокат-эксперт по семейному праву, недвижимости и трудовому праву. Профессиональное и личное обслуживание наших клиентов.'}
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 bg-white border-2 border-primary-300 rounded-md 
                            text-primary-700 hover:border-success-500 hover:text-success-600 
                            transition-all text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div>
              <h4 className="text-primary-800 font-bold text-lg mb-4 pb-2 border-b-2 border-accent-500 inline-block font-serif">
                {i18n.language === 'he' ? 'פרטי התקשרות' : 'Контакты'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-primary-700">
                  <svg className="w-5 h-5 mt-0.5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-primary-800">
                      {i18n.language === 'he' ? 'כתובת המשרד' : 'Адрес офиса'}
                    </p>
                    <p>דרך חברון 101, בית הנציב<br/>ירושלים</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-primary-700">
                  <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-primary-800">
                      {i18n.language === 'he' ? 'טלפון' : 'Телефон'}
                    </p>
                    <a href="tel:050-123-4567" className="hover:text-accent-500 transition-colors">
                      050-123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-primary-700">
                  <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-primary-800">
                      {i18n.language === 'he' ? 'דוא״ל' : 'Email'}
                    </p>
                    <a href="mailto:office@advocate.co.il" className="hover:text-accent-500 transition-colors">
                      avezback@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-primary-800 font-bold text-lg mb-4 pb-2 border-b-2 border-accent-500 inline-block font-serif">
                {i18n.language === 'he' ? 'קישורים' : 'Ссылки'}
              </h4>
              <div className="flex flex-col space-y-2">
                <a href="/" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'דף הבית' : 'Главная'}
                </a>
                <a href="/about" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'אודות' : 'О нас'}
                </a>
                <a href="/articles" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'מאמרים' : 'Статьи'}
                </a>
                <a href="/privacy" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'מדיניות פרטיות' : 'Политика конфиденциальности'}
                </a>
                <a href="/terms" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'תנאי שימוש' : 'Условия использования'}
                </a>
                <a href="/admin" className="text-primary-700 hover:text-accent-500 hover:translate-x-1 transition-all text-sm">
                  {i18n.language === 'he' ? 'כניסת עורכי דין' : 'Вход для юристов'}
                </a>
              </div>
            </div>

            {/* Column 4: Map */}
            <div>
              <h4 className="text-primary-800 font-bold text-lg mb-4 pb-2 border-b-2 border-accent-500 inline-block font-serif">
                {i18n.language === 'he' ? 'מיקום' : 'Расположение'}
              </h4>
              <div className="relative h-48 rounded-xl overflow-hidden border-2 border-primary-200 group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.570267702606!2d35.2227!3d31.7552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150328222c264259%3A0x8d134f71a620760!2sBeit%20HaNatziv!5e0!3m2!1sen!2sil!4v1625641234567!5m2!1he!2sil"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="grayscale-[80%] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
                <div className="absolute inset-0 bg-primary-600/20 group-hover:bg-transparent transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-primary-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-600 text-sm">
              © {new Date().getFullYear()} {i18n.language === 'he' ? 'עזריה אבזבקייב עורך דין. כל הזכויות שמורות.' : 'Азария Абзбакаев. Все права защищены.'}
            </p>
            
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-primary-600 hover:text-accent-500 transition-colors">
                {i18n.language === 'he' ? 'מדיניות פרטיות' : 'Политика'}
              </a>
              <a href="/terms" className="text-primary-600 hover:text-accent-500 transition-colors">
                {i18n.language === 'he' ? 'תנאי שימוש' : 'Условия'}
              </a>
              <a href="https://israelbar.org.il" target="_blank" rel="noopener noreferrer" 
                 className="text-primary-600 hover:text-accent-500 transition-colors flex items-center gap-1">
                {i18n.language === 'he' ? 'לשכת עורכי הדין' : 'Адвокатская палата'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
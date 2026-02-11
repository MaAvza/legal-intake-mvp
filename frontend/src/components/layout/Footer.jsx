import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8 font-sans" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900">
                עזריה אבזבקייב
              </h2>
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1">
                 עורך דין
              </p>
            </div>
            
            {/* Social Buttons (Outline Style) */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://wa.me/972500000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-md text-neutral-700 hover:border-green-500 hover:text-green-600 transition-colors shadow-xs"
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-md text-neutral-700 hover:border-blue-600 hover:text-blue-600 transition-colors shadow-xs"
              >
                <Facebook size={18} />
                <span className="text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif text-lg font-semibold text-neutral-900">קישורים </h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-neutral-600 hover:text-primary-600 transition-colors">דף הבית</a></li>
              <li><a href="/about" className="text-neutral-600 hover:text-primary-600 transition-colors">אודות</a></li>
              <li><a href="/articles" className="text-neutral-600 hover:text-primary-600 transition-colors">מאמרים</a></li>
              <li><a href="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">יצירת קשר</a></li>
              <li><a href="/admin" className="text-neutral-600 hover:text-primary-600 transition-colors">כניסת עורכי דין</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-serif text-lg font-semibold text-neutral-900">פרטי התקשרות</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-1 shrink-0" />
                <div>
                  <p className="text-neutral-900 font-medium">כתובת המשרד</p>
                  <p className="text-neutral-600">דרך חברון 101, בית הנציב<br/>ירושלים</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                <div className="dir-ltr text-right">
                  <p className="text-neutral-900 font-medium">טלפון</p>
                  <a href="tel:052-668-5874" className="text-neutral-600 hover:text-neutral-900">050-123-4567</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                <div>
                  <p className="text-neutral-900 font-medium">דוא״ל</p>
                  <a href="mailto:avezback@gmail.com" className="text-neutral-600 hover:text-neutral-900">office@advocate.co.il</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Map (3 cols) */}
          <div className="lg:col-span-3">
            <div className="h-full min-h-[200px] w-full bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300 shadow-sm relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.570267702606!2d35.2227!3d31.7552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150328222c264259%3A0x8d134f71a620760!2sBeit%20HaNatziv!5e0!3m2!1sen!2sil!4v1625641234567!5m2!1he!2sil"
                width="100%" 
                height="100%" 
                style={{border:0, minHeight: '200px'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Separator & Copyright */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} עזריה אבזבקייב עורך דין. כל הזכויות שמורות.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-neutral-500 hover:text-neutral-900 transition-colors">מדיניות פרטיות</a>
            <a href="/terms" className="text-neutral-500 hover:text-neutral-900 transition-colors">תנאי שימוש</a>
            <a href="https://israelbar.org.il" target="_blank" className="text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1">
              לשכת עורכי הדין <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
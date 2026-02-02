import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  he: {
    translation: {
      // Navigation
      home: 'בית',
      about: 'אודות',
      services: 'שירותים',
      blog: 'בלוג',
      contact: 'צור קשר',
      login: 'התחברות',
      register: 'הרשמה',
      logout: 'התנתקות',
      
      // Common
      submit: 'שלח',
      cancel: 'ביטול',
      save: 'שמור',
      edit: 'ערוך',
      delete: 'מחק',
      loading: 'טוען...',
      error: 'שגיאה',
      success: 'הצלחה',
      
      // Ticket Form
      'ticket.title': 'פנייה חדשה',
      'ticket.name': 'שם מלא',
      'ticket.email': 'כתובת אימייל',
      'ticket.phone': 'מספר טלפון',
      'ticket.summary': 'תיאור האירוע',
      'ticket.urgency': 'רמת דחיפות',
      'ticket.urgency.low': 'נמוכה',
      'ticket.urgency.medium': 'בינונית',
      'ticket.urgency.high': 'גבוהה',
      'ticket.submit': 'שלח פנייה',
      'ticket.success': 'הפנייה נשלחה בהצלחה',
      
      // Auth
      'auth.login': 'התחברות',
      'auth.register': 'הרשמה',
      'auth.email': 'אימייל',
      'auth.password': 'סיסמה',
      'auth.fullName': 'שם מלא',
      'auth.loginButton': 'התחבר',
      'auth.registerButton': 'הירשם',
      
      // Dashboard
      'client.dashboard': 'לוח בקרה',
      'client.quickActions': 'פעולות מהירות',
      'client.openChat': 'פתח צ\'אט',
      'client.editProfile': 'ערוך פרופיל',
      'client.recentActivity': 'פעילות אחרונה',
      
      // Chat
      'chat.title': 'צ\'אט עם עורך הדין',
      'chat.placeholder': 'הקלד הודעה...',
      'chat.send': 'שלח',
      
      // Admin
      'admin.dashboard': 'לוח בקרה מנהל',
      'admin.newTickets': 'פניות חדשות',
      'admin.activeChats': 'צ\'אטים פעילים',
      'admin.totalClients': 'סה"כ לקוחות',
      'admin.tickets': 'פניות',
      'admin.clients': 'לקוחות',
      'admin.articles': 'מאמרים',
    }
  },
  ru: {
    translation: {
      // Navigation
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      blog: 'Блог',
      contact: 'Контакты',
      login: 'Вход',
      register: 'Регистрация',
      logout: 'Выход',
      
      // Common
      submit: 'Отправить',
      cancel: 'Отмена',
      save: 'Сохранить',
      edit: 'Редактировать',
      delete: 'Удалить',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
      
      // Ticket Form
      'ticket.title': 'Новое обращение',
      'ticket.name': 'Полное имя',
      'ticket.email': 'Email адрес',
      'ticket.phone': 'Номер телефона',
      'ticket.summary': 'Описание события',
      'ticket.urgency': 'Уровень срочности',
      'ticket.urgency.low': 'Низкий',
      'ticket.urgency.medium': 'Средний',
      'ticket.urgency.high': 'Высокий',
      'ticket.submit': 'Отправить обращение',
      'ticket.success': 'Обращение успешно отправлено',
      
      // Auth
      'auth.login': 'Вход',
      'auth.register': 'Регистрация',
      'auth.email': 'Email',
      'auth.password': 'Пароль',
      'auth.fullName': 'Полное имя',
      'auth.loginButton': 'Войти',
      'auth.registerButton': 'Зарегистрироваться',
      
      // Dashboard
      'client.dashboard': 'Панель управления',
      'client.quickActions': 'Быстрые действия',
      'client.openChat': 'Открыть чат',
      'client.editProfile': 'Редактировать профиль',
      'client.recentActivity': 'Последняя активность',
      
      // Chat
      'chat.title': 'Чат с адвокатом',
      'chat.placeholder': 'Введите сообщение...',
      'chat.send': 'Отправить',
      
      // Admin
      'admin.dashboard': 'Панель администратора',
      'admin.newTickets': 'Новые обращения',
      'admin.activeChats': 'Активные чаты',
      'admin.totalClients': 'Всего клиентов',
      'admin.tickets': 'Обращения',
      'admin.clients': 'Клиенты',
      'admin.articles': 'Статьи',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he', // default language
    fallbackLng: 'he',
    
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
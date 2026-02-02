import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { ticketsAPI, chatAPI } from '../../services/api'

const AdminDashboard = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    newTickets: 0,
    activeChats: 0,
    totalClients: 0
  })
  const [tickets, setTickets] = useState([])
  const [chatUsers, setChatUsers] = useState([])
  const [activeTab, setActiveTab] = useState('tickets')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tickets
        const ticketsResponse = await ticketsAPI.getAll({ limit: 10 })
        setTickets(ticketsResponse.data)
        
        // Fetch chat users
        const chatUsersResponse = await chatAPI.getUsers()
        setChatUsers(chatUsersResponse.data)
        
        // Calculate stats
        const newTicketsCount = ticketsResponse.data.filter(t => t.status === 'New').length
        setStats({
          newTickets: newTicketsCount,
          activeChats: chatUsersResponse.data.length,
          totalClients: chatUsersResponse.data.length
        })
        
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await ticketsAPI.update(ticketId, { status: newStatus })
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status: newStatus }
            : ticket
        )
      )
    } catch (error) {
      console.error('Failed to update ticket:', error)
      alert('שגיאה בעדכון הפנייה')
    }
  }

  const StatCard = ({ title, value, color = 'primary' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <p className={`text-4xl font-bold text-${color}-600`}>{value}</p>
    </div>
  )

  const TicketCard = ({ ticket }) => (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900">{ticket.client_name}</h4>
        <span className={`px-2 py-1 text-xs rounded-full ${
          ticket.status === 'New' ? 'bg-red-100 text-red-800' :
          ticket.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{ticket.client_email}</p>
      <p className="text-sm text-gray-800 mb-3 line-clamp-2">
        {ticket.event_summary}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(ticket.created_at).toLocaleDateString('he-IL')}
        </span>
        <div className="flex space-x-2">
          {ticket.status === 'New' && (
            <button
              onClick={() => updateTicketStatus(ticket.id, 'Reviewed')}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
            >
              סמן כנבדק
            </button>
          )}
          {ticket.status !== 'Closed' && (
            <button
              onClick={() => updateTicketStatus(ticket.id, 'Closed')}
              className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
            >
              סגור
            </button>
          )}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('admin.dashboard')}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title={t('admin.newTickets')} 
            value={stats.newTickets}
            color="red"
          />
          <StatCard 
            title={t('admin.activeChats')} 
            value={stats.activeChats}
            color="blue"
          />
          <StatCard 
            title={t('admin.totalClients')} 
            value={stats.totalClients}
            color="green"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'tickets'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('admin.tickets')} ({tickets.length})
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'clients'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('admin.clients')} ({chatUsers.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'tickets' && (
              <div>
                <h3 className="text-lg font-medium mb-4">פניות אחרונות</h3>
                {tickets.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">אין פניות</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tickets.map(ticket => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'clients' && (
              <div>
                <h3 className="text-lg font-medium mb-4">לקוחות פעילים</h3>
                {chatUsers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">אין לקוחות פעילים</p>
                ) : (
                  <div className="space-y-4">
                    {chatUsers.map(client => (
                      <div key={client.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{client.full_name}</h4>
                          <p className="text-sm text-gray-600">{client.email}</p>
                          <p className="text-xs text-gray-500">
                            {client.message_count} הודעות | 
                            آخر הודעה: {new Date(client.last_message_at).toLocaleDateString('he-IL')}
                          </p>
                        </div>
                        <a
                          href={`/admin/chat/${client.id}`}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                        >
                          פתח צ'אט
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
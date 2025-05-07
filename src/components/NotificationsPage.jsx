import React, { useState } from 'react';

const NotificationsPage = () => {
  // Estado para el filtro de notificaciones
  const [filter, setFilter] = useState('all');
  
  // Estado para notificaciones leídas/no leídas
  const [notificationsState, setNotificationsState] = useState({
    1: false, // no leída
    2: false, // no leída
    3: true,  // leída
    4: true   // leída
  });
  
  // Todas las notificaciones
  const allNotifications = [
    { 
      id: 1, 
      title: 'Ritmo Cardíaco Elevado', 
      message: 'Tu ritmo cardíaco estuvo por encima de 90 lpm durante 30 minutos hoy.', 
      time: 'hace 2 horas',
      type: 'alert',
      icon: (
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    { 
      id: 2, 
      title: 'Objetivo Diario Alcanzado', 
      message: '¡Felicidades! Alcanzaste tu objetivo diario de 8.000 pasos.', 
      time: 'hace 4 horas',
      type: 'achievement',
      icon: (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    { 
      id: 3, 
      title: 'Informe de Sueño Listo', 
      message: 'Tu informe de sueño de anoche ya está disponible. Toca para ver detalles.', 
      time: 'hace 8 horas',
      type: 'info',
      icon: (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    { 
      id: 4, 
      title: 'Temperatura Corporal Normal', 
      message: 'Tu temperatura corporal ha vuelto al rango normal.', 
      time: 'hace 1 día',
      type: 'info',
      icon: (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v8.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8 11.586V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
  ];
  
  // Filtrar notificaciones según el filtro seleccionado
  const getFilteredNotifications = () => {
    if (filter === 'all') {
      return allNotifications;
    } else if (filter === 'unread') {
      return allNotifications.filter(notification => !notificationsState[notification.id]);
    } else {
      return allNotifications.filter(notification => notification.type === filter);
    }
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Marcar como leída/no leída
  const toggleReadStatus = (id) => {
    setNotificationsState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Marcar todas como leídas
  const markAllAsRead = () => {
    const newState = {};
    allNotifications.forEach(notification => {
      newState[notification.id] = true;
    });
    setNotificationsState(newState);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado y controles */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-l-md`}
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'unread' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('unread')}
            >
              No leídas
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'alert' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('alert')}
            >
              Alertas
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'info' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300 rounded-r-md`}
              onClick={() => setFilter('info')}
            >
              Info
            </button>
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-50"
          onClick={markAllAsRead}
        >
          Marcar todas como leídas
        </button>
      </div>
      
      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-xl border text-center">
            <p className="text-gray-500">No hay notificaciones que coincidan con el filtro seleccionado.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const isRead = notificationsState[notification.id];
            
            return (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg shadow-sm flex ${isRead ? 'bg-white' : 'bg-blue-50'} hover:shadow-md transition-shadow`}
              >
                <div className="mr-4">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">
                      {notification.title}
                      {!isRead && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Nueva
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 my-1">{notification.message}</p>
                  <div className="mt-2 flex">
                    <button className="text-sm text-blue-600 hover:text-blue-800 mr-4">
                      Ver detalles
                    </button>
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => toggleReadStatus(notification.id)}
                    >
                      {isRead ? 'Marcar como no leída' : 'Marcar como leída'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
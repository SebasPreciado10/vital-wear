import React, { useState } from 'react';
import { Home, Clock, Bell, User } from 'lucide-react';
import NavButton from './components/NavButton';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Renderizar la página apropiada según la selección actual
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'history':
        return <HistoryPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header para PC */}
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Salud Ahora</h1>
          
          <div className="hidden md:flex">
            <div className="flex space-x-8">
              <button 
                className={`px-3 py-2 font-medium ${currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setCurrentPage('home')}
              >
                Inicio
              </button>
              <button 
                className={`px-3 py-2 font-medium ${currentPage === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setCurrentPage('history')}
              >
                Historial
              </button>
              <button 
                className={`px-3 py-2 font-medium ${currentPage === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setCurrentPage('notifications')}
              >
                Notificaciones
              </button>
              <button 
                className={`px-3 py-2 font-medium ${currentPage === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setCurrentPage('profile')}
              >
                Perfil
              </button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span>Juan Pérez</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tu cuenta</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Configuración</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Contenido Principal */}
      <main className="pt-6 pb-20 md:pb-6">
        <div className="container mx-auto px-6">
          {/* Título de página para PC */}
          <div className="mb-6 hidden md:block">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentPage === 'home' && 'Dashboard'}
              {currentPage === 'history' && 'Historial de Salud'}
              {currentPage === 'notifications' && 'Centro de Notificaciones'}
              {currentPage === 'profile' && 'Tu Perfil'}
            </h2>
          </div>
          
          {renderPage()}
        </div>
      </main>
      
      {/* Barra de Navegación Móvil */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3">
          <NavButton 
            icon={<Home size={24} />} 
            label="Inicio" 
            isActive={currentPage === 'home'}
            onClick={() => setCurrentPage('home')}
          />
          <NavButton 
            icon={<Clock size={24} />} 
            label="Historial" 
            isActive={currentPage === 'history'}
            onClick={() => setCurrentPage('history')}
          />
          <NavButton 
            icon={<Bell size={24} />} 
            label="Notificaciones" 
            isActive={currentPage === 'notifications'}
            onClick={() => setCurrentPage('notifications')}
          />
          <NavButton 
            icon={<User size={24} />} 
            label="Perfil" 
            isActive={currentPage === 'profile'}
            onClick={() => setCurrentPage('profile')}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
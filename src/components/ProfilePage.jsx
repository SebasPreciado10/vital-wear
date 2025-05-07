import React, { useState } from 'react';

const ProfilePage = () => {
  // Estado para las pestañas
  const [activeTab, setActiveTab] = useState('info');
  
  // Estado para los interruptores
  const [notificationSettings, setNotificationSettings] = useState({
    heartRate: true,
    temperature: true,
    oxygen: true,
    steps: false,
    sleep: true,
    weeklyReport: true
  });
  
  // Cambiar configuración de notificaciones
  const toggleNotification = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para la información del usuario
  const [userInfo, setUserInfo] = useState({
    name: 'Yulissa Builes Pemberthy',
    age: '21',
    height: '165',
    weight: '58',
    bloodType: 'O+',
    stepGoal: '12000',
    sleepGoal: '8'
  });
  
  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Guardar cambios
  const saveChanges = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar los cambios en el servidor
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado del perfil */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 bg-purple-200 rounded-full overflow-hidden">
              {/* Aquí iría la imagen de perfil */}
              <div className="w-full h-full flex items-center justify-center text-purple-600 text-xl">
                YB
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.age} años • Usuario desde Marzo 2025</p>
            
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded border ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancelar edición' : 'Editar perfil'}
              </button>
              {isEditing && (
                <button 
                  className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded border border-green-600 hover:bg-green-700"
                  onClick={saveChanges}
                >
                  Guardar cambios
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Información Personal
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'goals'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('goals')}
            >
              Objetivos de Salud
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'device'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('device')}
            >
              Dispositivo
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Notificaciones
            </button>
          </nav>
        </div>
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* Información Personal */}
        {activeTab === 'info' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Información Personal</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Edad
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={userInfo.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (cm)
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={userInfo.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={userInfo.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Sangre
                  </label>
                  <select
                    name="bloodType"
                    value={userInfo.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-500">Nombre</div>
                <div>{userInfo.name}</div>
                <div className="text-gray-500">Edad</div>
                <div>{userInfo.age} años</div>
                <div className="text-gray-500">Altura</div>
                <div>{userInfo.height} cm</div>
                <div className="text-gray-500">Peso</div>
                <div>{userInfo.weight} kg</div>
                <div className="text-gray-500">Tipo de Sangre</div>
                <div>{userInfo.bloodType}</div>
                <div className="text-gray-500">IMC</div>
                <div>{(userInfo.weight / ((userInfo.height/100) * (userInfo.height/100))).toFixed(1)} kg/m² (Normal)</div>
              </div>
            )}
          </div>
        )}
        
        {/* Objetivos de Salud */}
        {activeTab === 'goals' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Objetivos de Salud</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo Diario de Pasos
                  </label>
                  <input
                    type="text"
                    name="stepGoal"
                    value={userInfo.stepGoal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo de Sueño (horas/noche)
                  </label>
                  <input
                    type="text"
                    name="sleepGoal"
                    value={userInfo.sleepGoal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pasos Diarios</span>
                    <span>{userInfo.stepGoal} pasos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Has completado 9.056 pasos hoy (75%)</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Sueño</span>
                    <span>{userInfo.sleepGoal} horas/noche</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full w-5/6"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Dormiste 6.8 horas anoche (85%)</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Ejercicio</span>
                    <span>45 minutos/día</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Has completado 30 minutos hoy (66%)</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Información del Dispositivo */}
        {activeTab === 'device' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Información del Dispositivo</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Nombre del Dispositivo</span>
                <span>Salud Ahora</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Número de Serie</span>
                <span>VW2025030289</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Batería</span>
                <span>92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Versión de Firmware</span>
                <span>v2.5.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Última Sincronización</span>
                <span>hace 5 minutos</span>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                  Sincronizar Ahora
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded border border-gray-300 ml-2 hover:bg-gray-50">
                  Buscar Actualizaciones
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Dispositivos Vinculados</h4>
                <div className="flex items-center justify-between p-3 border rounded mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3">
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        📱
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Samsung Galaxy S22</div>
                      <div className="text-sm text-gray-500">Conectado</div>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-800">
                    Desvincular
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Configuración de Notificaciones */}
        {activeTab === 'notifications' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Preferencias de Notificación</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-medium">Alertas de Ritmo Cardíaco</h4>
                  <p className="text-sm text-gray-500">Recibe alertas cuando tu ritmo cardíaco esté fuera de rango</p>
                </div>
                <button 
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    notificationSettings.heartRate ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification('heartRate')}
                >
                  <span 
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                      notificationSettings.heartRate ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-medium">Alertas de Temperatura</h4>
                  <p className="text-sm text-gray-500">Recibe alertas cuando tu temperatura esté fuera de rango</p>
                </div>
                <button 
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    notificationSettings.temperature ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification('temperature')}
                >
                  <span 
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                      notificationSettings.temperature ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-medium">Alertas de Oxígeno en Sangre</h4>
                  <p className="text-sm text-gray-500">Recibe alertas cuando tu nivel de oxígeno esté bajo</p>
                </div>
                <button 
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    notificationSettings.oxygen ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification('oxygen')}
                >
                  <span 
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                      notificationSettings.oxygen ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-medium">Recordatorios de Pasos</h4>
                  <p className="text-sm text-gray-500">Recibe recordatorios para completar tu objetivo de pasos</p>
                </div>
                <button 
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    notificationSettings.steps ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification('steps')}
                >
                  <span 
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                      notificationSettings.steps ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-medium">Informes Semanales</h4>
                  <p className="text-sm text-gray-500">Recibe un informe semanal con tus estadísticas de salud</p>
                </div>
                <button 
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    notificationSettings.weeklyReport ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification('weeklyReport')}
                >
                  <span 
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                      notificationSettings.weeklyReport ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
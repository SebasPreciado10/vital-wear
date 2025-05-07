import React, { useState, useEffect } from 'react';

const HomePage = () => {
  // Estado inicial para los valores vitales
  const [vitalData, setVitalData] = useState([
    { 
      id: 'heart-rate', 
      label: 'Ritmo Cardíaco', 
      value: '81', 
      unit: 'lpm',
      minValue: 60,
      maxValue: 100,
      icon: (
        <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      expanded: false,
      status: 'normal'
    },
    { 
      id: 'body-temp', 
      label: 'Temperatura Corporal', 
      value: '37,0', 
      unit: '°C',
      minValue: 36.1,
      maxValue: 37.2,
      icon: (
        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v8.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8 11.586V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      expanded: false,
      status: 'normal'
    },
    { 
      id: 'blood-oxygen', 
      label: 'Oxígeno en Sangre', 
      value: '99', 
      unit: '%',
      minValue: 95,
      maxValue: 100,
      icon: (
        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      expanded: false,
      status: 'normal'
    },
    { 
      id: 'respiratory-rate', 
      label: 'Frecuencia Respiratoria', 
      value: '19', 
      unit: 'rpm',
      minValue: 12,
      maxValue: 20,
      icon: (
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7V5" />
          </svg>
        </div>
      ),
      expanded: false,
      status: 'normal'
    },
    {
      id: 'steps',
      label: 'Pasos',
      value: '4102',
      unit: 'pasos',
      minValue: 0,
      maxValue: 12000,
      icon: (
        <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      expanded: false,
      status: 'normal'
    }
  ]);

  // Función para generar un valor aleatorio dentro de un rango
  const getRandomValue = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Función para formatear valores (algunos con coma, otros con punto)
  const formatValue = (value, id) => {
    if (id === 'body-temp') {
      return value.toFixed(1).replace('.', ',');
    } else if (id === 'steps') {
      return Math.round(value);
    } else {
      return Math.round(value);
    }
  };

  // Determinar el estado de un valor vital
  const getStatus = (value, id, minValue, maxValue) => {
    let numValue;
    
    if (id === 'body-temp') {
      numValue = parseFloat(value.replace(',', '.'));
    } else {
      numValue = parseInt(value);
    }
    
    // Definir umbrales para cada tipo de valor vital
    if (id === 'heart-rate') {
      if (numValue < 60) return 'low';
      if (numValue > 90) return 'high';
    } else if (id === 'body-temp') {
      if (numValue < 36.5) return 'low';
      if (numValue > 37.0) return 'high';
    } else if (id === 'blood-oxygen') {
      if (numValue < 95) return 'low';
    } else if (id === 'respiratory-rate') {
      if (numValue < 12) return 'low';
      if (numValue > 18) return 'high';
    }
    
    return 'normal';
  };

  // Función para expandir/contraer una tarjeta
  const toggleExpand = (id) => {
    setVitalData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  // Actualizar valores vitales cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalData(prevData => 
        prevData.map(item => {
          const newValue = formatValue(getRandomValue(item.minValue, item.maxValue), item.id);
          const newStatus = getStatus(newValue, item.id, item.minValue, item.maxValue);
          return {
            ...item,
            value: newValue,
            status: newStatus
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Renderizar tarjetas de valores vitales con el nuevo diseño interactivo
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitalData.map((vital) => {
          // Determinar clases basadas en el estado
          let statusClass = '';
          let statusText = '';
          
          if (vital.status === 'high') {
            statusClass = 'text-red-600';
            statusText = 'Alto';
          } else if (vital.status === 'low') {
            statusClass = 'text-blue-600';
            statusText = 'Bajo';
          } else {
            statusClass = 'text-green-600';
            statusText = 'Normal';
          }
          
          return (
            <div 
              key={vital.id} 
              className={`p-4 border rounded-xl shadow-sm transition-all duration-200 ${
                vital.expanded ? 'col-span-1 md:col-span-2' : ''
              } hover:shadow-md cursor-pointer`}
              onClick={() => toggleExpand(vital.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="mr-4">{vital.icon}</div>
                  <div>
                    <h2 className="text-lg font-semibold">{vital.label}</h2>
                    <span className={`text-sm ${statusClass}`}>{statusText}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">{vital.value}</span>
                  <span className="text-sm ml-1 text-gray-600">{vital.unit}</span>
                </div>
              </div>
              
              {vital.expanded && (
                <div className="mt-4 pt-4 border-t">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Rango normal</span>
                      <span>
                        {vital.id === 'heart-rate' && '60-90 lpm'}
                        {vital.id === 'body-temp' && '36,5-37,0 °C'}
                        {vital.id === 'blood-oxygen' && '95-100 %'}
                        {vital.id === 'respiratory-rate' && '12-18 rpm'}
                        {vital.id === 'steps' && 'Meta: 10.000 pasos'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          vital.status === 'normal' ? 'bg-green-500' :
                          vital.status === 'high' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{
                          width: vital.id === 'steps' 
                            ? `${Math.min(100, (parseInt(vital.value) / 10000) * 100)}%`
                            : '70%'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {vital.id === 'heart-rate' && 'Tu ritmo cardíaco indica la cantidad de veces que tu corazón late por minuto. Es un indicador importante de tu salud cardiovascular.'}
                    {vital.id === 'body-temp' && 'La temperatura corporal normal varía pero generalmente está alrededor de 37°C. Desviaciones significativas pueden indicar fiebre o hipotermia.'}
                    {vital.id === 'blood-oxygen' && 'El nivel de oxígeno en la sangre debe estar por encima del 95%. Niveles más bajos podrían indicar problemas respiratorios.'}
                    {vital.id === 'respiratory-rate' && 'La frecuencia respiratoria mide cuántas respiraciones tomas por minuto. Cambios significativos pueden indicar estrés o problemas respiratorios.'}
                    {vital.id === 'steps' && 'El conteo de pasos ayuda a monitorear tu nivel de actividad física. El objetivo recomendado es de 10.000 pasos diarios.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Resumen Diario</h3>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-gray-700">
            Tus signos vitales están en su mayoría dentro de rangos normales. Has completado 
            <span className="font-medium"> {vitalData.find(v => v.id === 'steps')?.value} </span> 
            de los 10.000 pasos recomendados diariamente.
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${Math.min(100, (parseInt(vitalData.find(v => v.id === 'steps')?.value || 0) / 10000) * 100)}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
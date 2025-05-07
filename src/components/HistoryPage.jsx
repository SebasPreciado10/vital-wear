import React, { useState } from 'react';

const HistoryPage = () => {
  // Estado para el filtro de días
  const [daysFilter, setDaysFilter] = useState('7');
  
  // Estado para ordenamiento
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Datos ficticios para el historial
  const allHistoryData = [
    { date: '6 Mayo', heartRate: '81', bodyTemp: '37,0', bloodOxygen: '99', respRate: '19', steps: '4.102' },
    { date: '5 Mayo', heartRate: '75', bodyTemp: '36,7', bloodOxygen: '98', respRate: '15', steps: '10.234' },
    { date: '4 Mayo', heartRate: '82', bodyTemp: '36,6', bloodOxygen: '96', respRate: '17', steps: '7.890' },
    { date: '3 Mayo', heartRate: '79', bodyTemp: '36,8', bloodOxygen: '97', respRate: '16', steps: '9.123' },
    { date: '2 Mayo', heartRate: '76', bodyTemp: '36,4', bloodOxygen: '98', respRate: '14', steps: '6.789' },
    { date: '1 Mayo', heartRate: '78', bodyTemp: '36,5', bloodOxygen: '97', respRate: '16', steps: '8.456' },
    { date: '30 Abril', heartRate: '77', bodyTemp: '36,6', bloodOxygen: '98', respRate: '15', steps: '7.123' },
    { date: '29 Abril', heartRate: '80', bodyTemp: '36,8', bloodOxygen: '96', respRate: '18', steps: '9.876' },
    { date: '28 Abril', heartRate: '79', bodyTemp: '36,7', bloodOxygen: '97', respRate: '17', steps: '8.234' },
    { date: '27 Abril', heartRate: '76', bodyTemp: '36,5', bloodOxygen: '98', respRate: '15', steps: '7.567' },
    { date: '26 Abril', heartRate: '77', bodyTemp: '36,6', bloodOxygen: '97', respRate: '16', steps: '8.901' },
    { date: '25 Abril', heartRate: '78', bodyTemp: '36,7', bloodOxygen: '96', respRate: '17', steps: '9.345' },
    { date: '24 Abril', heartRate: '75', bodyTemp: '36,5', bloodOxygen: '98', respRate: '14', steps: '6.234' },
    { date: '23 Abril', heartRate: '74', bodyTemp: '36,4', bloodOxygen: '97', respRate: '15', steps: '7.890' },
  ];
  
  // Filtrar datos según el número de días seleccionado
  const filteredData = allHistoryData.slice(0, parseInt(daysFilter));
  
  // Ordenar datos según las selecciones actuales
  const sortedData = [...filteredData].sort((a, b) => {
    let valueA, valueB;
    
    // Determinar qué valores comparar según la columna seleccionada
    if (sortBy === 'date') {
      valueA = a.date;
      valueB = b.date;
    } else if (sortBy === 'heartRate') {
      valueA = parseInt(a.heartRate);
      valueB = parseInt(b.heartRate);
    } else if (sortBy === 'bodyTemp') {
      valueA = parseFloat(a.bodyTemp.replace(',', '.'));
      valueB = parseFloat(b.bodyTemp.replace(',', '.'));
    } else if (sortBy === 'bloodOxygen') {
      valueA = parseInt(a.bloodOxygen);
      valueB = parseInt(b.bloodOxygen);
    } else if (sortBy === 'respRate') {
      valueA = parseInt(a.respRate);
      valueB = parseInt(b.respRate);
    } else if (sortBy === 'steps') {
      valueA = parseInt(a.steps.replace('.', ''));
      valueB = parseInt(b.steps.replace('.', ''));
    }
    
    // Aplicar ordenamiento según la dirección seleccionada
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
  
  // Función para manejar el clic en el encabezado de una columna
  const handleSortClick = (column) => {
    if (sortBy === column) {
      // Si es la misma columna, cambiar la dirección del ordenamiento
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es una columna diferente, establecerla como nueva columna de ordenamiento
      setSortBy(column);
      setSortOrder('desc'); // Por defecto, ordenar descendente
    }
  };
  
  // Función para renderizar la flecha de dirección de ordenamiento
  const renderSortArrow = (column) => {
    if (sortBy !== column) return null;
    
    return (
      <span className="ml-1">
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    );
  };
  
  // Calcular promedios
  const calculateAverages = () => {
    const sum = filteredData.reduce((acc, item) => {
      return {
        heartRate: acc.heartRate + parseInt(item.heartRate),
        bodyTemp: acc.bodyTemp + parseFloat(item.bodyTemp.replace(',', '.')),
        bloodOxygen: acc.bloodOxygen + parseInt(item.bloodOxygen),
        respRate: acc.respRate + parseInt(item.respRate),
        steps: acc.steps + parseInt(item.steps.replace('.', ''))
      };
    }, { heartRate: 0, bodyTemp: 0, bloodOxygen: 0, respRate: 0, steps: 0 });
    
    const count = filteredData.length;
    
    return {
      heartRate: Math.round(sum.heartRate / count),
      bodyTemp: (sum.bodyTemp / count).toFixed(1).replace('.', ','),
      bloodOxygen: Math.round(sum.bloodOxygen / count),
      respRate: Math.round(sum.respRate / count),
      steps: Math.round(sum.steps / count).toLocaleString('es-ES')
    };
  };
  
  const averages = calculateAverages();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Controles de filtro y exportación */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <label className="text-sm font-medium text-gray-700 mr-2">Mostrar últimos:</label>
          <select 
            className="border rounded py-2 px-3 bg-white"
            value={daysFilter}
            onChange={(e) => setDaysFilter(e.target.value)}
          >
            <option value="5">5 días</option>
            <option value="7">7 días</option>
            <option value="14">14 días</option>
            <option value="30">30 días</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-sm">
            Exportar CSV
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-sm">
            Imprimir
          </button>
        </div>
      </div>
      
      {/* Tabla de historial */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('date')}
                >
                  Fecha {renderSortArrow('date')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('heartRate')}
                >
                  Corazón {renderSortArrow('heartRate')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('bodyTemp')}
                >
                  Temp {renderSortArrow('bodyTemp')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('bloodOxygen')}
                >
                  O2 {renderSortArrow('bloodOxygen')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('respRate')}
                >
                  Resp {renderSortArrow('respRate')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortClick('steps')}
                >
                  Pasos {renderSortArrow('steps')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="px-4 py-3 font-medium">{item.date}</td>
                  <td className="px-4 py-3">{item.heartRate}</td>
                  <td className="px-4 py-3">{item.bodyTemp}</td>
                  <td className="px-4 py-3">{item.bloodOxygen}</td>
                  <td className="px-4 py-3">{item.respRate}</td>
                  <td className="px-4 py-3">{item.steps}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Estadísticas y promedios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-medium mb-4">Promedio ({daysFilter} días)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded hover:bg-blue-50 transition-colors">
              <div className="text-sm text-gray-500">Ritmo Cardíaco</div>
              <div className="text-xl font-bold">{averages.heartRate} lpm</div>
            </div>
            <div className="bg-gray-50 p-3 rounded hover:bg-blue-50 transition-colors">
              <div className="text-sm text-gray-500">Temperatura Corporal</div>
              <div className="text-xl font-bold">{averages.bodyTemp} °C</div>
            </div>
            <div className="bg-gray-50 p-3 rounded hover:bg-blue-50 transition-colors">
              <div className="text-sm text-gray-500">Oxígeno en Sangre</div>
              <div className="text-xl font-bold">{averages.bloodOxygen}%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded hover:bg-blue-50 transition-colors">
              <div className="text-sm text-gray-500">Frecuencia Respiratoria</div>
              <div className="text-xl font-bold">{averages.respRate} rpm</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-medium mb-4">Pasos</h3>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Promedio diario</div>
            <div className="text-2xl font-bold">{averages.steps} pasos</div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progreso
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.min(100, Math.round((parseInt(averages.steps.replace('.', '')) / 10000) * 100))}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div 
                style={{ width: `${Math.min(100, (parseInt(averages.steps.replace('.', '')) / 10000) * 100)}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {parseInt(averages.steps.replace('.', '')) >= 10000 
                ? '¡Felicidades! Has alcanzado tu meta de pasos diarios.'
                : `Te faltan ${(10000 - parseInt(averages.steps.replace('.', ''))).toLocaleString('es-ES')} pasos para alcanzar tu meta diaria.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
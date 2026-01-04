import React from 'react';
import { FiDroplet, FiDollarSign, FiTruck, FiMapPin } from 'react-icons/fi';

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null;
  }

  const { car, fuelNeeded, fuelPrice, totalCost, calculation } = result;

  return (
    <div className="card p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Resultado do Cálculo
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-600">
          <div className="flex justify-center mb-3">
            <FiDroplet size={24} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {fuelNeeded} L
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Combustível Necessário
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-600">
          <div className="flex justify-center mb-3">
            <FiMapPin size={24} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {calculation.distance} km
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Distância Total
          </div>
        </div>

        {fuelPrice && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-600">
            <div className="flex justify-center mb-3">
              <FiDollarSign size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              R$ {fuelPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Preço por Litro
            </div>
          </div>
        )}

        {totalCost && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-600">
            <div className="flex justify-center mb-3">
              <FiDollarSign size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              R$ {totalCost.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Custo Total
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <FiTruck size={20} />
          Informações do Veículo
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Marca:</strong> {car.brand_name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Modelo:</strong> {car.model}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Ano:</strong> {car.year}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Consumo:</strong> {car.fuel_consumption} km/l
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Combustível:</strong>{' '}
            {car.fuel_type === 'flex' ? 'Flex' : 
             car.fuel_type === 'gasoline' ? 'Gasolina' :
             car.fuel_type === 'ethanol' ? 'Etanol' : 'Diesel'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
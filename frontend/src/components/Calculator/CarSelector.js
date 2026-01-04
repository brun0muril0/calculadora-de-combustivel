import React, { useState, useEffect } from 'react';
import { FiTruck, FiDroplet, FiCalendar } from 'react-icons/fi';
import api from '../../services/api';

const CarSelector = ({ selectedBrand, selectedCar, onCarSelect }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBrand) {
      const fetchCars = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/brands/${selectedBrand.id}/cars`);
          setCars(response.data);
        } catch (error) {
          console.error('Erro ao carregar carros:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCars();
    }
  }, [selectedBrand]);

  if (!selectedBrand) {
    return null;
  }

  if (loading) {
    return (
      <div className="card p-6 mb-6 animate-slide-up">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Carregando modelos...
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 mb-6 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Selecione o Modelo - {selectedBrand.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(car => (
          <div
            key={car.id}
            className={`
              bg-gray-50 dark:bg-gray-700 border-2 rounded-xl p-5 cursor-pointer transition-all duration-200
              hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg
              ${selectedCar?.id === car.id 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-200 dark:border-gray-600'
              }
            `}
            onClick={() => onCarSelect(car)}
          >
            <div className="flex items-center gap-2 mb-3">
              <FiTruck className="text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {car.model}
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiCalendar size={14} />
                <span>Ano: {car.year}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiDroplet size={14} />
                <span>
                  Combustível: {car.fuel_type === 'flex' ? 'Flex' : 
                              car.fuel_type === 'gasoline' ? 'Gasolina' :
                              car.fuel_type === 'ethanol' ? 'Etanol' : 'Diesel'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {car.fuel_consumption} km/l
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSelector;
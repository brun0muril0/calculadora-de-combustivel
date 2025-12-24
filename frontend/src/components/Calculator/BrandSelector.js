import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

const BrandSelector = ({ selectedBrand, onBrandSelect }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get('/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Erro ao carregar marcas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="card p-6 mb-6 animate-fade-in">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Carregando marcas...
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Selecione a Marca do Veículo
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map(brand => (
          <div
            key={brand.id}
            className={`
              bg-gray-50 dark:bg-gray-700 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 
              flex items-center justify-between hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg
              ${selectedBrand?.id === brand.id 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-200 dark:border-gray-600'
              }
            `}
            onClick={() => onBrandSelect(brand)}
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {brand.name}
            </span>
            <FiChevronRight className="text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSelector;
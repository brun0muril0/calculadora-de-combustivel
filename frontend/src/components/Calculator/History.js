import React, { useState, useEffect } from 'react';
import { FiClock, FiTruck, FiMapPin, FiDroplet, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/calculator/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <FiClock />
          Histórico de Cálculos
        </h2>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Carregando histórico...
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <FiClock />
          Histórico de Cálculos
        </h2>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8 italic">
          Nenhum cálculo realizado ainda. Faça seu primeiro cálculo acima!
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 mt-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <FiClock />
        Histórico de Cálculos
      </h2>
      
      <div className="space-y-4">
        {history.map(item => (
          <div
            key={item.id}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                <FiTruck />
                {item.brand_name} {item.model} ({item.year})
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(item.created_at)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiMapPin size={14} />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {item.distance} km
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiDroplet size={14} />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {item.fuel_needed} L
                </span>
              </div>
              
              {item.fuel_price && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiDollarSign size={14} />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    R$ {item.fuel_price}/L
                  </span>
                </div>
              )}
              
              {item.total_cost && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiDollarSign size={14} />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    R$ {item.total_cost} total
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
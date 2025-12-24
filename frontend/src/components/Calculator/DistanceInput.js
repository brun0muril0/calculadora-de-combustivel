import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiEdit3 } from 'react-icons/fi';
import api from '../../services/api';

const DistanceInput = ({ distance, onDistanceChange }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [manualDistance, setManualDistance] = useState(distance || '');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState(null);

  const handleManualSubmit = () => {
    const dist = parseFloat(manualDistance);
    if (dist > 0) {
      onDistanceChange(dist);
      setError('');
    } else {
      setError('Por favor, insira uma distância válida');
    }
  };

  const handleMapCalculation = async () => {
    if (!origin || !destination) {
      setError('Por favor, preencha origem e destino');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/calculator/distance', {
        origin,
        destination
      });

      setCalculatedDistance(response.data);
      onDistanceChange(response.data.distance);
    } catch (error) {
      console.error('Erro ao calcular distância:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Erro ao calcular distância. Verifique os endereços informados.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-6 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Distância do Trajeto
      </h2>
      
      <div className="flex gap-2 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'manual'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white'
          }`}
          onClick={() => setActiveTab('manual')}
        >
          <FiEdit3 size={16} />
          Manual
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'map'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white'
          }`}
          onClick={() => setActiveTab('map')}
        >
          <FiMapPin size={16} />
          Calcular Rota
        </button>
      </div>

      {activeTab === 'manual' && (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Digite a distância em km"
            value={manualDistance}
            onChange={(e) => setManualDistance(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
            className="input-field"
          />
          <button
            onClick={handleManualSubmit}
            className="btn-primary w-full"
          >
            Confirmar Distância
          </button>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Endereço de origem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Endereço de destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input-field"
          />
          <button
            onClick={handleMapCalculation}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiNavigation size={16} />
            {loading ? 'Calculando...' : 'Calcular Distância'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {calculatedDistance && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          <div><strong>Distância calculada:</strong> {calculatedDistance.distance} km</div>
          <div><strong>Tempo estimado:</strong> {calculatedDistance.duration}</div>
        </div>
      )}
    </div>
  );
};

export default DistanceInput;
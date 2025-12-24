import React, { useState } from 'react';
import { FiCalculator } from 'react-icons/fi';
import BrandSelector from '../components/Calculator/BrandSelector';
import CarSelector from '../components/Calculator/CarSelector';
import DistanceInput from '../components/Calculator/DistanceInput';
import ResultDisplay from '../components/Calculator/ResultDisplay';
import History from '../components/Calculator/History';
import api from '../services/api';

const Calculator = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [distance, setDistance] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedCar(null);
    setResult(null);
    setError('');
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setResult(null);
    setError('');
  };

  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
    setResult(null);
    setError('');
  };

  const handleCalculate = async () => {
    if (!selectedCar || !distance) {
      setError('Por favor, selecione um veículo e informe a distância');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/calculator/calculate', {
        carId: selectedCar.id,
        distance: distance,
        origin: 'Manual',
        destination: 'Manual'
      });

      setResult(response.data);
    } catch (error) {
      console.error('Erro no cálculo:', error);
      setError('Erro ao realizar o cálculo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const canCalculate = selectedCar && distance && !loading;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8 flex items-center justify-center gap-3">
        <FiCalculator />
        Calculadora de Combustível
      </h1>

      <BrandSelector
        selectedBrand={selectedBrand}
        onBrandSelect={handleBrandSelect}
      />

      {selectedBrand && (
        <CarSelector
          selectedBrand={selectedBrand}
          selectedCar={selectedCar}
          onCarSelect={handleCarSelect}
        />
      )}

      {selectedCar && (
        <DistanceInput
          distance={distance}
          onDistanceChange={handleDistanceChange}
        />
      )}

      {canCalculate && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="btn-primary text-lg px-8 py-3 min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 transition-transform duration-200"
          >
            <FiCalculator size={20} />
            {loading ? 'Calculando...' : 'Calcular Consumo'}
          </button>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      {result && <ResultDisplay result={result} />}

      <History />
    </div>
  );
};

export default Calculator;
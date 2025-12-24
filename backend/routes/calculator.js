const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const axios = require('axios');

// Calcular consumo de combustível
router.post('/calculate', async (req, res) => {
  try {
    const { carId, distance, origin, destination } = req.body;

    // Buscar dados do carro
    const carResult = await pool.query(
      'SELECT c.*, b.name as brand_name FROM cars c JOIN brands b ON c.brand_id = b.id WHERE c.id = $1',
      [carId]
    );

    if (carResult.rows.length === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    const car = carResult.rows[0];
    const fuelNeeded = distance / car.fuel_consumption;

    // Tentar obter preço do combustível (simulado)
    let fuelPrice = null;
    let totalCost = null;

    try {
      // Aqui você pode integrar com uma API real de preços de combustível
      // Por enquanto, vamos usar valores médios simulados
      const avgPrices = {
        gasoline: 5.50,
        ethanol: 3.80,
        diesel: 6.20,
        flex: 5.50 // Assumindo gasolina para flex
      };
      
      fuelPrice = avgPrices[car.fuel_type] || 5.50;
      totalCost = fuelNeeded * fuelPrice;
    } catch (error) {
      console.log('Erro ao obter preço do combustível:', error.message);
    }

    // Salvar cálculo
    const calculationResult = await pool.query(
      'INSERT INTO calculations (car_id, distance, fuel_needed, fuel_price, total_cost, origin, destination) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [carId, distance, fuelNeeded, fuelPrice, totalCost, origin, destination]
    );

    res.json({
      calculation: calculationResult.rows[0],
      car: car,
      fuelNeeded: parseFloat(fuelNeeded.toFixed(2)),
      fuelPrice: fuelPrice,
      totalCost: totalCost ? parseFloat(totalCost.toFixed(2)) : null
    });

  } catch (error) {
    console.error('Erro no cálculo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Calcular distância usando Google Maps API
router.post('/distance', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    if (!process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY === 'your_google_maps_api_key_here') {
      return res.status(400).json({ 
        error: 'API Key do Google Maps não configurada',
        message: 'Configure a GOOGLE_MAPS_API_KEY no arquivo .env'
      });
    }

    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: origin,
        destinations: destination,
        units: 'metric',
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
      const distance = response.data.rows[0].elements[0].distance.value / 1000; // Converter para km
      const duration = response.data.rows[0].elements[0].duration.text;
      
      res.json({
        distance: parseFloat(distance.toFixed(2)),
        duration: duration,
        origin: origin,
        destination: destination
      });
    } else {
      res.status(400).json({ error: 'Não foi possível calcular a distância' });
    }

  } catch (error) {
    console.error('Erro ao calcular distância:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Histórico de cálculos
router.get('/history', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, car.model, car.year, b.name as brand_name 
      FROM calculations c 
      JOIN cars car ON c.car_id = car.id 
      JOIN brands b ON car.brand_id = b.id 
      ORDER BY c.created_at DESC 
      LIMIT 20
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Listar todas as marcas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM brands ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar carros por marca
router.get('/:brandId/cars', async (req, res) => {
  try {
    const { brandId } = req.params;
    const result = await pool.query(
      'SELECT * FROM cars WHERE brand_id = $1 ORDER BY model',
      [brandId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
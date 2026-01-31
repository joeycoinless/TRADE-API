require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for trades
let trades = [];
let nextId = 1;

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TRADE API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'GET /api/trades': 'Get all trades',
      'GET /api/trades/:id': 'Get a specific trade',
      'POST /api/trades': 'Create a new trade',
      'DELETE /api/trades/:id': 'Delete a trade'
    }
  });
});

// GET all trades
app.get('/api/trades', (req, res) => {
  res.json({
    success: true,
    count: trades.length,
    data: trades
  });
});

// GET a specific trade
app.get('/api/trades/:id', (req, res) => {
  const trade = trades.find(t => t.id === parseInt(req.params.id));
  
  if (!trade) {
    return res.status(404).json({
      success: false,
      error: 'Trade not found'
    });
  }
  
  res.json({
    success: true,
    data: trade
  });
});

// POST a new trade
app.post('/api/trades', (req, res) => {
  const { symbol, type, quantity, price } = req.body;
  
  // Validation
  if (!symbol || !type || !quantity || !price) {
    return res.status(400).json({
      success: false,
      error: 'Please provide symbol, type, quantity, and price'
    });
  }
  
  if (!['buy', 'sell'].includes(type.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'Type must be either "buy" or "sell"'
    });
  }
  
  const parsedQuantity = parseFloat(quantity);
  const parsedPrice = parseFloat(price);
  
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Quantity must be a positive number'
    });
  }
  
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Price must be a positive number'
    });
  }
  
  const trade = {
    id: nextId++,
    symbol: symbol.toUpperCase(),
    type: type.toLowerCase(),
    quantity: parsedQuantity,
    price: parsedPrice,
    timestamp: new Date().toISOString()
  };
  
  trades.push(trade);
  
  res.status(201).json({
    success: true,
    data: trade
  });
});

// DELETE a trade
app.delete('/api/trades/:id', (req, res) => {
  const tradeIndex = trades.findIndex(t => t.id === parseInt(req.params.id));
  
  if (tradeIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Trade not found'
    });
  }
  
  const deletedTrade = trades.splice(tradeIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedTrade,
    message: 'Trade deleted successfully'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TRADE API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

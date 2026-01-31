# TRADE-API

A simple RESTful API for managing trading operations. Built with Node.js and Express.

## Features

- Create, read, and delete trades
- In-memory data storage
- RESTful API design
- CORS enabled
- JSON responses

## Prerequisites

- Node.js 20.x or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/joeycoinless/TRADE-API.git
cd TRADE-API
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

## Usage

Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to TRADE API",
  "version": "1.0.0",
  "endpoints": {
    "GET /": "API information",
    "GET /api/trades": "Get all trades",
    "GET /api/trades/:id": "Get a specific trade",
    "POST /api/trades": "Create a new trade",
    "DELETE /api/trades/:id": "Delete a trade"
  }
}
```

### GET /api/trades
Get all trades.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "symbol": "AAPL",
      "type": "buy",
      "quantity": 10,
      "price": 150.5,
      "timestamp": "2026-01-31T20:00:00.000Z"
    }
  ]
}
```

### GET /api/trades/:id
Get a specific trade by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "symbol": "AAPL",
    "type": "buy",
    "quantity": 10,
    "price": 150.5,
    "timestamp": "2026-01-31T20:00:00.000Z"
  }
}
```

### POST /api/trades
Create a new trade.

**Request Body:**
```json
{
  "symbol": "AAPL",
  "type": "buy",
  "quantity": 10,
  "price": 150.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "symbol": "AAPL",
    "type": "buy",
    "quantity": 10,
    "price": 150.5,
    "timestamp": "2026-01-31T20:00:00.000Z"
  }
}
```

### DELETE /api/trades/:id
Delete a trade by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "symbol": "AAPL",
    "type": "buy",
    "quantity": 10,
    "price": 150.5,
    "timestamp": "2026-01-31T20:00:00.000Z"
  },
  "message": "Trade deleted successfully"
}
```

## Trade Object Structure

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier (auto-generated) |
| symbol | string | Stock/asset symbol (e.g., "AAPL") |
| type | string | Trade type: "buy" or "sell" |
| quantity | number | Number of units traded |
| price | number | Price per unit |
| timestamp | string | ISO 8601 timestamp (auto-generated) |

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| NODE_ENV | development | Environment mode |

## Deployment

This API is configured for deployment to Azure Web Apps. See `.github/workflows/azure-webapps-node.yml` for CI/CD configuration.

## License

ISC
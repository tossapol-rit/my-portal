require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || ${{ values.port }};

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: '${{ values.name }}',
    version: '1.0.0'
  });
});

// API Routes
app.get('/api/v1/hello', (req, res) => {
  res.json({
    message: 'Hello from ${{ values.name }}!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/info', (req, res) => {
  res.json({
    service: '${{ values.name }}',
    description: '${{ values.description }}',
    version: '1.0.0',
    nodeVersion: process.version,
    database: '${{ values.databaseType }}',
    uptime: process.uptime()
  });
});

{% if values.databaseType == "postgres" %}
// PostgreSQL connection example
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '${{ values.databaseName }}',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

app.get('/api/v1/db-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'connected',
      database: 'postgresql',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
{% elif values.databaseType == "mysql" %}
// MySQL connection example
const mysql = require('mysql2/promise');
let connection;

async function connectDB() {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || '${{ values.databaseName }}',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root'
  });
}

connectDB().catch(console.error);

app.get('/api/v1/db-status', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT NOW() as now');
    res.json({ 
      status: 'connected',
      database: 'mysql',
      timestamp: rows[0].now
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
{% elif values.databaseType == "mongodb" %}
// MongoDB connection example
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/${{ values.databaseName }}', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/v1/db-status', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ 
    status: statusMap[dbStatus],
    database: 'mongodb'
  });
});
{% elif values.databaseType == "redis" %}
// Redis connection example
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();

app.get('/api/v1/db-status', async (req, res) => {
  try {
    await client.ping();
    res.json({ 
      status: 'connected',
      database: 'redis'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
{% endif %}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ${{ values.name }} is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/v1/info`);
});

module.exports = app;

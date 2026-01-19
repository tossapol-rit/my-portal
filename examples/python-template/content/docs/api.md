# API Documentation

## Overview

${{ values.name }} provides a RESTful API built with FastAPI.

## Base URL

```
http://localhost:${{ values.port }}
```

## Endpoints

### GET /

Root endpoint that returns service information.

**Response:**
```json
{
  "status": "ok",
  "service": "${{ values.name }}",
  "version": "1.0.0"
}
```

### GET /health

Health check endpoint to verify service is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "${{ values.name }}",
  "version": "1.0.0"
}
```

{% if values.databaseType != 'none' -%}
### GET /api/v1/db-status

Database connection status endpoint.

**Response:**
```json
{
  "status": "ok",
  "database": "${{ values.databaseType }}",
  "connected": true
}
```

**Error Response:**
```json
{
  "status": "error",
  "database": "${{ values.databaseType }}",
  "connected": false
}
```
{% endif -%}

## Interactive Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:${{ values.port }}/docs
- **ReDoc**: http://localhost:${{ values.port }}/redoc

## Authentication

Currently, the API does not require authentication. Add authentication middleware in `main.py` if needed.

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

No rate limiting is currently implemented. Consider adding rate limiting for production use.

## CORS

CORS is enabled for all origins by default. Modify the CORS configuration in `main.py` for production use.

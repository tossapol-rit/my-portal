# API Documentation

Complete API reference for ${{ values.name }}.

## Base URL

- **Development**: `http://localhost:${{ values.port }}`
- **Production**: `https://api.example.com`

## Authentication

Currently, this API does not require authentication. In production, consider implementing:

- API Keys
- JWT tokens
- OAuth 2.0

## Endpoints

### Health Check

Check if the service is running.

**Endpoint**: `GET /health`

**Response**:

```json
{
  "status": "UP",
  "timestamp": "2026-01-19T10:00:00.000Z",
  "service": "${{ values.name }}",
  "version": "1.0.0"
}
```

### Hello Endpoint

Simple greeting endpoint.

**Endpoint**: `GET /api/v1/hello`

**Response**:

```json
{
  "message": "Hello from ${{ values.name }}!",
  "timestamp": "2026-01-19T10:00:00.000Z"
}
```

### Service Information

Get detailed service information.

**Endpoint**: `GET /api/v1/info`

**Response**:

```json
{
  "service": "${{ values.name }}",
  "description": "${{ values.description }}",
  "version": "1.0.0",
  "nodeVersion": "v${{ values.nodeVersion }}.0.0",
  "database": "${{ values.databaseType }}",
  "uptime": 123.456
}
```

{% if values.databaseType != "none" %}
### Database Status

Check database connection status.

**Endpoint**: `GET /api/v1/db-status`

**Response (Success)**:

```json
{
  "status": "connected",
  "database": "${{ values.databaseType }}"
}
```

**Response (Error)**:

```json
{
  "status": "error",
  "message": "Connection refused"
}
```
{% endif %}

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting in production using:

- `express-rate-limit`
- API Gateway
- Nginx rate limiting

## OpenAPI Specification

Full OpenAPI 3.0 specification is available in `openapi.yaml`.

You can view it using:

- Swagger UI
- Redoc
- Backstage API documentation

## Examples

### Using cURL

```bash
# Health check
curl http://localhost:${{ values.port }}/health

# Get service info
curl http://localhost:${{ values.port }}/api/v1/info

# Hello endpoint
curl http://localhost:${{ values.port }}/api/v1/hello
```

### Using JavaScript

```javascript
// Fetch service info
const response = await fetch('http://localhost:${{ values.port }}/api/v1/info');
const data = await response.json();
console.log(data);
```

### Using Python

```python
import requests

# Health check
response = requests.get('http://localhost:${{ values.port }}/health')
print(response.json())
```

## Versioning

The API uses URL versioning (e.g., `/api/v1/`).

When making breaking changes:

1. Create a new version endpoint (e.g., `/api/v2/`)
2. Maintain backward compatibility for existing versions
3. Document migration path
4. Deprecate old versions gradually

## Support

For API support:

- Open an issue on GitHub
- Contact the development team
- Check the README for configuration help

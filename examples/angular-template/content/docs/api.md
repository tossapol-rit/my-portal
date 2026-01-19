# API Documentation

## Health Check

Check the health status of the application.

**Endpoint:** `/health`

**Method:** GET

**Response:**

```json
{
  "status": "healthy"
}
```

**Status Codes:**

- `200 OK` - Service is healthy

---

## Application Info

Get information about the application.

**Example Response:**

```json
{
  "name": "${{ values.name }}",
  "version": "1.0.0",
  "description": "${{ values.description }}"
}
```

---

## Database Connection

The application connects to a ${{ values.databaseType | title }} database.

**Configuration:**

{% if values.databaseType == 'postgres' %}
- **Type**: PostgreSQL
- **Port**: 5432
- **Database**: ${{ values.databaseName }}
{% elif values.databaseType == 'mysql' %}
- **Type**: MySQL
- **Port**: 3306
- **Database**: ${{ values.databaseName }}
{% elif values.databaseType == 'mongodb' %}
- **Type**: MongoDB
- **Port**: 27017
- **Database**: ${{ values.databaseName }}
{% elif values.databaseType == 'redis' %}
- **Type**: Redis
- **Port**: 6379
- **Database**: 0
{% endif %}

---

## Error Handling

The API returns standard HTTP status codes:

- `200 OK` - Request succeeded
- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format:**

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-19T00:00:00.000Z"
}
```

---

## Authentication

*To be implemented based on your requirements*

---

## Rate Limiting

*To be implemented based on your requirements*

# ${{ values.name }}

${{ values.description }}

## Overview

This is a Go service created using Backstage Software Template. It provides a simple REST API with health check endpoints.

## Features

- ✅ REST API endpoints
- ✅ Health check endpoint
- ✅ Docker support
- ✅ Structured logging
- ✅ JSON responses

## Getting Started

### Prerequisites

- Go ${{ values.goVersion }}+ installed
- Docker (optional)

### Running Locally

```bash
# Install dependencies
go mod tidy

# Run the service
go run main.go
```

The service will start on port ${{ values.port }}.

### Using Docker

```bash
# Build the image
docker build -t ${{ values.name }} .

# Run the container
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/v1/info` - Service information

### Example Requests

```bash
# Health check
curl http://localhost:${{ values.port }}/health

# Service info
curl http://localhost:${{ values.port }}/api/v1/info

# Welcome message
curl http://localhost:${{ values.port }}/
```

## Development

This service is managed by [Backstage](https://backstage.io/) and follows the platform's standards for:

- Service discovery
- Documentation
- Monitoring
- CI/CD pipelines

## Owner

**Owner:** ${{ values.owner }}
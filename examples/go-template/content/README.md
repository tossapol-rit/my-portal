# ${{ values.name }}

${{ values.description }}

## Overview

This is a Go service created using Backstage Software Template. It provides a simple REST API with health check endpoints.

## Features

- ✅ REST API endpoints
- ✅ Health check endpoint
- ✅ Docker support
- ✅ Database integration (${{ values.databaseType | title }})
- ✅ Docker Compose for local development
- ✅ Environment configuration
- ✅ Structured logging
- ✅ JSON responses

## Getting Started

### Prerequisites

- Go ${{ values.goVersion }}+ installed
- Docker and Docker Compose
- ${{ values.databaseType | title }} (if running without Docker)

### Running with Docker Compose (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f
```

### Running Locally

```bash
# Start database (using Docker Compose)
docker-compose up -d database

# Copy environment file
cp .env.example .env

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
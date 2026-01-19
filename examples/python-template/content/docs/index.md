# ${{ values.name }}

Welcome to ${{ values.name }}!

## Overview

${{ values.description }}

This service is built with:
- **Python ${{ values.pythonVersion }}**
- **FastAPI** - Modern, fast web framework for building APIs
{% if values.databaseType != 'none' -%}
- **${{ values.databaseType | capitalize }}** - Database
{% endif -%}
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline

## Quick Start

### Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py
```

The service will be available at `http://localhost:${{ values.port }}`

### Running with Docker

```bash
# Build and run
docker-compose up
```

## Architecture

The service follows a simple FastAPI application structure:

- `main.py` - Main application entry point with API routes
- `requirements.txt` - Python dependencies
- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker Compose configuration

## Features

### Health Check

The service provides a health check endpoint:

```bash
curl http://localhost:${{ values.port }}/health
```

{% if values.databaseType != 'none' -%}
### Database Integration

The service integrates with ${{ values.databaseType | capitalize }} database:

```bash
curl http://localhost:${{ values.port }}/api/v1/db-status
```
{% endif -%}

## API Documentation

Interactive API documentation is automatically generated and available at:
- Swagger UI: http://localhost:${{ values.port }}/docs
- ReDoc: http://localhost:${{ values.port }}/redoc

## Development

See [API Documentation](api.md) for detailed API information.

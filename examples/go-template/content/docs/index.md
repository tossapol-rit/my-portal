# ${{ values.name }}

## Overview
${{ values.description }}

This Go service provides a RESTful API with the following features:
- Health check endpoints
- JSON responses
- Docker containerization
- Production-ready configuration

## Getting Started

### Prerequisites
- Go ${{ values.goVersion }} or later
- Docker (for containerization)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/${{ values.owner }}/${{ values.name }}.git
cd ${{ values.name }}
```

2. Install dependencies:
```bash
go mod tidy
```

3. Run the service:
```bash
go run main.go
```

The service will start on port ${{ values.port }}.

### Using Docker

1. Build the Docker image:
```bash
docker build -t ${{ values.name }} .
```

2. Run the container:
```bash
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```

## API Endpoints

### Health Check
- **GET** `/health` - Returns service health status
- **GET** `/ready` - Returns service readiness status

Example response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-16T10:30:00Z"
}
```

## Configuration

The service can be configured using environment variables:
- `PORT` - Service port (default: ${{ values.port }})

## Development

### Running Tests
```bash
go test ./...
```

### Code Formatting
```bash
go fmt ./...
```

### Building
```bash
go build -o ${{ values.name }} main.go
```

## Deployment

This service is ready for deployment with:
- Docker containerization
- Health check endpoints
- Graceful shutdown handling

Refer to the Dockerfile for production deployment configuration.
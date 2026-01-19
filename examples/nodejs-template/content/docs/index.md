# Welcome to ${{ values.name }}

${{ values.description }}

## Quick Start

This service is built with Node.js ${{ values.nodeVersion }} and Express.js.

### Running Locally

```bash
npm install
npm run dev
```

The service will be available at `http://localhost:${{ values.port }}`

### Using Docker

```bash
docker-compose up -d
```

## Features

- ✅ RESTful API with Express.js
- ✅ Health check endpoint
- ✅ Database integration (${{ values.databaseType }})
- ✅ Docker support
- ✅ Automated CI/CD
- ✅ OpenAPI documentation

## Architecture

This is a Node.js microservice that provides:

- RESTful API endpoints
- Database connectivity
- Health monitoring
- Error handling
- Security best practices (Helmet, CORS)
- Compression and performance optimization

## Next Steps

1. Check the [API Documentation](api.md) for available endpoints
2. Review the configuration in `.env.example`
3. Explore the CI/CD pipeline in `.github/workflows/ci-cd.yml`
4. Read the full README.md in the repository

## Monitoring

### Health Check

Access the health endpoint to verify service status:

```
GET http://localhost:${{ values.port }}/health
```

### Service Info

Get detailed service information:

```
GET http://localhost:${{ values.port }}/api/v1/info
```

## Support

For questions or issues, please contact the team or open an issue on GitHub.

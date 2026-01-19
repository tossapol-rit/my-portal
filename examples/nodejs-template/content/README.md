# ${{ values.name }}

${{ values.description }}

## Overview

This is a Node.js service built with Express.js, featuring:

- ✅ RESTful API endpoints
- ✅ Health check monitoring
- ✅ Database integration (${{ values.databaseType }})
- ✅ Docker support
- ✅ CI/CD pipeline
- ✅ API documentation (OpenAPI 3.0)

## Technology Stack

- **Runtime**: Node.js ${{ values.nodeVersion }}
- **Framework**: Express.js
- **Database**: ${{ values.databaseType }}
- **Container**: Docker
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js ${{ values.nodeVersion }} or higher
- npm or yarn
{% if values.databaseType != "none" %}
- ${{ values.databaseType }} (or use Docker Compose)
{% endif %}

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## API Endpoints

### Health Check

```bash
GET http://localhost:${{ values.port }}/health
```

Returns the health status of the service.

### Hello Endpoint

```bash
GET http://localhost:${{ values.port }}/api/v1/hello
```

Returns a greeting message.

### Service Info

```bash
GET http://localhost:${{ values.port }}/api/v1/info
```

Returns information about the service.

{% if values.databaseType != "none" %}
### Database Status

```bash
GET http://localhost:${{ values.port }}/api/v1/db-status
```

Returns the database connection status.
{% endif %}

## Configuration

Environment variables can be configured in `.env` file:

```env
NODE_ENV=development
PORT=${{ values.port }}
{% if values.databaseType == "postgres" %}
DB_HOST=localhost
DB_PORT=5432
DB_NAME=${{ values.databaseName }}
DB_USER=postgres
DB_PASSWORD=postgres
{% elif values.databaseType == "mysql" %}
DB_HOST=localhost
DB_PORT=3306
DB_NAME=${{ values.databaseName }}
DB_USER=root
DB_PASSWORD=root
{% elif values.databaseType == "mongodb" %}
MONGODB_URI=mongodb://localhost:27017/${{ values.databaseName }}
{% elif values.databaseType == "redis" %}
REDIS_URL=redis://localhost:6379
{% endif %}
```

## Development

```bash
# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Start with nodemon
npm run dev
```

## Deployment

### Docker Build

```bash
docker build -t ${{ values.name }}:latest .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}:latest
```

### CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. **Test**: Runs linter and tests
2. **Build**: Creates production build
3. **Docker**: Builds and pushes Docker image
4. **Deploy**: Deploys to production (configure as needed)

## Project Structure

```
.
├── src/
│   └── index.js          # Main application file
├── docs/                 # Documentation
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # CI/CD pipeline
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Multi-container setup
├── package.json          # Dependencies
├── mkdocs.yml           # Documentation config
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linter
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub:
https://github.com/${{ values.owner }}/${{ values.name }}/issues

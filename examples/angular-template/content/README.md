# ${{ values.name }}

${{ values.description }}

## Overview

This is an Angular application created using Backstage Software Template. It provides a modern single-page application with responsive design and best practices.

## Features

- ✅ Angular ${{ values.angularVersion }}
- ✅ TypeScript with strict mode
- ✅ Standalone Components
- ✅ Responsive Design
- ✅ Docker support with Nginx
- ✅ Database integration (${{ values.databaseType | title }})
- ✅ Docker Compose for local development
- ✅ CI/CD Pipeline with GitHub Actions
- ✅ Environment configuration
- ✅ Health check endpoint

## Getting Started

### Prerequisites

- Node.js ${{ values.nodeVersion }}+ installed
- Docker and Docker Compose
- Angular CLI: `npm install -g @angular/cli`
- ${{ values.databaseType | title }} (if running without Docker)

### Running with Docker Compose (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
open http://localhost:${{ values.port }}
```

### Running Locally

```bash
# Start database (using Docker Compose)
docker-compose up -d database

# Install dependencies
npm install

# Start development server
npm start

# Access the application
open http://localhost:${{ values.port }}
```

## Development

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:${{ values.port }}/`. The application will automatically reload if you change any of the source files.

### Build

```bash
# Development build
npm run build

# Production build
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Run unit tests
npm test

# Run unit tests with coverage
npm run test:ci

# Run linter
npm run lint
```

## Project Structure

```
${{ values.name }}/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Root component
│   │   ├── app.component.html    # Root template
│   │   ├── app.component.scss    # Root styles
│   │   ├── app.config.ts         # Application configuration
│   │   └── app.routes.ts         # Application routes
│   ├── assets/                   # Static assets
│   ├── index.html               # Main HTML file
│   ├── main.ts                  # Application entry point
│   └── styles.scss              # Global styles
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # CI/CD pipeline
├── angular.json                 # Angular CLI configuration
├── package.json                 # NPM dependencies
├── tsconfig.json               # TypeScript configuration
├── Dockerfile                  # Docker image definition
├── docker-compose.yml          # Docker Compose configuration
├── nginx.conf                  # Nginx configuration
└── README.md                   # This file
```

## API Endpoints

### Health Check

```bash
curl http://localhost:${{ values.port }}/health
```

Response:
```json
{
  "status": "healthy"
}
```

## Docker

### Build Docker Image

```bash
docker build -t ${{ values.name }} .
```

### Run Docker Container

```bash
docker run -p ${{ values.port }}:80 ${{ values.name }}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=${{ values.port }}
{% if values.databaseType == 'postgres' %}
DATABASE_URL=postgres://postgres:postgres@localhost:5432/${{ values.databaseName }}?sslmode=disable
{% elif values.databaseType == 'mysql' %}
DATABASE_URL=mysql://mysql:mysql@localhost:3306/${{ values.databaseName }}
{% elif values.databaseType == 'mongodb' %}
DATABASE_URL=mongodb://mongo:mongo@localhost:27017/${{ values.databaseName }}
{% elif values.databaseType == 'redis' %}
DATABASE_URL=redis://:redis@localhost:6379/0
{% endif %}
```

## Database Setup

The application uses ${{ values.databaseType | title }} as the database.

### Using Docker Compose

```bash
docker-compose up -d database
```

### Manual Setup

{% if values.databaseType == 'postgres' %}
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb ${{ values.databaseName }}
```
{% elif values.databaseType == 'mysql' %}
```bash
# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Create database
mysql -u root -e "CREATE DATABASE ${{ values.databaseName }};"
```
{% elif values.databaseType == 'mongodb' %}
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Database will be created automatically
```
{% elif values.databaseType == 'redis' %}
```bash
# Install Redis
brew install redis

# Start Redis
brew services start redis
```
{% endif %}

## CI/CD

The project includes a GitHub Actions workflow that:

1. **Test**: Runs linting and unit tests
2. **Build**: Creates production build
3. **Docker**: Builds and pushes Docker image
4. **Deploy**: Deploys to production (configure as needed)

### Required GitHub Secrets

- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Links

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Docker Documentation](https://docs.docker.com)
- [Backstage Documentation](https://backstage.io/docs)

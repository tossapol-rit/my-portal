# ${{ values.name }}

${{ values.description }}

## Features

- FastAPI REST API framework
- Python ${{ values.pythonVersion }}
- Docker containerization
{% if values.databaseType != 'none' -%}
- ${{ values.databaseType | capitalize }} database integration
{% endif -%}
- GitHub Actions CI/CD pipeline
- Dependabot for dependency updates
- OpenAPI documentation
- Health check endpoints

## Getting Started

### Prerequisites

- Python ${{ values.pythonVersion }}+
- pip
{% if values.databaseType != 'none' -%}
- ${{ values.databaseType | capitalize }} database
{% endif -%}

### Installation

1. Clone the repository:
```bash
git clone ${{ values.repoUrl | replace('github.com', 'github.com/') }}
cd ${{ values.name }}
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

{% if values.databaseType != 'none' -%}
4. Configure database connection in `.env`

{% endif -%}
### Running Locally

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port ${{ values.port }}
```

The service will be available at `http://localhost:${{ values.port }}`

### Running with Docker

Build and run the container:
```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```

Or use Docker Compose:
```bash
docker-compose up
```

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:${{ values.port }}/docs`
- ReDoc: `http://localhost:${{ values.port }}/redoc`

## Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
{% if values.databaseType != 'none' -%}
- `GET /api/v1/db-status` - Database status
{% endif -%}

## Development

### Running Tests

```bash
pytest
```

### Code Linting

```bash
flake8 .
```

{% if values.databaseType != 'none' -%}
## Database Configuration

The service uses ${{ values.databaseType | capitalize }} as its database.

{% if values.databaseType == 'postgres' -%}
### PostgreSQL Configuration

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=${{ values.databaseName }}
DB_USER=postgres
DB_PASSWORD=postgres
```
{% elif values.databaseType == 'mysql' -%}
### MySQL Configuration

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=${{ values.databaseName }}
DB_USER=root
DB_PASSWORD=root
```
{% elif values.databaseType == 'mongodb' -%}
### MongoDB Configuration

```env
DB_HOST=localhost
DB_PORT=27017
DB_NAME=${{ values.databaseName }}
DB_USER=root
DB_PASSWORD=root
```
{% elif values.databaseType == 'redis' -%}
### Redis Configuration

```env
DB_HOST=localhost
DB_PORT=6379
DB_PASSWORD=redis
```
{% endif -%}
{% endif -%}

## License

MIT

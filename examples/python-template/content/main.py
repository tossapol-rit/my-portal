from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
{% if values.databaseType == 'postgres' -%}
import psycopg2
from psycopg2.extras import RealDictCursor
{% elif values.databaseType == 'mysql' -%}
import pymysql
{% elif values.databaseType == 'mongodb' -%}
from pymongo import MongoClient
{% elif values.databaseType == 'redis' -%}
import redis
{% endif -%}

load_dotenv()

app = FastAPI(
    title="{{ values.name }}",
    description="{{ values.description }}",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
{% if values.databaseType == 'postgres' -%}
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        database=os.getenv("DB_NAME", "{{ values.databaseName }}"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres")
    )
{% elif values.databaseType == 'mysql' -%}
def get_db_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        database=os.getenv("DB_NAME", "{{ values.databaseName }}"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "root")
    )
{% elif values.databaseType == 'mongodb' -%}
mongo_client = MongoClient(
    f"mongodb://{os.getenv('DB_USER', 'root')}:{os.getenv('DB_PASSWORD', 'root')}@"
    f"{os.getenv('DB_HOST', 'localhost')}:{os.getenv('DB_PORT', '27017')}"
)
db = mongo_client[os.getenv("DB_NAME", "{{ values.databaseName }}")]
{% elif values.databaseType == 'redis' -%}
redis_client = redis.Redis(
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", "6379")),
    password=os.getenv("DB_PASSWORD", ""),
    decode_responses=True
)
{% endif -%}

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str

class DBStatusResponse(BaseModel):
    status: str
    database: str
    connected: bool

@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint"""
    return {
        "status": "ok",
        "service": "{{ values.name }}",
        "version": "1.0.0"
    }

@app.get("/health", response_model=HealthResponse)
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "{{ values.name }}",
        "version": "1.0.0"
    }

{% if values.databaseType != 'none' -%}
@app.get("/api/v1/db-status", response_model=DBStatusResponse)
async def db_status():
    """Database status endpoint"""
    try:
        {% if values.databaseType == 'postgres' -%}
        conn = get_db_connection()
        conn.close()
        connected = True
        {% elif values.databaseType == 'mysql' -%}
        conn = get_db_connection()
        conn.close()
        connected = True
        {% elif values.databaseType == 'mongodb' -%}
        mongo_client.admin.command('ping')
        connected = True
        {% elif values.databaseType == 'redis' -%}
        redis_client.ping()
        connected = True
        {% endif -%}
        return {
            "status": "ok",
            "database": "{{ values.databaseType }}",
            "connected": connected
        }
    except Exception as e:
        return {
            "status": "error",
            "database": "{{ values.databaseType }}",
            "connected": False
        }
{% endif -%}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port={{ values.port }})

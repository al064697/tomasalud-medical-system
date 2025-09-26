"""
config.py
--------------------
Lee las variables de entorno desde el archivo '.env'
para configurar la aplicación y la base de datos. 
"""

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # SQLite configuration (for development)
    DATABASE_URL: str = "sqlite:///./tratamientos.db"
    
    # MySQL configuration (commented for development)
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "TRATAMIENTOS"
    
    # JWT configuration
    SECRET_KEY: str = "default_secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

# Instancia global de configuración
settings = Settings()
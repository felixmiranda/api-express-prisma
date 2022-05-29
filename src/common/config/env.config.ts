import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development') {
  const envFound = dotenv.config()

  if (envFound.error) {
    throw new Error("Couldn't find .env file")
  }
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT ? process.env.PORT : '', 10),
  API: {
    prefix: '/api',
  },
  JWT: {
    ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME,
    REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME,
  },
}

export default env

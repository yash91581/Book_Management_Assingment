import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const NODE_ENV = process.env.NODE_ENV;

export const HOSTNAME_URL = process.env.HOSTNAME_URL;

export const DB_DATA = {
  DB_URL: process.env.DB_URL || "",
  DB_NAME: process.env.DB_NAME || "",
};

export const API_CONFIG = {
  BASE_ENDPOINT: process.env.BASE_ENDPOINT,
  API_VERSION: process.env.API_VERSION,
};

export const JWT_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
};

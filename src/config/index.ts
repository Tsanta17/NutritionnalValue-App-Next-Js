// src/config/index.ts

import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

export const config = {
  database: {
    name: process.env.DB_NAME || "nextapp",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  },
  jwtSecret: process.env.JWT_SECRET || "",
  apiKeys: {
    someApiKey: process.env.SOME_API_KEY || "",
  },
};

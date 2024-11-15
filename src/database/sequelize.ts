// src/database/sequelize.ts

import { Sequelize } from "sequelize";
import sequelizeConfig from "@/config/database";

// Sélectionner la configuration selon l'environnement
const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env as keyof typeof sequelizeConfig];

// Créer une instance de Sequelize avec la configuration sélectionnée
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as any,
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
    await sequelize.sync({ alter: true }); // Synchroniser les modèles avec la base de données
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

export default sequelize;

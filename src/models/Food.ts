// models/Food.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/database/sequelize";

// Interface des attributs du modèle Food
interface FoodAttributes {
  id: number;
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  vitamins: string[]; // Les vitamines en tableau de chaînes
  minerals: string[]; // Les minéraux en tableau de chaînes
}

// Interface pour les attributs optionnels lors de la création d'un aliment (sans id)
interface FoodCreationAttributes extends Optional<FoodAttributes, "id"> {}

// Définir le modèle Food en utilisant Sequelize avec les types TypeScript
class Food
  extends Model<FoodAttributes, FoodCreationAttributes>
  implements FoodAttributes
{
  public id!: number;
  public name!: string;
  public calories!: number;
  public carbohydrates!: number;
  public protein!: number;
  public fat!: number;
  public vitamins!: string[];
  public minerals!: string[];
}

// Initialisation du modèle Food
Food.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vitamins: {
      type: DataTypes.JSON, // Type JSON pour stocker un tableau de vitamines
      allowNull: true,
    },
    minerals: {
      type: DataTypes.JSON, // Type JSON pour stocker un tableau de minéraux
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "foods",
  }
);

export default Food;

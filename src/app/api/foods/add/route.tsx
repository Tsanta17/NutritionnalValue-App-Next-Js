import { NextApiRequest, NextApiResponse } from "next";
import Food from "@/models/Food";
import { connectDatabase } from "@/database/sequelize"; // Connexion à la base de données

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Établir la connexion à la base de données
  await connectDatabase();

  if (req.method === "POST") {
    try {
      const {
        name,
        calories,
        carbohydrates,
        protein,
        fat,
        vitamins,
        minerals,
      } = req.body;

      // Validation basique
      if (!name || !calories || !carbohydrates || !protein || !fat) {
        res.status(400).json({ error: "Champs obligatoires manquants." });
        return;
      }

      // Créer un nouvel aliment
      const newFood = await Food.create({
        name,
        calories,
        carbohydrates,
        protein,
        fat,
        vitamins,
        minerals,
      });

      res.status(201).json(newFood);
    } catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ error: "Erreur lors de l'ajout de l'aliment." });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

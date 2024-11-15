import { foods } from "@/data";

export async function GET() {
  return Response.json(foods);
}

export async function POST(request: Request) {
  try {
    const newFood = await request.json();

    // Valider les propriétés reçues
    if (
      !newFood.name ||
      !newFood.calories ||
      !newFood.protein ||
      !newFood.fat ||
      !newFood.carbohydrates ||
      !newFood.vitamins ||
      !newFood.minerals
    ) {
      return new Response("Tous les champs sont requis.", { status: 400 });
    }

    // Vérifier que vitamines et minéraux sont des tableaux
    if (!Array.isArray(newFood.vitamins) || !Array.isArray(newFood.minerals)) {
      return new Response(
        "Les vitamines et les minéraux doivent être des tableaux.",
        { status: 400 }
      );
    }

    // Ajouter l'aliment à la liste
    foods.push(newFood);

    return new Response(
      JSON.stringify({ message: "Aliment ajouté avec succès." }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Erreur serveur.", { status: 500 });
  }
}

/**import { NextApiRequest, NextApiResponse } from "next";
import Food from "@/models/Food";
import { connectDatabase } from "@/database/sequelize"; // Connexion à la base de données

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Établir la connexion à la base de données
  await connectDatabase();
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    console.error("Erreur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des aliments." });
  }
}**/

// Importation des données d'aliments (foods) depuis un fichier ou un module
import { foods } from "@/data";

export async function GET(
  request: Request,
  { params }: { params: { name: string } } // Les paramètres extraits de la requête, ici 'name'
) {
  console.log("ok");

  console.log(params.name);

  // Recherche de l'index de l'aliment dans le tableau 'foods' en utilisant le nom passé en paramètre.
  const index = foods.findIndex(
    (food) => food.name.toLocaleLowerCase().replace(/ /g, "-") === params.name // On remplace les espaces par des tirets pour correspondre au format des URL en regex
  );

  console.log(foods[index]);

  // Vérification si l'aliment a bien été trouvé dans le tableau
  if (index !== -1) {
    // - Le contenu de l'aliment trouvé, converti en JSON
    // - Un header qui précise que le type de contenu est du JSON
    return new Response(JSON.stringify(foods[index]), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    // - Un statut HTTP 404 (Not Found) pour indiquer que l'aliment n'existe pas
    return new Response("Food not found.", {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }
}

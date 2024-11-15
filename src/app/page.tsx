"use client"; // Indique que ce code est destiné à être exécuté côté client (dans le navigateur).

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { IFoodReduced, IFood } from "@/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Hook pour gérer la navigation via le routeur de Next.js.

export default function Home() {
  const [open, setOpen] = React.useState(false); // État pour contrôler si le Popover est ouvert ou fermé.
  const [value, setValue] = React.useState(""); // État pour stocker la valeur sélectionnée dans la recherche.

  // État pour stocker la liste des aliments, basée sur l'interface IFoodReduced.
  const [foods, setFoods] = useState<IFoodReduced[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // État pour indiquer si les données sont en cours de chargement.
  const [newFood, setNewFood] = useState<IFood>({
    name: "",
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    vitamins: [],
    minerals: [],
  }); // Etat pour les nouveaux aliments ajoutés
  const router = useRouter();

  // Fonction asynchrone pour récupérer les aliments depuis l'API.
  const fetchFoods = async () => {
    try {
      const response = await fetch("api/foods/all");
      const data = await response.json();

      // Transformation des données pour correspondre au format IFoodReduced
      const foodReduced: IFoodReduced[] = data.map((food: IFood) => ({
        value: food.name.toLowerCase().replace(/ /g, "-"), // Conversion du nom en minuscule et remplacement des espaces par des tirets pour les URLs.
        label: food.name,
      }));
      setFoods(foodReduced);
    } catch (error) {
      console.log(error);
    }
  };

  // Soumission du nouveau produit
  const addNewFood = async () => {
    try {
      const response = await fetch("/api/foods/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });
      if (response.ok) {
        alert("Aliment ajouté avec succès!");
        fetchFoods(); // rafraîchir la liste des aliments
      } else {
        alert("Erreur lors de l'ajout.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ce useEffect ne s'exécute qu'une seule fois, au chargement initial du composant.
  useEffect(() => {
    const initialize = async () => {
      await fetchFoods(); // Appel de la fonction pour récupérer les aliments.
      setIsLoading(false); // Mise à jour de l'état de chargement à false une fois les données récupérées.
    };
    initialize(); // Exécution de l'initialisation au montage du composant.
  }, []);

  // Hook useEffect pour surveiller les changements de la valeur 'value'.
  useEffect(() => {
    if (value.length > 0) {
      router.push(`/food/${value}`);
    }
    console.log(value.length);
  }, [value]);

  return (
    <>
      {/* Si les données sont chargées, on affiche le contenu principal. Sinon, un message de chargement. */}
      {!isLoading ? (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-extrabold mb-4">
            {" "}
            Bienvenue dans <span className="title_colored">NutriNext</span>
          </h1>
          <p className="text-lg mb-8 text-center max-w-2xl">
            Découvrer les valeurs nutritionnelles de vos aliments préférés.
            Utiliser la recherche ci-dessous pour commencer.
          </p>
          {/* Popover qui contient la recherche d'aliment */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {/* Bouton pour déclencher l'ouverture du Popover */}
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {/* Affichage du nom de l'aliment sélectionné ou message "Select food..." */}
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : "Select food..."}
                {/* Icône pour indiquer qu'un menu déroulant est disponible */}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            {/* Contenu du Popover, avec une liste des aliments disponibles */}
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search food..." />{" "}
                {/* Champ de recherche */}
                <CommandList>
                  <CommandEmpty>No food found.</CommandEmpty>{" "}
                  {/* Message si aucun aliment n'est trouvé */}
                  <CommandGroup>
                    {/* Liste des aliments filtrés ou non */}
                    {foods.map((food) => (
                      <CommandItem
                        key={food.value}
                        value={food.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue); // Mise à jour de la valeur sélectionnée.
                          setOpen(false); // Fermeture du Popover après la sélection.
                        }}
                      >
                        {/* Icône pour indiquer si l'aliment est sélectionné */}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === food.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {food.label} {/* Affichage du nom de l'aliment */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Dialog pour l'ajout d'un aliment */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                Ajouter un aliment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel aliment</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Input
                  placeholder="Nom de l'aliment"
                  value={newFood.name}
                  onChange={(e) =>
                    setNewFood({ ...newFood, name: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Calories"
                  value={newFood.calories}
                  onChange={(e) =>
                    setNewFood({ ...newFood, calories: Number(e.target.value) })
                  }
                />
                <Input
                  type="number"
                  placeholder="Glucides"
                  value={newFood.carbohydrates}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      carbohydrates: Number(e.target.value),
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Protéines"
                  value={newFood.protein}
                  onChange={(e) =>
                    setNewFood({ ...newFood, protein: Number(e.target.value) })
                  }
                />
                <Input
                  type="number"
                  placeholder="Lipides"
                  value={newFood.fat}
                  onChange={(e) =>
                    setNewFood({ ...newFood, fat: Number(e.target.value) })
                  }
                />
                <Input
                  placeholder="Vitamines (séparées par des virgules)"
                  value={newFood.vitamins.join(", ")}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      vitamins: e.target.value.split(","),
                    })
                  }
                />
                <Input
                  placeholder="Minéraux (séparées par des virgules)"
                  value={newFood.minerals.join(", ")}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      minerals: e.target.value.split(","),
                    })
                  }
                />
                <Button variant="primary" onClick={addNewFood}>
                  Ajouter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // Si les données ne sont pas encore chargées, affichage d'un message de chargement.
        <div className="flex justify-center items-center h-screen text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  );
}

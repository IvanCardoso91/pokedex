import axios from "axios";
import { PokemonCard } from "../context/types";

const BASE_URL = "https://api.pokemontcg.io/v2/cards";

export const fetchPokemonCards = async (): Promise<PokemonCard[]> => {
  const response = await axios.get(BASE_URL, {
    headers: { "X-Api-Key": "a8f90834-51b0-4775-b79d-6b8bd39c33fd" },
    params: {
        pageSize: 50,
      },
  });

  console.log("response", response.data.data)

  return response.data.data.map((card: any) => ({
    id: card.id,
    name: card.name,
    images: card.images,
    types: card.types,
    weaknesses: card.weaknesses,
    resistances: card.resistances,
    attacks: card.attacks,
  }));
};
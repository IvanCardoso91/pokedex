import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchPokemonCards } from "../api/pokemonapi";
import { PokemonCard } from "./types";

interface PokemonContextProps {
  pokemons: PokemonCard[];
  loading: boolean;
  error: string | null;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonCards();
        setPokemons(data);
      } catch (err) {
        setError("Erro ao carregar os dados do Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, loading, error }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextProps => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon deve ser usado dentro de um PokemonProvider.");
  }
  return context;
};
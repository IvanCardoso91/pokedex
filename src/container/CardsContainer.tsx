import React, { useState } from "react";
import { usePokemon } from "../context/PokemonContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { typeColors } from "./style"
import Header from "../components/Header";

const containerStyles = {
    grid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4",
  };

  const CardsContainer: React.FC = () => {
    const { pokemons, loading, error } = usePokemon();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const handleCardClick = (_id: string, name: string) => {
      navigate(`/${name.toLowerCase()}`); 
    };

    const handleSearch = (query: string) => {
      setSearchQuery(query.toLowerCase());
    };
  
    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    const filteredPokemons = pokemons
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery))
  
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className={containerStyles.grid}>
          {filteredPokemons.map((pokemon) => {
            const formattedTypes = (pokemon.types || []).map((type) =>
              type === "Colorless" ? "Normal" : type
            );
    
            return (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.images?.small}
                types={formattedTypes} 
                typeColors={typeColors}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
      </>
    );
  };
  
  export default CardsContainer;
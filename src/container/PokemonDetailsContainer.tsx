import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import DetailModal from "../components/DetailModal";
import Loading from "../components/Loading";
import { typeColors, detailStyles } from "./style";
import { useTranslation } from "react-i18next";


const PokemonDetails: React.FC = () => {
  const { t } = useTranslation();
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { pokemons } = usePokemon();
  const [selectedAttack, setSelectedAttack] = useState<null | {
    name: string;
    cost: string[];
    damage: string;
    description: string;
  }>(null);

  const pokemon = pokemons.find((p) => p.name.toLowerCase() === pokemonName);

  if (!pokemon) {
    return <Loading />;
  }

  const handleAttackClick = (attack: typeof selectedAttack) => {
    setSelectedAttack(attack);
  };

  return (
    <div className={detailStyles.container}>
    <div className={detailStyles.card}>
      <div className={detailStyles.imageContainer}>
        <img
          src={pokemon.images.large}
          alt={pokemon.name}
          className={detailStyles.image}
        />
        <div className={detailStyles.textContainer}>
          <h1 className={detailStyles.title}>{pokemon.name}</h1>
          <p className={detailStyles.idText}>ID: {pokemon.id}</p>
          <div className={detailStyles.typeBadgeContainer}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`${detailStyles.typeBadge} ${typeColors[type] || typeColors.default}`}
              >
                {type === "Colorless" ? "Normal" : type}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={detailStyles.sectionContainer}>
        <h2 className={detailStyles.sectionTitle}>{t("pokemon_details.resistances")}</h2>
        <ul>
          {pokemon.resistances?.map((res, index) => (
            <li key={index}>
              {res.type} - {res.value}
            </li>
          ))}
        </ul>
      </div>
      <div className={detailStyles.sectionContainer}>
        <h2 className={detailStyles.sectionTitle}>{t("pokemon_details.weaknesses")}</h2>
        <ul>
          {pokemon.weaknesses?.map((weak, index) => (
            <li key={index}>
              {weak.type} - {weak.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={detailStyles.sectionTitle}>{t("pokemon_details.attacks")}</h2>
        <ul>
          {pokemon.attacks?.map((attack, index) => (
            <li
              key={index}
              className={detailStyles.attackLink}
              onClick={() =>
                handleAttackClick({
                  name: attack.name,
                  cost: attack.cost || [],
                  damage: attack.damage,
                  description: attack.text,
                })
              }
            >
              {attack.name}
            </li>
          ))}
        </ul>
      </div>
    </div>

      <DetailModal
        isOpen={!!selectedAttack}
        onClose={() => setSelectedAttack(null)}
        attack={selectedAttack || { name: "", cost: [], damage: "", description: "" }}
      />
    </div>
  );
};

export default PokemonDetails;

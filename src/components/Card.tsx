import React from "react";

interface CardProps {
  id: string;
  name: string;
  image: string;
  types: string[];
  typeColors: Record<string, string>;
  onCardClick: (id: string, name: string) => void;
}

const cardStyles = {
  container: "flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer",
  image: "w-32 h-32 object-contain mb-4 md:w-64 md:h-64",
  name: "text-lg font-bold text-gray-800",
  id: "text-sm text-gray-500 mb-2",
  typesContainer: "flex space-x-2",
};

const Card: React.FC<CardProps> = ({ id, name, image, types, typeColors, onCardClick }) => {
  return (
    <div className={cardStyles.container} onClick={() => onCardClick(id, name)}>
      <img src={image} alt={name} className={cardStyles.image} />
      <h2 className={cardStyles.name}>{name}</h2>
      <p className={cardStyles.id}>ID: {id}</p>
      <div className={cardStyles.typesContainer}>
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 text-xs rounded-md ${typeColors[type] || typeColors.default}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
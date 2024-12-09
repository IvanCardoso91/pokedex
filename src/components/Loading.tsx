import React from "react";
import pokeballImage from "../assets/pokeball.png";

const loadingStyles = {
    div: "flex items-center justify-center h-screen bg-gray-100",
    img: "w-16 h-16 animate-spin"
}

const Loading: React.FC = () => {
  return (
    <div className={loadingStyles.div}>
      <img
        src={pokeballImage}
        alt="Loading"
        className={loadingStyles.img}
      />
    </div>
  );
};

export default Loading;
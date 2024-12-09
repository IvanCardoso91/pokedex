import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pokeballImage from "../assets/pokeball.png";
import { useTranslation } from "react-i18next"; 

const headerStyles = {
  header: "fixed top-0 left-0 w-full z-10 flex justify-center items-center p-4 bg-blue-900 shadow-md",
  pokeball: "block md:hidden cursor-pointer flex items-center justify-center",
  img: "w-10 h-10",
  pokedex:"hidden md:block text-3xl font-bold text-yellow-400 stroke-blue-600 cursor-pointer",
  searchContainer: "flex items-center bg-white rounded-lg px-2 py-1 mt-2 md:mt-0 md:ml-4",
  searchInput: "flex-1 border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400",
  searchIcon: "text-gray-500 cursor-pointer ml-2",
};

interface HeaderProps {
  onSearch?: (query: string) => void; 
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery); 
    }
  };

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.pokeball} onClick={handleNavigateHome}>
        <img src={pokeballImage} alt="Pokeball" className={headerStyles.img} />
      </div>

      <div onClick={handleNavigateHome}>
        <h1 className={headerStyles.pokedex}>{t("header.title")}</h1>
      </div>

      <form onSubmit={handleSearchSubmit} className={headerStyles.searchContainer} role="form">
        <input
          type="text"
          placeholder={t("header.search_placeholder")}
          value={searchQuery}
          onChange={handleSearchChange}
          className={headerStyles.searchInput}
        />
        <button type="submit" className={headerStyles.searchIcon}>
          🔍
        </button>
      </form>
    </header>
  );
};

export default Header;
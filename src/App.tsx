import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import Header from "./components/Header";
import CardsContainer from "./container/CardsContainer";
import PokemonDetails from "./container/PokemonDetailsContainer";

const App: React.FC = () => {
  return (
    <PokemonProvider>
    <Router>
      <div className="min-h-screen bg-gray-100 pt-16 md:pt-[4rem]">
        <Header /> 
        <Routes>
          <Route path="/" element={<CardsContainer />} />
          <Route path="/:pokemonName" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
    </PokemonProvider>
  );
};

export default App;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "pt", 
  fallbackLng: "pt",
  resources: {
    pt: {
      translation: {
        header: {
          title: "Pokédex",
          search_placeholder: "Pesquisar por nome...",
        },
        pokemon_details: {
          mana_cost: "Custo de mana",
          damage: "Dano",
          description: "Descrição"
        },
      },
    },
    en: {
        translation: {
          header: {
            title: "Pokédex",
            search_placeholder: "Search by name...",
          },
          pokemon_details: {
            mana_cost: "Mana Cost",
            damage: "Damage",
            description: "Description",
          },
        },
      },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
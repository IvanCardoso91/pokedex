export interface PokemonCard {
    id: string;
    name: string;
    images: {
      small: string;
      large: string;
    };
    types: string[];
    weaknesses?: {
      type: string;
      value: string;
    }[];
    resistances?: {
      type: string;
      value: string;
    }[];
    attacks?: {
      name: string;
      cost: string[];
      damage: string;
      text: string;
    }[];
  }
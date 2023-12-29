export type User = {
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  password?: string | null;
  image?: string | null;
  bio?: string | null;
  nationality: string | null;
  countryIDs: String[];
  reviews?: Review[];
  recipes?: Recipe[];
};

export type Country = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  population: number;
  lat: number;
  lng: number;
  imageUrl: string;
  flag?: string;
  area?: number;
  capital?: string;
  continent?: string;
  recipes: Recipe[];
  playlistUrl: string;
};

export type Recipe = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  category: Diet;
  title: string;
  description: string;
  instructions: string[];
  imageUrl: string;
  time?: string;
  servings?: number;
  from?: string;
  link?: string;
  ingredients: {
    id: string;
    name: string;
    value: number;
    unit: string;
    recipeId: string;
  }[];
  reviews: Review[];
  User?: User | null;
  userId?: string | null;
  Country?: Country | null;
  countryId?: string | null;
};

export type Review = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  summary: string;
  rating: number;
  User?: User | null;
  userId?: string | null;
  Recipe?: Recipe | null;
  recipeId?: string | null;
};

export enum Diet {
  MEAT = "Meat",
  FISH = "Fish",
  VEGETARIAN = "Vegetarian",
}

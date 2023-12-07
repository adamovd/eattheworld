export type User = {
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  hashedPassword?: string;
  imageUrl?: string;
  bio?: string;
  nationality: string;
  countries?: Country[];
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
  recipes: Recipe[];
  playlistUrl: string;
};

export type Recipe = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  instructions: string;
  imageUrl: string;
  ingredients: [{ name: string; value: number; unit: string }];
  reviews: Review[];
  User?: User | null;
  userId?: string | null;
  Country?: Country | null;
  countryId?: string | null;
};

export type Ingredient = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  value: number;
  unit: string;
  Recipe?: Recipe | null;
  recipeId?: string | null;
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

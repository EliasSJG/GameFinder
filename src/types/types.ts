export type Root = Game[];

export type Game = {
  id: number;
  age_ratings: number[];
  artworks: { id: number; url: string }[];
  category: number;
  cover: { id: number; url: string; image_id: string };
  created_at: number;
  external_games: number[];
  first_release_date: number;
  game_modes: number[];
  genres: number[];
  involved_companies: number[];
  keywords: number[];
  name: string;
  platforms: number[];
  release_dates: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  summary: string;
  tags: number[];
  themes: number[];
  updated_at: number;
  url: string;
  checksum: string;
  language_supports: number[];
  game_localizations: number[];
  game_type: number;
  rating: number;
  genreNames?: string[];
};

export type Character = {
  id: number;
  created_at: number;
  description: string;
  games: number[];
  gender: number;
  mug_shot: { image_id: string } | null;
  name: string;
  slug: string;
  species: number;
  updated_at: number;
  url: string;
  checksum: string;
  character_gender: number;
  character_species: number;
};

export type InvolvedCompany = {
  id: number;
  company: number;
};

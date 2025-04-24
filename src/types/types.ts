export type Root = GameSearchResult[];

export type GameSearchResult = {
  id: number;
  age_ratings: number[];
  artworks: { id: number; url: string }[];
  cover: { id: number; url: string; image_id: string };
  external_games: number[];
  game_modes: number[];
  genres: number[];
  involved_companies: InvolvedCompany[];
  keywords: number[];
  name: string;
  platforms: number[];
  release_dates: number[];
  screenshots: number[];
  summary: string;
  tags: number[];
  themes: number[];
  rating: number;
};

export type InvolvedCompany = {
  id: number;
  company: number;
};

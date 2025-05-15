export type Game = {
  id: number;
  age_ratings: number[];
  artworks: {
    image_id: any;
    id: number;
    url: string;
  }[];
  category: number;
  cover: { id: number; url: string; image_id: string };
  created_at: number;
  external_games: number[];
  first_release_date: number;
  game_modes: number[];
  genres?: {
    id: number;
    name: string;
  }[];
  involved_companies: number[];
  keywords: number[];
  name: string;
  platforms: number[];
  release_dates?: {
    id: number;
    date: number;
  }[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  summary: string;
  tags: number[];
  themes?: {
    id: number;
    name: string;
  }[];
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

export type gameContextProps = {
  playedGames: Game[];
  wishlistGames: Game[];
  faveGames: Game[];
  faveChar: Character[];
  addFaveChar: (character: Character) => void;
  removeFaveChar: (characterId: number) => void;
  isCharFave: (characterId: number) => boolean;
  addPlayedGame: (game: Game) => void;
  removePlayedGame: (gameId: number) => void;
  addWishListGame: (game: Game) => void;
  removeWishListGame: (gameId: number) => void;
  addFaveGame: (game: Game) => void;
  removeFaveGame: (gameId: number) => void;
  reviews: Map<number, { review: string; rating: number; timeToBeat: number }>;
  addReview: (
    gameId: number,
    review: string,
    rating: number,
    timeToBeat: number
  ) => void;
};
export type Review = {
  review: string;
  rating: number;
  timeToBeat: number;
};

import { createContext, useContext, useState, ReactNode } from "react";
import { Character, Game } from "../types/types";

type gameContextProps = {
  playedGames: Game[];
  wishListGames: Game[];
  favoriteGames: Game[];
  favoriteCharacters: Character[];
  addFavoriteCharacter: (character: Character) => void;
  removeFavoriteCharacter: (characterId: number) => void;
  isCharacterFavorited: (characterId: number) => boolean;
  addPlayedGame: (game: Game) => void;
  removePlayedGame: (gameId: number) => void;
  addWishListGame: (game: Game) => void;
  removeWishListGame: (gameId: number) => void;
  addFavoriteGame: (game: Game) => void;
  removeFavoritesGame: (gameId: number) => void;
  reviews: Map<number, { review: string; rating: number; timeToBeat: number }>;
  addReview: (
    gameId: number,
    review: string,
    rating: number,
    timeToBeat: number
  ) => void;
};

const gameContext = createContext<gameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playedGames, setPlayedGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<
    Map<number, { review: string; rating: number; timeToBeat: number }>
  >(new Map());
  const [wishListGames, setWishListGames] = useState<Game[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);

  const addFavoriteCharacter = (character: Character) => {
    if (!favoriteCharacters.find((c) => c.id === character.id)) {
      setFavoriteCharacters([...favoriteCharacters, character]);
    }
  };

  const removeFavoriteCharacter = (characterId: number) => {
    setFavoriteCharacters((prev) => prev.filter((c) => c.id !== characterId));
  };

  const isCharacterFavorited = (characterId: number): boolean => {
    return favoriteCharacters.some((char) => char.id === characterId);
  };

  const addPlayedGame = (game: Game) => {
    if (!playedGames.find((g) => g.id === game.id)) {
      setPlayedGames([...playedGames, game]);
    }
  };

  const removePlayedGame = (gameId: number) => {
    setPlayedGames((prev) => prev.filter((g) => g.id !== gameId));
    setReviews((prev) => {
      const newReviews = new Map(prev);
      newReviews.delete(gameId);
      return newReviews;
    });
  };

  const addWishListGame = (game: Game) => {
    if (!wishListGames.find((g) => g.id === game.id)) {
      setWishListGames([...wishListGames, game]);
    }
  };

  const addReview = (
    gameId: number,
    review: string,
    rating: number,
    timeToBeat: number
  ) => {
    setReviews((prev) =>
      new Map(prev).set(gameId, { review, rating, timeToBeat })
    );
  };

  const removeWishListGame = (gameId: number) => {
    setWishListGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  const addFavoriteGame = (game: Game) => {
    if (!favoriteGames.find((g) => g.id === game.id)) {
      setFavoriteGames([...favoriteGames, game]);
    }
  };

  const removeFavoritesGame = (gameId: number) => {
    setFavoriteGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  return (
    <gameContext.Provider
      value={{
        playedGames,
        wishListGames,
        favoriteGames,
        addPlayedGame,
        removePlayedGame,
        addWishListGame,
        removeWishListGame,
        addFavoriteGame,
        removeFavoritesGame,
        reviews,
        addReview,
        favoriteCharacters,
        addFavoriteCharacter,
        removeFavoriteCharacter,
        isCharacterFavorited,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(gameContext);
  if (!context)
    throw new Error("useGameContext must be used inside GameProvider");
  return context;
};

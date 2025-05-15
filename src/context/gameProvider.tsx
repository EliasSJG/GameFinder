import { ReactNode, useReducer } from "react";
import { Game, Character } from "../types/types";
import { gameReducer, initialState } from "./gameReducer";
import { gameContext } from "./gameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  //uses the react reducer so you can send actions
  const [state, dispatch] = useReducer(gameReducer, initialState);

  //functions that dispacthes actions to the reducer to update the state
  const addPlayedGame = (game: Game) =>
    dispatch({ type: "ADD_PLAYED_GAME", payload: game });
  const removePlayedGame = (gameId: number) =>
    dispatch({ type: "REMOVE_PLAYED_GAME", payload: gameId });

  const addWishListGame = (game: Game) =>
    dispatch({ type: "ADD_WISHLIST_GAME", payload: game });
  const removeWishListGame = (gameId: number) =>
    dispatch({ type: "REMOVE_WISHLIST_GAME", payload: gameId });

  const addFaveGame = (game: Game) =>
    dispatch({ type: "ADD_FAVE_GAME", payload: game });
  const removeFaveGame = (gameId: number) =>
    dispatch({ type: "REMOVE_FAVE_GAME", payload: gameId });

  const addFaveChar = (character: Character) =>
    dispatch({ type: "ADD_FAVE_CHAR", payload: character });
  const removeFaveChar = (characterId: number) =>
    dispatch({ type: "REMOVE_FAVE_CHAR", payload: characterId });

  const addReview = (
    gameId: number,
    review: string,
    rating: number,
    timeToBeat: number
  ) => {
    dispatch({
      type: "ADD_REVIEW",
      payload: { gameId, review, rating, timeToBeat },
    });
  };
  //a function to check if the character is already in the list
  const isCharFave = (characterId: number) =>
    state.faveChar.some((char) => char.id === characterId);
  //returns everything to use in all the children
  return (
    <gameContext.Provider
      value={{
        playedGames: state.playedGames,
        wishlistGames: state.wishlistGames,
        faveGames: state.faveGames,
        faveChar: state.faveChar,
        reviews: state.reviews,
        addPlayedGame,
        removePlayedGame,
        addWishListGame,
        removeWishListGame,
        addFaveGame,
        removeFaveGame,
        addFaveChar,
        removeFaveChar,
        addReview,
        isCharFave,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};
export { gameReducer };

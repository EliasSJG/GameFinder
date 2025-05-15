import { Game, Character, Review } from "../types/types";
import {
  addUsersChoice,
  removeUsersChoice,
} from "../utilities/userFunctionsHelpers";

//creates the type for the state/storage for the things the user as added
export type gameState = {
  playedGames: Game[];
  wishlistGames: Game[];
  faveGames: Game[];
  faveChar: Character[];
  reviews: Map<number, Review>;
};

//creates the type for the functions
export type gameFunctions =
  | { type: "ADD_PLAYED_GAME"; payload: Game }
  | { type: "REMOVE_PLAYED_GAME"; payload: number }
  | { type: "ADD_WISHLIST_GAME"; payload: Game }
  | { type: "REMOVE_WISHLIST_GAME"; payload: number }
  | { type: "ADD_FAVE_GAME"; payload: Game }
  | { type: "REMOVE_FAVE_GAME"; payload: number }
  | { type: "ADD_FAVE_CHAR"; payload: Character }
  | { type: "REMOVE_FAVE_CHAR"; payload: number }
  | {
      type: "ADD_REVIEW";
      payload: {
        gameId: number;
        review: string;
        rating: number;
        timeToBeat: number;
      };
    };

//the initial state used by the reducer
export const initialState: gameState = {
  playedGames: [],
  wishlistGames: [],
  faveGames: [],
  faveChar: [],
  reviews: new Map(),
};

export const gameReducer = (
  state: gameState,
  action: gameFunctions
): gameState => {
  //the functions

  switch (action.type) {
    //adds a game to the played list
    case "ADD_PLAYED_GAME":
      return {
        //we copy the state and take the playedGames array, and then we add the game with the add function from userFunctionsHelpers.ts
        // and we overwrite the new playedGames with a new array
        ...state,
        playedGames: addUsersChoice(state.playedGames, action.payload),
      };

    case "REMOVE_PLAYED_GAME": {
      //creates a new copy of the state reviews map and removes it
      const updatedReviews = new Map(state.reviews);
      updatedReviews.delete(action.payload);

      return {
        //copys the state with the played games list and removes the matching id and updates the reviews.
        ...state,
        playedGames: removeUsersChoice(state.playedGames, action.payload),
        reviews: updatedReviews,
      };
    }

    case "ADD_WISHLIST_GAME":
      return {
        ...state,
        wishlistGames: addUsersChoice(state.wishlistGames, action.payload),
      };

    case "REMOVE_WISHLIST_GAME":
      return {
        ...state,
        wishlistGames: removeUsersChoice(state.wishlistGames, action.payload),
      };

    case "ADD_FAVE_GAME":
      return {
        ...state,
        faveGames: addUsersChoice(state.faveGames, action.payload),
      };

    case "REMOVE_FAVE_GAME":
      return {
        ...state,
        faveGames: removeUsersChoice(state.faveGames, action.payload),
      };

    case "ADD_FAVE_CHAR":
      return {
        ...state,
        faveChar: addUsersChoice(state.faveChar, action.payload),
      };

    case "REMOVE_FAVE_CHAR":
      return {
        ...state,
        faveChar: removeUsersChoice(state.faveChar, action.payload),
      };

    case "ADD_REVIEW": {
      //takes the states reviews and creates a new map
      const newReviews = new Map(state.reviews);
      //adds a review with a specific id and what it containts.
      newReviews.set(action.payload.gameId, {
        review: action.payload.review,
        rating: action.payload.rating,
        timeToBeat: action.payload.timeToBeat,
      });

      //returns the state with a new updated review Map
      return { ...state, reviews: newReviews };
    }

    default:
      return state;
  }
};

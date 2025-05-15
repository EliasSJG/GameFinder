import { createContext, useContext } from "react";
import { gameContextProps } from "../types/types";

//creating the context
export const gameContext = createContext<gameContextProps | undefined>(
  undefined
);

export const useGameContext = () => {
  const context = useContext(gameContext);
  if (!context)
    throw new Error("useGameContext must be used inside GameProvider");
  return context;
};

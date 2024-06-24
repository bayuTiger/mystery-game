import { GameState } from "../types";

export const initialGameState: GameState = {
  currentScene: "intro",
  conversationCount: 0,
  dialogHistory: [],
  isLoading: false,
  error: null,
};

export const resetGameState = (): GameState => {
  localStorage.removeItem("gameState");
  return initialGameState;
};

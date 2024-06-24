import { atom } from "recoil";
import { GameState } from "../types";
import { initialGameState } from "../utils/gameState";

export const gameStateAtom = atom<GameState>({
  key: "gameState",
  default: initialGameState,
});

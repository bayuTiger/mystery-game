export const saveGameState = (state: GameState): void => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("gameState", serializedState);
    } catch (err) {
      console.error("Could not save game state:", err);
    }
  }
};

export const loadGameState = (): GameState | undefined => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("gameState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState) as GameState;
    } catch (err) {
      console.error("Could not load game state:", err);
      return undefined;
    }
  }
  return undefined;
};

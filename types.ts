export interface GameState {
  currentScene: "intro" | "investigation" | "gameOver";
  conversationCount: number;
  dialogHistory: string[];
  score?: number;
  accusedNPC?: string;
  isLoading: boolean;
  error: string | null;
}

export interface NPC {
  id: number;
  name: string;
  image: string;
  dialogues: DialogueOption[];
}

export interface DialogueOption {
  text: string;
  response: string;
}

export interface Scenario {
  title: string;
  description: string;
  npcs: NPC[];
  culprit: string;
}

export interface GameState {
  currentScene: "intro" | "investigation" | "gameOver" | "ending";
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
  ending: EndingScene;
  hints: string[];
}

export interface EndingScene {
  dialogue: EndingDialogue[];
  bestStrategy: BestStrategy;
}

export interface EndingDialogue {
  speaker: string;
  text: string;
}

export interface BestStrategy {
  choices: string[];
  explanation: string;
}

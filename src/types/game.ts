
export interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  timer: number;
  language: string;
  isGameActive: boolean;
  progress: number;
}

export interface NumberItem {
  id: string;
  value: number;
  x: number;
  y: number;
  isInTray: boolean;
  trayId?: string;
  shape?: string;
  color?: string;
}

export interface GameLevel {
  id: number;
  name: string;
  range: [number, number];
  description: string;
}

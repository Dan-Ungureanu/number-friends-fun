import { ReactNode } from "react";

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
  [x: string]: ReactNode;
  id: string;
  value: number;
  x: number;
  y: number;
  isInTray: boolean;
  shape?: string;
  color?: string;
  trayId?: string;
}

export interface GameLevel {
  id: number;
  name: string;
  range: [number, number];
  description: string;
}

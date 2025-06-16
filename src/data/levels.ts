
import { GameLevel } from '../types/game';

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: "level_beginner",
    range: [0, 10],
    description: "Drag & drop objects into 2 trays. Validate pairs."
  },
  {
    id: 2,
    name: "level_interactive",
    range: [11, 31],
    description: "Decompose number into tens + units and validate visually."
  },
  {
    id: 3,
    name: "level_advanced",
    range: [100, 999],
    description: "Display table with hundreds-tens-units and validate last digit."
  },
  {
    id: 4,
    name: "level_pro",
    range: [1000, 999999999],
    description: "Classification in Even/Odd quadrants with complex value tables."
  }
];

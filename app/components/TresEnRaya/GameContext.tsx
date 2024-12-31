import { createContext, useContext } from 'react';
import { SquareValue, WinLine } from './types';

interface GameContextType {
  winner: SquareValue;
  squares: SquareValue[];
  xIsNext: boolean;
  winLine: WinLine;
  scores: { X: number; O: number };
  handleClick: (i: number) => void;
  resetGame: () => void;
  undoLastMove: () => void;
  canUndo: boolean;
  isDraw: boolean;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used in a GameProvider');
  }

  return context;
};

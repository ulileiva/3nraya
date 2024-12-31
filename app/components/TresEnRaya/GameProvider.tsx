import { ReactNode, useState } from 'react';
import { GameContext } from './GameContext';
import { SquareValue, WinLine } from './types';

type Props = {
  children: ReactNode;
  xColor?: string;
  oColor?: string;
};

const initialSquares = Array(9).fill(null);
let countGames = 1;

export const GameProvider = ({
  children,
  xColor = '#facc15',
  oColor = '#dc2626',
}: Props) => {
  const [squares, setSquares] = useState<SquareValue[]>(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const [winLine, setWinLine] = useState<WinLine>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [history, setHistory] = useState<SquareValue[][]>([initialSquares]);
  const [currentMove, setCurrentMove] = useState(0);

  const handleClick = (i: number) => {
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    const currentPlayer = xIsNext ? 'X' : 'O';
    newSquares[i] = currentPlayer;

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newSquares]);
    setCurrentMove(newHistory.length);
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const [winner, winningSquares] = calculateWinner(newSquares);
    if (winner && winningSquares) {
      setWinLine(getWinLineCoordinates(winningSquares, winner, xColor, oColor));
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
  };

  const undoLastMove = () => {
    if (currentMove === 0) return;

    const newMove = currentMove - 1;
    const previousSquares = history[newMove];
    setCurrentMove(newMove);
    setSquares(previousSquares);
    setXIsNext(!xIsNext);
    setWinLine(null);
  };

  const resetGame = () => {
    setSquares(initialSquares);
    setHistory([initialSquares]);
    setCurrentMove(0);
    setWinLine(null);
    setXIsNext(countGames % 2 === 0);
    countGames++;
  };

  const [winner] = calculateWinner(squares);

  return (
    <GameContext.Provider
      value={{
        winner,
        squares,
        xIsNext,
        winLine,
        scores,
        handleClick,
        resetGame,
        undoLastMove,
        canUndo: currentMove > 0 && !winner,
        isDraw: squares.every((square) => square !== null),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const calculateWinner = (
  squares: SquareValue[]
): [SquareValue | null, number[] | null] => {
  const lines = [
    [0, 1, 2], // Horizontal superior
    [3, 4, 5], // Horizontal medio
    [6, 7, 8], // Horizontal inferior
    [0, 3, 6], // Vertical izquierda
    [1, 4, 7], // Vertical medio
    [2, 5, 8], // Vertical derecha
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }

  return [null, null];
};

const getWinLineCoordinates = (
  winningSquares: number[],
  winner: SquareValue,
  xColor: string,
  oColor: string
): WinLine => {
  const positions = [
    [16.5, 16.5], // Casilla 0
    [50, 16.5], // Casilla 1
    [83.5, 16.5], // Casilla 2
    [16.5, 50], // Casilla 3
    [50, 50], // Casilla 4
    [83.5, 50], // Casilla 5
    [16.5, 83.5], // Casilla 6
    [50, 83.5], // Casilla 7
    [83.5, 83.5], // Casilla 8
  ];

  return {
    start: positions[winningSquares[0]] as [number, number],
    end: positions[winningSquares[2]] as [number, number],
    color: winner === 'X' ? xColor : oColor,
  };
};

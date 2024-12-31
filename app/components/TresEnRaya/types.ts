export type SquareValue = 'X' | 'O' | null;

export type WinLine = {
  start: [number, number];
  end: [number, number];
  color: string;
} | null;

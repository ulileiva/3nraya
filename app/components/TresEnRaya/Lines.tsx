import { useGame } from './GameContext';

const WinningLine = () => {
  const { winLine } = useGame();

  if (!winLine) {
    return null;
  }

  return (
    <line
      x1={winLine.start[0]}
      y1={winLine.start[1]}
      x2={winLine.end[0]}
      y2={winLine.end[1]}
      className="stroke-[2] animate-[drawLine_0.5s_forwards]"
      stroke={winLine.color}
      strokeDasharray="100"
      strokeDashoffset="100"
    />
  );
};

export const Lines = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 100 100"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M33,5 L33,95" className="stroke-black stroke-[2] opacity-80" />
    <path d="M67,5 L67,95" className="stroke-black stroke-[2] opacity-80" />
    <path d="M5,33 L95,33" className="stroke-black stroke-[2] opacity-80" />
    <path d="M5,67 L95,67" className="stroke-black stroke-[2] opacity-80" />

    <WinningLine />
  </svg>
);

import { useGame } from '../TresEnRaya/GameContext';

export const Squares = () => {
  const { squares, winner, handleClick } = useGame();

  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
      {squares.map((square, i) => (
        <button
          key={i}
          className="relative flex items-center justify-center text-6xl md:text-8xl font-bold focus:outline-none"
          onClick={() => handleClick(i)}
          disabled={Boolean(winner) || square !== null}
          aria-label={`Casilla ${i + 1}`}
        >
          {square && (
            <img
              src={`/${square === 'X' ? 'claudia' : 'paula'}.png`}
              className="max-w-[90%] max-h-[70%]"
            />
          )}
        </button>
      ))}
    </div>
  );
};

import { useGame } from '../TresEnRaya/GameContext';

export const Info = () => {
  const { winner, xIsNext, isDraw } = useGame();

  if (winner) {
    return (
      <p className="h-10 flex items-center gap-2">
        Ganador:
        <img
          src={`/${winner === 'X' ? 'claudia' : 'paula'}.png`}
          className="h-10 inline-block"
        />
      </p>
    );
  }

  if (isDraw) {
    return <p className="h-10 flex items-center">Empate</p>;
  }

  return (
    <p className="h-10 flex items-center gap-2">
      Turno:
      <img
        src={`/${xIsNext ? 'claudia' : 'paula'}.png`}
        className="h-10 inline-block"
      />
    </p>
  );
};

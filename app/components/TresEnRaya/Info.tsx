import { cx } from 'class-variance-authority';
import { useGame } from './GameContext';
import { fontVariant } from './styles';

export const Info = () => {
  const { winner, xIsNext, isDraw } = useGame();

  if (winner) {
    return (
      <p className="h-10">
        Ganador:{' '}
        <span
          className={cx(
            'text-4xl relative top-1',
            fontVariant({ isX: winner === 'X' })
          )}
        >
          {winner}
        </span>
      </p>
    );
  }

  if (isDraw) {
    return (
      <p className="h-10">
        Empate<span className="text-4xl"></span>
      </p>
    );
  }

  return (
    <p className="h-10">
      Turno:{' '}
      <span
        className={cx(
          'text-4xl relative top-1 w-5 inline-block',
          fontVariant({ isX: xIsNext })
        )}
      >
        {xIsNext ? 'X' : 'O'}
      </span>
    </p>
  );
};

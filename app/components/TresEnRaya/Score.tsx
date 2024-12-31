import { cx } from 'class-variance-authority';
import { useGame } from './GameContext';
import { fontVariant } from './styles';

export const Score = () => {
  const { scores } = useGame();

  return (
    <p className="flex gap-8">
      {Object.entries(scores).map(([key, value]) => (
        <span key={key} className="flex gap-2 items-center">
          <span className={cx('text-4xl', fontVariant({ isX: key === 'X' }))}>
            {key}
          </span>
          : {value}
        </span>
      ))}
    </p>
  );
};

import { useGame } from '../TresEnRaya/GameContext';
import { Squares } from './Squares';
import { Button } from '@/components/Button';
import { Lines } from '../TresEnRaya/Lines';
import { Info } from './Info';
import { Score } from './Score';

export const TresEnRaya = () => {
  const { winner, isDraw, canUndo, resetGame, undoLastMove } = useGame();

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5 text-2xl font-semibold">
      <Info />
      <Score />
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] select-none my-4">
        <Lines />
        <Squares />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={resetGame}
          variant={winner || isDraw ? 'default' : 'outline'}
        >
          Nueva partida
        </Button>
        <Button onClick={undoLastMove} variant="secondary" disabled={!canUndo}>
          Deshacer
        </Button>
      </div>
    </div>
  );
};

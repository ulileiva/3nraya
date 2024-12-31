import { useGame } from './GameContext';
import { Squares } from './Squares';
import { Button } from '@/components/Button';
import { Lines } from './Lines';
import { Info } from './Info';
import { Score } from './Score';

export const TresEnRaya = () => {
  const { resetGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5 text-2xl font-semibold">
      <Info />
      <Score />
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] select-none my-4">
        <Lines />
        <Squares />
      </div>
      <Button onClick={resetGame}>Reiniciar</Button>
    </div>
  );
};

'use client';

import { GameProvider } from '@/components/TresEnRaya/GameProvider';
import { TresEnRaya } from '@/components/TresEnRaya';

const Home = () => (
  <GameProvider>
    <TresEnRaya />
  </GameProvider>
);

export default Home;

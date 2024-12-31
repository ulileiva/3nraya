'use client';

import { GameProvider } from '@/components/TresEnRaya/GameProvider';
import { TresEnRaya } from '@/components/TresEnRayaClaudia';

const Home = () => (
  <GameProvider>
    <TresEnRaya />
  </GameProvider>
);

export default Home;

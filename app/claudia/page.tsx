'use client';

import { GameProvider } from '@/components/TresEnRaya/GameProvider';
import { TresEnRaya } from '@/components/TresEnRayaClaudia';

const Home = () => (
  <GameProvider xColor="#ff7f00" oColor="#888">
    <TresEnRaya />
  </GameProvider>
);

export default Home;

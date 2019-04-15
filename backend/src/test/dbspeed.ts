import { performance } from 'perf_hooks';
import { Player, PlayerRankings } from '../data/mongoconnector';

const RUNS = 100;

const runTest = async (text: string, operation: any) => {
  const ap0 = performance.now();
  for (let i = 0; i < RUNS; i++) {
    await operation();
  }
  const ap1 = performance.now();
  console.log(`${text} - ${(ap1 - ap0) / RUNS}ms`);
};

const testSpeed = async () => {
  await runTest('getAllPlayers', () => Player.find({}));
  await runTest('getOnePlayer', () =>
    Player.findById('5cb3596d02267040400701c2'),
  );
  await runTest('getByPlayerId', () => Player.findOne({ playerId: '3582' }));
  await runTest('getRankings - findOne', () =>
    PlayerRankings.findOne({ userId: 'mikaelrss' }),
  );
  await runTest('getRankings - find', () =>
    PlayerRankings.find({ userId: 'mikaelrss' }),
  );
};

testSpeed();

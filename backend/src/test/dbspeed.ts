/* eslint-disable */

import { performance } from 'perf_hooks';

const RUNS = 100;

const runTest = async (text: string, operation: any) => {
  const ap0 = performance.now();
  for (let i = 0; i < RUNS; i++) {
    await operation();
  }
  const ap1 = performance.now();
  console.log(`${text} - ${(ap1 - ap0) / RUNS}ms`);
};

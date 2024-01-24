export function getRandomNumber(n: number): number {
  return Math.floor(Math.random() * n);
}

export function getRandomArray(): number[] {
  return Array.from({ length: 100 }, () => getRandomNumber(1000));
}

export type Factor = [number, number];

const getFactorPrime = (base: number, factor: number) => {
  const nextValue = getNextValue(base, factor);
  const factorPrime = ((nextValue - base) * 100) / nextValue;

  return factorPrime;
};

const getNextValue = (base: number, factor: number) => {
  const nextValue = base + (factor / 100) * base;

  return nextValue;
};

const findHighestNumber = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error('Array is empty');
  }

  let highest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > highest) {
      highest = numbers[i];
    }
  }
  return highest;
};

const findLowestNumber = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error('Array is empty');
  }

  let lowest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < lowest) {
      lowest = numbers[i];
    }
  }
  return lowest;
};

const sortNumbers = (numbers: number[], direction: '>' | '<'): number[] => {
  const sortedNumbers = numbers.slice();
  if (direction === '>') {
    return sortedNumbers.sort((a, b) => a - b);
  } else if (direction === '<') {
    return sortedNumbers.sort((a, b) => b - a);
  } else {
    throw new Error("Invalid direction. Use '>' or '<'.");
  }
};

const isOdd = (n: number) => n % 2 !== 0;

const limit = 1024;
const lowestLimitValue = 4;

export const generateFactorValues = (factor: Factor, base: number) => {
  const [f1, f2] = factor;

  let highestValue = base;
  const valuesToRight = new Set<number>();
  valuesToRight.add(base);

  // 1. Compute values to right
  while (highestValue < limit) {
    const currentBase = findHighestNumber([...valuesToRight]);
    const currentFactor = isOdd(valuesToRight.size) ? f2 : f1;
    const nextValue = Math.ceil(getNextValue(currentBase, currentFactor));

    valuesToRight.add(nextValue);
    highestValue = nextValue;
  }

  const f1Prime = getFactorPrime(base, f2);
  const sortedValuesToRight = sortNumbers([...valuesToRight], '>');
  const basePlusOne = sortedValuesToRight[1];
  const f2Prime = getFactorPrime(basePlusOne, f1);
  const valuesToLeft = new Set<number>();
  valuesToLeft.add(base);
  let lowestValue = base;

  // 2. Compute values to left
  while (lowestValue > lowestLimitValue) {
    const currentPrime = isOdd(valuesToLeft.size) ? f1Prime : f2Prime;

    const currentBase = findLowestNumber([...valuesToLeft]);

    const previousValue = Math.ceil(
      currentBase - (currentPrime / 100) * currentBase
    );

    lowestValue = previousValue;
    valuesToLeft.add(previousValue);
  }

  // 3. Combine and return;
  const combined = [...valuesToLeft, ...valuesToRight];
  new Set();
  const res = sortNumbers(combined, '>');
  // const rounded = res.map(n => Math.ceil(n));
  console.log('res:', res);
  // console.log('rounded:', rounded);
  return res;
};

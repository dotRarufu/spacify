import {
  isOdd,
  nearestDivisibleBy4,
  roundOff,
  roundToDecimal,
  roundToNearestHundredth,
} from "./math";

const sortNumbers = (numbers: number[], direction: ">" | "<"): number[] => {
  const sortedNumbers = numbers.slice();
  if (direction === ">") {
    return sortedNumbers.sort((a, b) => a - b);
  } else if (direction === "<") {
    return sortedNumbers.sort((a, b) => b - a);
  } else {
    throw new Error("Invalid direction. Use '>' or '<'.");
  }
};

export type Factor = [number, number];

const getFactorPrime = (factor: number, base: number) => {
  const nextValue = getNextValue(factor, base);
  const factorPrime = ((nextValue - base) * 100) / nextValue;

  return factorPrime;
};

const getNextValue = (factor: number, base: number) => {
  const nextValue = base + (factor / 100) * base;

  return nextValue;
};

const limit = 100;
const lowestLimitValue = 0.25;
const base = 1;

export const generateFactorValues = (
  factor: Factor,
  baseFontSize: number,
  isDivisibleBy4: boolean,
) => {
  const [f1, f2] = factor;

  let highestValue = base;
  const valuesToRight = new Set<number>();
  valuesToRight.add(base);

  // 1. Compute values to right
  while (highestValue < limit) {
    const currentFactor = isOdd(valuesToRight.size) ? f2 : f1;
    const nextValue = getNextValue(currentFactor, highestValue);

    valuesToRight.add(nextValue);
    highestValue = nextValue;
  }

  // Get the factor primes
  const sorted = sortNumbers([...valuesToRight], ">");
  const f1Prime = getFactorPrime(f2, sorted[0]);
  const f2Prime = getFactorPrime(f1, sorted[1]);

  // 3. Compute values to left
  const valuesToLeft = new Set<number>();
  valuesToLeft.add(base);
  let lowestValue = base;

  while (lowestValue > lowestLimitValue) {
    const currentPrime = isOdd(valuesToLeft.size) ? f1Prime : f2Prime;

    const currentBase = lowestValue;

    const previousValue = currentBase - (currentPrime / 100) * currentBase;

    lowestValue = previousValue;
    valuesToLeft.add(previousValue);
  }

  // 4
  const removeExtraBase = [...valuesToLeft].slice(1);
  const combined = [...removeExtraBase, ...valuesToRight];
  const sortedCombined = sortNumbers(combined, ">");
  const possibleDuplicate = sortedCombined
    .map((n) => roundToNearestHundredth(n))
    .map((n) => n * baseFontSize)
    .map((n) => (isDivisibleBy4 ? nearestDivisibleBy4(n) : roundOff(n)));

  const removeDuplicates = new Set(possibleDuplicate);

  return [...removeDuplicates];
};

export const convertToRem = (number: number, base: number) => {
  return roundToDecimal(number / base, 4) + "rem";
};

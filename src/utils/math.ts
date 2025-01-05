export const findHighestNumber = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("Array is empty");
  }

  let highest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > highest) {
      highest = numbers[i];
    }
  }
  return highest;
};

export const findLowestNumber = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("Array is empty");
  }

  let lowest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < lowest) {
      lowest = numbers[i];
    }
  }
  return lowest;
};

export const isOdd = (n: number) => n % 2 !== 0;

export const roundToNearestHundredth = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const nearestDivisibleBy4 = (num: number): number => {
  const nearestLower = Math.floor(num / 4) * 4;
  const nearestUpper = nearestLower + 4;

  if (num - nearestLower < nearestUpper - num) {
    return nearestLower;
  } else {
    return nearestUpper;
  }
};

export const getLowestRatio = (value1: number, value2: number): string => {
  const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const divisor = gcd(value1, value2);
  const x = value1 / divisor;
  const y = value2 / divisor;

  return `${x} : ${y}`;
};

export const roundOff = (n: number) => Math.round(n);

export const roundToDecimal = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

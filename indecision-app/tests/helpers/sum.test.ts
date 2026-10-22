import { expect, test } from 'vitest';
import { addArray, sum } from '@/helpers/sum';

describe('add function', () => {
  test('adds 1 + 2 to equal 3', () => {
    const a = 1;
    const b = 4;

    const result = sum(a, b);

    expect(result).toBe(a + b);
  });
});

describe('array function', () => {
  test('should return 0 if the array is empty', () => {
    const numberArray: number[] = [];

    const result = addArray(numberArray);

    expect(result).toBe(0);
  });

  test('should return the proper value of the addArray function', () => {
    const numberArray: number[] = [1, 2, 3, 4, 5];

    const result = addArray(numberArray);

    expect(result).toBe(15);
  });
});

import { describe } from 'vitest';
import { useCounter } from '@/components/composables/useCounter';

describe('useCounter', () => {
  test('initializes counter with provided initial value', () => {
    const initialValue = 5;
    const { counter, squareCounter } = useCounter(initialValue);

    expect(counter.value).toBe(initialValue);
    expect(squareCounter.value).toBe(initialValue * initialValue);
  });

  test('increments counter correctly', () => {
    const initialValue = 5;
    const { counter, squareCounter } = useCounter(initialValue);
    counter.value++;

    expect(counter.value).toBe(6);
    expect(squareCounter.value).toBe(36);
  });
});

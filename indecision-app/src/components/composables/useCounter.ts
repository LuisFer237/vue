import { ref, computed } from 'vue';

// const counter = ref(10);

export const useCounter = (initialValue: number = 10) => {
  const counter = ref(initialValue);
  return {
    counter,
    squareCounter: computed(() => counter.value * counter.value),
  };
};

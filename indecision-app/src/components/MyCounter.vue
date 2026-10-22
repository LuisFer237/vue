<template>
  <section class="mx-auto my-6 w-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 class="text-sm font-medium tracking-wide text-slate-500 uppercase">
      Counter: {{ counter }}
    </h3>
    <p class="text-5xl font-bold text-slate-900 tabular-nums">{{ counter }}</p>

    <h3 class="mt-4 text-sm font-medium tracking-wide text-slate-500 uppercase">
      Square: {{ squareCounter }}
    </h3>
    <p data-testid="square-label" class="text-2xl font-semibold text-indigo-600 tabular-nums">
      {{ squareCounter }}
    </p>

    <div class="mt-6 flex gap-3">
      <button
        class="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none active:scale-95"
        @click="counter++"
      >
        +1
      </button>
      <button
        class="flex-1 cursor-pointer rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-800 transition hover:bg-slate-300 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none active:scale-95"
        @click="counter--"
      >
        -1
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useCounter } from './composables/useCounter';

const props = defineProps({
  value: { type: Number, required: true },
});

const { counter, squareCounter } = useCounter(props.value);

// import { computed, ref } from 'vue';

// const props = defineProps({
//   value: { type: Number, required: true },
// });

// const counter = ref(props.value);
// const squareCounter = computed(() => counter.value * counter.value);

// const increaseValue = () => {
//   counter.value += 1;
// };

// const decreseValue = () => {
//   counter.value -= 1;
// };
</script>

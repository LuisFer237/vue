<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>

    <div>
      <button @click="increaseValue">+1</button>
      <button @click="decreseValue">-1</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  value: { type: Number, required: true },
});

const counter = ref(props.value);
const squareCounter = computed(() => counter.value * counter.value);

const increaseValue = () => {
  counter.value += 1;
};

const decreseValue = () => {
  counter.value -= 1;
};
</script>

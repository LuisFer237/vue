<template>
  <button
    @click="$emit('click')"
    :class="['btn btn-circle btn-secondary p-1 fixed', positions[position]]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

const positions: Record<Props['position'], string> = {
  'top-left': 'top-10 left-10',
  'top-right': 'top-10 right-10',
  'bottom-left': 'bottom-10 left-10',
  'bottom-right': 'bottom-10 right-10',
};
</script>

<template>
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">{{ message }}</div>
  </div>

  <!-- Example Received Message -->
  <div v-else class="flex">
    <div class="flex max-w-xs flex-col gap-2 rounded-lg bg-gray-300 p-2 text-black">
      <span>{{ message }}</span>
      <img v-if="image" :src="image" alt="YesNoImage" class="block h-auto w-full rounded-md" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
  itsMine: boolean;
  image?: string;
}

defineProps<Props>();
</script>

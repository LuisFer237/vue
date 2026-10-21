<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div ref="contentRef" class="flex flex-col space-y-2">
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessage } from '@/interfaces/chat-message.interface.ts';
import { onMounted, onUnmounted, ref } from 'vue';
import ChatBubble from './ChatBubble.vue';

interface Props {
  messages: ChatMessage[];
}

defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  chatRef.value?.scrollTo({
    top: chatRef.value.scrollHeight,
    behavior: 'smooth',
  });
};

const resizeObserver = new ResizeObserver(scrollToBottom);

onMounted(() => {
  if (contentRef.value) resizeObserver.observe(contentRef.value);
});

onUnmounted(() => resizeObserver.disconnect());
</script>

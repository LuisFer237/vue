<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Esposa</span>
    </div>

    <ChatMessages :messages="messages" />

    <TypingIncicator v-if="isTyping" />

    <MessageBox @send-message="onMessage" />
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { useChat } from '@/components/composables/useChat';
import TypingIncicator from '@/components/chat/TypingIncicator.vue';

const { messages, isTyping, onMessage } = useChat();
</script>

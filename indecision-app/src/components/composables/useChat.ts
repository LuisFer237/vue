import { sleep } from '@/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { ref } from 'vue';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([
    {
      id: new Date().getTime(),
      message: 'Mondongo?',
      itsMine: true,
    },
    {
      id: new Date().getTime(),
      message: 'Si',
      itsMine: false,
      image: 'https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif',
    },
  ]);
  const isTyping = ref(false);

  const onMessage = async (text: string) => {
    if (text.length === 0) return;

    const getResponse = async () => {
      const res = await fetch('https://yesno.wtf/api');
      const data = (await res.json()) as YesNoResponse;
      return data;
    };

    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    });

    // Evaluar si termina con un ?
    if (!text.endsWith('?')) return;
    isTyping.value = true;
    try {
      await sleep(1.5);
      const { answer, image } = await getResponse();

      messages.value.push({
        id: new Date().getTime(),
        itsMine: false,
        message: answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase(),
        image: image,
      });
    } finally {
      isTyping.value = false;
    }
  };

  return {
    //Properties
    messages,
    isTyping,

    // Methods
    onMessage,
  };
};

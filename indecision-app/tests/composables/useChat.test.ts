import { useChat } from '@/components/composables/useChat';

describe('useChat', () => {
  test('add message correctly when onMessage is called', async () => {
    const text = 'Hola mundo';
    const { messages, onMessage } = useChat();

    await onMessage(text);

    expect(messages.value.length).toBe(3);
    expect(messages.value.at(-1)).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
  });

  test('gets her response correctly when message ends with "?"', async () => {
    const text = 'Quieres café?';
    const { messages, onMessage } = useChat();

    await onMessage(text);

    await new Promise((r) => setTimeout(r, 2000));
    const [myMessage, herMessage] = messages.value.slice(2);

    expect(messages.value.length).toBe(4);
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
    expect(herMessage).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      itsMine: false,
      message: expect.any(String),
    });
  });

  test('mock response - fetch api', async () => {
    const mockResponse = {
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif',
    };

    window.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
    });

    const text = 'Quieres café?';
    const { messages, onMessage } = useChat();

    await onMessage(text);

    await new Promise((r) => setTimeout(r, 1600));

    const [, , , herMessage] = messages.value;

    expect(herMessage).toEqual({
      id: expect.any(Number),
      image: mockResponse.image,
      itsMine: false,
      message: 'Yes',
    });
  });
});

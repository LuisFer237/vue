import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

describe('My Counter', () => {
  test('should match snapshot', () => {
    const wrapper = mount(MyCounter, {
      props: {
        value: 5,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the counter value correctly', () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    // expect(wrapper.find('[data-testid="square-label"]').text()).toContain(value * value);

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    expect(counterLabel?.text()).toContain(`Counter: ${value}`);
    expect(squareLabel?.text()).toContain(`Square: ${value * value}`);

    // console.log(wrapper.html());
  });

  test('increments the counter when +1 button is clicked', async () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');
    const btnIncrement = wrapper.find('button');
    await btnIncrement.trigger('click');

    expect(counterLabel?.text()).toContain(`Counter: ${value + 1}`);
    expect(squareLabel?.text()).toContain(`Square: ${(value + 1) * (value + 1)}`);
  });

  test('decrements the counter when -1 vutton is clicked twice', async () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [, decreaseButton] = wrapper.findAll('button');
    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    await decreaseButton?.trigger('click');
    await decreaseButton?.trigger('click');

    expect(counterLabel?.text()).toContain(`Counter: ${value - 2}`);
    expect(squareLabel?.text()).toContain(`Square: ${(value - 2) * (value - 2)}`);
  });
});

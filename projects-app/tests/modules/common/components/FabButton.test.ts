import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('FabButton', () => {
  test('renders with default position', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.props().position).toBe('bottom-right');
    const buttonClasses = wrapper.find('button').classes();
    const classesToHave = [
      'btn',
      'btn-circle',
      'btn-secondary',
      'p-1',
      'fixed',
      'bottom-10',
      'right-10',
    ];
    expect(buttonClasses).toEqual(classesToHave);
  });

  test('renders with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('top-10');
    expect(button.classes()).toContain('left-10');
  });

  test('renders with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-right',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('top-10');
    expect(button.classes()).toContain('right-10');
  });

  test('renders slot content inside button', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hola</span>',
      },
    });

    const slotContent = wrapper.find('button span');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Hola');
  });
});

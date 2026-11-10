import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('FabButton', () => {
  test('renders with default position', () => {
    const wrapper = shallowMount(FabButton);
  });
});

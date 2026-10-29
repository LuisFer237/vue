import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import { RouterView } from 'vue-router';
describe('App', () => {
  test('should be render correctly with routerview', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const routerView = wrapper.findComponent({ name: 'RouterView' });

    expect(routerView.exists()).toBe(true);
  });
});

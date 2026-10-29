import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { RouteLocationNormalized } from 'vue-router';

describe('Router', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  test('renders HomePage when visiting /', async () => {
    await router.replace('/');
    await router.isReady();

    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('renders FeaturesPage when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();
    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
    await router.replace('/');

    await router.push({
      name: 'features',
    });
    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
  });

  test('renders PricingPage when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();
    expect(wrapper.html()).toContain('Plans');
  });

  test('renders ContactPage when visiting /contact', async () => {
    await router.replace('/contact');
    await router.isReady();
    expect(wrapper.html()).toContain('Chicharrones blog helvetica normcore iceland tousled brook');
  });

  test('renders LoginPage when visiting /pokemon/:id with no authentication', async () => {
    localStorage.setItem('userId', 'ABC-123');
    await router.replace('/pokemon/151');
    await router.isReady();

    const imgPokemon = wrapper.find('img[alt="pokemon"]');

    expect(wrapper.find('h1').text()).toContain('Pokemon 151');
    expect(imgPokemon.attributes('src')).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg',
    );

    // expect(wrapper.html()).toContain('Chicharrones blog helvetica normcore iceland tousled brook');
  });

  test('should convert the segment into numbers', () => {
    const route: RouteLocationNormalized = {
      name: undefined,
      matched: [],
      fullPath: 'pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      params: { id: '2' },
      path: '',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(2);
  });

  test('should return default valie if argument is not a number', () => {
    const route: any = {
      fullPath: 'pokemon/2',
      params: { id: '2abc' },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(1);
  });
});

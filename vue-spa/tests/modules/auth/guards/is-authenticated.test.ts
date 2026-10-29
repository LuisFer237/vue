import isAuthtenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteLocationNormalized } from 'vue-router';

describe('Is Authenticated', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    meta: {},
    path: '/home-screen',
    params: {},
  };

  const next = vi.fn();

  const from: any = {};

  beforeEach(() => {
    localStorage.clear();
  });

  test('should block if not authenticated', async () => {
    await isAuthtenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith({
      name: 'login',
    });
  });

  test('should called localstorage set item lastPath', async () => {
    await isAuthtenticatedGuard(to, from, next);

    const lastPath = localStorage.getItem('lastPath');

    expect(lastPath).toBe(to.path);
  });

  test('should block if not authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    await isAuthtenticatedGuard(to, from, next);

    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });

  test('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123456');
    await isAuthtenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });
});

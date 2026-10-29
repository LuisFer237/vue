import type { NavigationGuardNext, RouteRecordNormalized } from 'vue-router';

const isAuthtenticatedGuard = (
  to: RouteRecordNormalized,
  from: RouteRecordNormalized,
  next: NavigationGuardNext,
) => {
  const userId = localStorage.getItem('userId');
  localStorage.setItem('lastPath', to.path);

  if (!userId) {
    return next({
      name: 'login',
    });
  }

  return next();
};

export default isAuthtenticatedGuard;

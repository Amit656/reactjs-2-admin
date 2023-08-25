import { useAuthStore } from '~~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  if (!localStorage.getItem('token')) {
    return navigateTo('/account/login');
  }
  const auth = await useAuthStore();
  if (auth.permissions.length === 0) {
    await auth.myPermissions();
  }
  await auth.canAccess();
  const userPermissions = auth.$state.permissions;
  if (to.meta.alias) {
    const requiredPermission = to.meta.alias.replace('/', '');
    if (requiredPermission && !userPermissions[0].includes(requiredPermission)) {
      return navigateTo('/');
    }
  }
});

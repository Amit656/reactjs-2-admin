export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    if (!localStorage.getItem('token')) {
      return navigateTo('/account/login');
    }
  }
  return true;
});

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'default_api_url',
      threeplBase: process.env.THREEPL_BASE || '3PL_BASE',
      warehouseBase: process.env.WH_API_BASE || 'default_other_url',
    },
  },
  ssr: false,
  css: ['~/assets/css/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";',
        },
      },
    },
  },
});

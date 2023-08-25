<template>
  <AtomsAlert
    v-if="textVisible"
    type="success"
    :message="res"
  />
  <div class="text-center bottom-3">
    <h2>{{ $t('home.welcome_text') }}</h2>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: ['permission'],
  alias: '/',
});
const auth = useAuthStore();
await auth.getUser();
const textVisible = ref(false);
let res = reactive('');

res = auth.message;
if (res !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    auth.message = null;
  }, 3000);
}
</script>

<style scoped />

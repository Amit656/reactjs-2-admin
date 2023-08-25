<template>
  <AtomsLoader v-if="auth.isLoading" />
  <div
    class="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12"
  >
    <MoleculesLocale />
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <AtomsImage
        class="mx-auto h-12 w-auto"
        src="/logo-180x180.png"
        alt="Stallion Warehouse Admin"
      />
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="login()"
        >
          <div>
            <AtomsText
              class="block text-sm font-semibold leading-6 text-gray-900"
              tag="label"
              :content="$t('common.email_label')"
            />
            <div class="mt-2">
              <AtomsInput
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                autocomplete="email"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full
                 px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400
                  focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                @blur="v$.email.$touch"
              />
            </div>
            <span
              v-if="v$.email.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.email_required') }}
            </span>
          </div>

          <div>
            <AtomsText
              for="password"
              class="block text-sm font-semibold leading-6 text-gray-900"
              tag="label"
              :content="$t('common.label_password')"
            />
            <div class="mt-2">
              <AtomsInput
                id="password"
                v-model="formData.password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block
                 w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400
                  focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                @blur="v$.password.$touch"
              />
            </div>
            <span
              v-if="v$.password.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.password_required') }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >{{ $t('login.forgot_password') }}</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3
              text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-indigo-600"
            >
              {{ $t('login.sign_in') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  required, email, helpers, minLength,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: ['auth'],
});
const formData = reactive({
  email: '',
  password: '',
});
const rules = computed(() => ({
  email: {
    minLength: minLength(6),
    required: helpers.withMessage('The email field is required', required),
    email: helpers.withMessage('Invalid email format', email),
  },
  password: {
    required: helpers.withMessage('The password field is required', required),
  },
}));
const v$ = useVuelidate(rules, formData);

definePageMeta({
  layout: '',
});
const auth = useAuthStore();
async function login() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await auth.userLogin(formData);
    navigateTo('/');
  }
}
</script>

<style lang="scss" scoped></style>

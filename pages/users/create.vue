<template>
  <AtomsLoader v-if="user.isLoading" />
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="saveUser()"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('user.user_information_text') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-4">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('user.label_user_name') }}<span class="text-red-600"> * </span>
            </label>

            <div class="mt-2">
              <AtomsInput
                id="name"
                v-model="formData.name"
                type="text"
                name="name"
                autocomplete="name"
                class="block w-full rounded-md border-0 py-1.5
              text-gray-900 shadow-sm ring-1 ring-inset
              ring-gray-300 placeholder:text-gray-400 focus:ring-2
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.name.$touch"
              />
            </div>
            <div v-if="v$.name.$error">
              <span
                v-if="v$.name.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.username_requird') }} </span>
              <span
                v-else-if="v$.name.minLength.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.field_atleast_1_characters') }} </span>
              <span
                v-else-if="v$.name.maxLength.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.field_atleast_50_characters') }} </span>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('common.email_label') }}<span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
               ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.email.$touch"
              >
            </div>
            <div v-if="v$.email.$error">
              <span
                v-if="v$.email.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.email_required') }} </span>
              <span
                v-else-if="v$.email.minLength.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.field_atleast_6_characters') }} </span>
              <span
                v-else-if="v$.email.email.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.invalid_email') }} </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-4">
          <div class="sm:col-span-2">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('common.label_password') }} <span class="text-red-600"> * </span></label>
            <div class="mt-2">
              <input
                id="password"
                v-model="formData.password"
                name="password"
                type="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
               ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.password.$touch"
              >
            </div>
            <div v-if="v$.password.$error">
              <span
                v-if="v$.password.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.password_required') }} </span>
              <span
                v-else-if="v$.password.minLength.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.password_atleast_8_characters') }} </span>
              <span
                v-else-if="v$.password.containsPasswordRequirement.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.password_combination_required') }} </span>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="password_confirmation"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('common.label_confirm_password') }} <span class="text-red-600"> * </span></label>
            <div class="mt-2">
              <input
                id="password_confirmation"
                v-model="formData.password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="password_confirmation"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.password_confirmation.$touch"
              >
            </div>
            <div v-if="v$.password_confirmation.$error">
              <span
                v-if="v$.password_confirmation.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.confirm_password_required') }} </span>
              <span
                v-else-if="v$.password_confirmation.sameAsPassword.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.confirm_password_same') }} </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-4">
          <div class="sm:col-span-2">
            <label
              for="role"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('user.label_select_role') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <select
                id="role"
                v-model="formData.role"
                name="role"
                autocomplete="role"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
           ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
            sm:text-sm sm:leading-6"
                @blur="v$.role.$touch"
              >
                <option
                  v-for="(role, index) in rolesData"
                  :key="index"
                  :value="role.name"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
            <span
              v-if="v$.role.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.role_selected') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <NuxtLink
          type="button"
          to="/users"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
          text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2"
        >
          {{ $t('common.cancel_btn') }}
        </NuxtLink>
        <AtomsButton
          type="submit"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
          text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2"
          :button-text="$t('common.save_btn')"
        />
      </div>
    </div>
  </form>
</template>

<script setup>
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  sameAs,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { userStore } from '@/stores/user';

definePageMeta({
  middleware: ['permission'],
  alias: `/${ADD_USER}`,
});
const formData = reactive({
  name: ref(''),
  email: ref(''),
  role: ref(''),
  password: ref(''),
  password_confirmation: ref(''),
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage(
      'The user name field is required',
      required,
    ),
    minLength: minLength(1),
    maxLength: maxLength(50),
  },
  role: {
    required: helpers.withMessage('The role must be selected ', required),
  },
  email: {
    minLength: minLength(6),
    maxLength: maxLength(255),
    required: helpers.withMessage('The email field is required', required),
    email: helpers.withMessage('Invalid email format', email),
  },
  password: {
    required: helpers.withMessage('The password field is required', required),
    minLength: minLength(8),
    containsPasswordRequirement: helpers.withMessage(
      () => 'The password requires an uppercase, lowercase, number and special character',
      (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
    ),
  },
  password_confirmation: {
    required: helpers.withMessage('The confirm password field is required', required),
    sameAsPassword: sameAs(formData.password),
  },
}));
const v$ = useVuelidate(rules, formData);
const user = userStore();

await user.getAllRoles();
const rolesData = ref({});
rolesData.value = user.rolesData;

async function saveUser() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await user.saveUser(formData);
  }
}

</script>

<style scoped>
.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline: none;
}
</style>

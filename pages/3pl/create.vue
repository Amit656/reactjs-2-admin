<template>
  <AtomsLoader v-if="threePL.isLoading" />
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="save3pl()"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('threepl.personal_information_heading') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="full_name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_full_name') }}<span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="full_name"
                v-model="formData.full_name"
                type="text"
                name="full_name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.full_name.$touch"
              >
            </div>
            <div v-if="v$.full_name.$error">
              <span
                v-if="v$.full_name.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.full_name_required') }} </span>
              <span
                v-else-if="v$.full_name.min.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.field_atleast_6_characters') }} </span>
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
                v-else-if="v$.password.contains.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.password_combination_required') }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('threepl.address_information_heading') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_street_address') }}</label>
            <div class="mt-2">
              <input
                id="street-address"
                v-model="formData.address"
                type="text"
                name="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.address.$touch"
              >
            </div>
            <span
              v-if="v$.address.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ v$.address.$errors[0].$message }}
            </span>
          </div>

          <div class="sm:col-span-3">
            <label
              for="country"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_country') }}<span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <select
                id="country"
                v-model="formData.country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                  sm:text-sm sm:leading-6"
                @blur="v$.country.$touch"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
            <span
              v-if="v$.country.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.country_required') }}
            </span>
          </div>
          <div class="sm:col-span-2">
            <label
              for="city"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('common.table_col_city') }} / {{ $t('threepl.label_province') }}</label>
            <div class="mt-2">
              <input
                id="city"
                v-model="formData.city"
                type="text"
                name="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.city.$touch"
              >
            </div>
            <span
              v-if="v$.city.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ v$.city.$errors[0].$message }}
            </span>
          </div>

          <div class="sm:col-span-2">
            <label
              for="region"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_state') }} / {{ $t('threepl.label_province') }}</label>
            <div class="mt-2">
              <input
                id="region"
                v-model="formData.state"
                type="text"
                name="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.state.$touch"
              >
            </div>
            <span
              v-if="v$.state.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ v$.state.$errors[0].$message }}
            </span>
          </div>

          <div class="sm:col-span-2">
            <label
              for="postal-code"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_zip') }} / {{ $t('threepl.label_postal_code') }}</label>
            <div class="mt-2">
              <input
                id="postal-code"
                v-model="formData.zip"
                type="text"
                name="postal-code"
                maxlength="6"
                autocomplete="postal-code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.zip.$touch"
              >
            </div>
            <span
              v-if="v$.zip.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.zipcode_6_digit_only') }}
            </span>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('threepl.payment_information_heading') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="card"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_card_number') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="card"
                v-model="formData.card_number"
                type="text"
                name="card"
                maxlength="16"
                autocomplete="card"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.card_number.$touch"
              >
            </div>
            <div v-if="v$.card_number.$error">
              <span
                v-if="v$.card_number.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.card_number_required') }} </span>
              <span
                v-if="v$.card_number.contains.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.cardnumber_16_digit_only') }} </span>
            </div>
          </div>

          <div class="sm:col-span-1">
            <label
              for="cvv"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_cvv') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="cvv"
                v-model="formData.cvv"
                type="text"
                name="cvv"
                maxlength="3"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.cvv.$touch"
              >
            </div>
            <div v-if="v$.cvv.$error">
              <span
                v-if="v$.cvv.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.cvv_required') }} </span>
              <span
                v-if="v$.cvv.contains.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.cvv_3_digit_only') }} </span>
            </div>
          </div>

          <div class="sm:col-span-1">
            <label
              for="month"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_expiry_month') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <select
                id="expiry_month"
                v-model="formData.expiry_month"
                name="expiry_month"
                autocomplete="expiry_month"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                  sm:text-sm sm:leading-6"
                @blur="v$.expiry_month.$touch"
              >
                <option
                  v-for="(month, index) in MONTHS"
                  :key="index"
                  :value="index"
                >
                  {{ month }}
                </option>
              </select>
            </div>
            <span
              v-if="v$.expiry_month.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.month_required') }}
            </span>
          </div>

          <div class="sm:col-span-1">
            <label
              for="year"
              class="block text-sm font-medium leading-6 text-gray-900"
            >{{ $t('threepl.label_expiry_year') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <select
                id="expiry_year"
                v-model="formData.expiry_year"
                name="expiry_year"
                autocomplete="expiry_year"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.expiry_year.$touch"
              >
                <option
                  v-for="(year, index) in getNextTenYears()"
                  :key="index"
                  :value="year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
            <span
              v-if="v$.expiry_year.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.year_required') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <NuxtLink
          type="button"
          to="/3pl"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
            text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2"
        >
          {{ $t('common.cancel_btn') }}
        </NuxtLink>
        <button
          type="submit"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
           text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2"
        >
          {{ $t('common.save_btn') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { threePLStore } from '@/stores/3pl';
import validators from '@/plugins/validations';

definePageMeta({
  middleware: ['permission'],
  alias: `/${ADD_3PL}`,
});
const formData = reactive({
  full_name: ref(''),
  email: ref(''),
  password: ref(''),
  address: ref(''),
  country: ref(''),
  city: ref(''),
  state: ref(''),
  zip: ref(''),
  card_number: ref(''),
  cvv: ref(''),
  expiry_year: ref(''),
  expiry_month: ref(''),
});

const rules = computed(() => ({
  full_name: {
    required: validators.full_nameRequired,
    min: validators.minLength,
  },
  email: {
    required: validators.emailRequired,
    minLength: validators.minLength,
    email: validators.email,
  },
  password: {
    required: validators.passwordRequired,
    minLength: validators.passMinLength,
    contains: validators.passwordRequirement,
  },
  address: { maxLength: validators.addressMaxLength },
  country: { required: validators.countryRequired },
  city: { maxLength: validators.maxLength },
  state: { maxLength: validators.maxLength },
  zip: { containszipRequirement: validators.zipcode },
  card_number: {
    required: validators.cardNumberRequired,
    contains: validators.cardNumberRequirement,
  },
  cvv: {
    required: validators.cvvRequired,
    contains: validators.cvvRequirement,
  },
  expiry_month: { required: validators.expMonthRequired },
  expiry_year: { required: validators.expYearRequired },
}));
const v$ = useVuelidate(rules, formData);

const threePL = threePLStore();
async function save3pl() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await threePL.save3pl(formData);
  }
}
</script>

<style scoped>
</style>

<template>
  <AtomsLoader v-if="warehouse.isLoading" />
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="save()"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('warehouse.label_warehouse') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("common.label_name") }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="name"
                v-model="warehouseData.name"
                type="text"
                name="name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.name.$touch"
              >
            </div>
            <div
              v-if="v$.name.$error"
              class="text-sm font-medium text-red-600"
            >
              <span v-if="v$.name.required.$invalid">{{ $t('error.warehouseReq') }}</span>
              <span v-else-if="v$.name.min.$invalid">{{ $t('error.warehouseMin') }}</span>
            </div>
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
        <div class="sm:col-span-1">
          <label
            for="latitude"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t("common.label_lat") }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="latitude"
              v-model="warehouseData.latitude"
              name="latitude"
              type="text"
              autocomplete="latitude"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.latitude.$touch"
            >
          </div>
          <div
            v-if="v$.latitude.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.latitude.required.$invalid">{{ $t('error.latitude') }}</span>
            <span v-else-if="v$.latitude.contains.$invalid">{{ $t('error.latCont') }}</span>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label
            for="longitude"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t("common.label_long") }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="longitude"
              v-model="warehouseData.longitude"
              name="longitude"
              type="text"
              autocomplete="longitude"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.longitude.$touch"
            >
          </div>
          <div
            v-if="v$.longitude.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.longitude.required.$invalid">{{ $t('error.longitude') }}</span>
            <span v-else-if="v$.longitude.contains.$invalid">{{ $t('error.longCont') }}</span>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label
            for="country"
            class="block text-sm font-medium leading-6 text-gray-900"
          >{{ $t('common.label_country') }}<span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <select
              id="country"
              v-model="warehouseData.country"
              name="country"
              autocomplete="country-name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                sm:text-sm sm:leading-6"
              @blur="v$.country.$touch"
            >
              <option value="1">
                United States
              </option>
              <option value="2">
                Canada
              </option>
              <option value="3">
                Mexico
              </option>
            </select>
          </div>
          <span
            v-if="v$.country.$error"
            class="text-sm font-medium text-red-600"
          >
            {{ $t('error.country_required') }}
          </span>
        </div>
        <div class="sm:col-span-1">
          <label
            for="province"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('common.label_province') }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="province"
              v-model="warehouseData.province"
              name="province"
              type="text"
              autocomplete="province"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.province.$touch"
            >
          </div>
          <div
            v-if="v$.province.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.province.required.$invalid">{{ $t('error.province') }}</span>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label
            for="city"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('common.label_city') }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="city"
              v-model="warehouseData.city"
              name="city"
              type="text"
              autocomplete="city"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.city.$touch"
            >
          </div>
          <div
            v-if="v$.city.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.city.required.$invalid">{{ $t('error.city') }}</span>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="address"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('common.label_address') }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="address"
              v-model="warehouseData.address"
              name="address"
              type="text"
              autocomplete="address"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.address.$touch"
            >
          </div>
          <div
            v-if="v$.address.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.address.required.$invalid">{{ $t('error.address') }}</span>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label
            for="pin_code"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('common.label_pincode') }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="pin_code"
              v-model="warehouseData.pin_code"
              name="pin_code"
              type="text"
              autocomplete="pin_code"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.pin_code.$touch"
            >
          </div>
          <div
            v-if="v$.pin_code.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.pin_code.required.$invalid">{{ $t('error.zipreq') }}</span>
            <span v-else-if="v$.pin_code.contains.$invalid">
              {{ $t('error.zipcode_6_digit_only') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-8">
      <div>
        <h3 class="text-xl font-semibold leading-6 text-gray-900">
          {{ $t('warehouse.label_threshold') }}
        </h3>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-1">
          <label
            for="three_pl_customers"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('warehouse.label_3pl') }} <span class="text-red-600"> * </span>
          </label>
          <div class="mt-2">
            <input
              id="three_pl_customers"
              v-model="warehouseData.threshold_settings.three_pl_customers"
              name="three_pl_customers"
              type="number"
              min="0"
              autocomplete="three_pl_customers"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.threshold_settings.three_pl_customers.$touch"
            >
          </div>
          <div
            v-if="v$.threshold_settings.three_pl_customers.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.threshold_settings.three_pl_customers.$invalid">
              {{ $t('error.3PLReq') }}
            </span>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label
            for="numberOfSku"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('warehouse.label_sku') }} <span class="text-red-600"> * </span></label>
          <div class="mt-2">
            <input
              id="numberOfSku"
              v-model="warehouseData.threshold_settings.sku"
              name="numberOfSku"
              type="number"
              min="0"
              autocomplete="numberOfSku"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.threshold_settings.sku.$touch"
            >
          </div>
          <div
            v-if="v$.threshold_settings.sku.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.threshold_settings.sku.$invalid">{{ $t('error.SKUReq') }}</span>
          </div>
        </div>

        <div class="sm:col-span-1">
          <label
            for="numberOfOrder"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('warehouse.label_order') }} <span class="text-red-600"> * </span></label>
          <div class="mt-2">
            <input
              id="numberOfOrder"
              v-model="warehouseData.threshold_settings.orders"
              name="numberOfOrder"
              type="number"
              min="0"
              autocomplete="numberOfOrder"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.threshold_settings.orders.$touch"
            >
          </div>
          <div
            v-if="v$.threshold_settings.orders.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.threshold_settings.orders.$invalid">{{ $t('error.OrderReq') }}</span>
          </div>
        </div>

        <div class="sm:col-span-1">
          <label
            for="numberOfStore"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t('warehouse.label_store') }} <span class="text-red-600"> * </span></label>
          <div class="mt-2">
            <input
              id="numberOfStore"
              v-model="warehouseData.threshold_settings.stores"
              name="numberOfStore"
              type="number"
              min="0"
              autocomplete="numberOfStore"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.threshold_settings.stores.$touch"
            >
          </div>
          <div
            v-if="v$.threshold_settings.stores.$error"
            class="text-sm font-medium text-red-600"
          >
            <span v-if="v$.threshold_settings.stores.$invalid">{{ $t('error.StoreReq') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <NuxtLink
          type="button"
          :to="`/3pl/warehouse/${id}`"
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
import { warehouseStore } from '@/stores/warehouse';
import validators from '@/plugins/validations';

definePageMeta({
  middleware: ['permission'],
});
const warehouse = warehouseStore();
const { id, wid } = useRoute().params;

await warehouse.getWarehouseData(id, wid);
const warehouseData = warehouse.warehouseData.data;

const rules = computed(() => ({
  name: {
    required: validators.whNameReq,
    min: validators.minLength,
  },
  latitude: {
    required: validators.whNameReq,
    contains: validators.latCont,
  },
  longitude: {
    required: validators.whNameReq,
    contains: validators.longCont,
  },
  country: { required: validators.whNameReq },
  province: { required: validators.whNameReq },
  city: { required: validators.whNameReq },
  address: { required: validators.whNameReq },
  pin_code: {
    required: validators.zipreq,
    contains: validators.zipcode,
  },
  threshold_settings: {
    three_pl_customers: { required: validators.wh3PLReq },
    sku: { required: validators.whSKUReq },
    orders: { required: validators.whOrderReq },
    stores: { required: validators.whStoreReq },
  },
}));
const v$ = useVuelidate(rules, warehouseData);
async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await warehouse.updateWarehouse(id, wid, warehouseData);
  }
}
</script>

<style lang="scss" scoped>

</style>

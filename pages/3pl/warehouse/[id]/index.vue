<template>
  <div>
    <AtomsAlert
      v-if="textVisible"
      :type="resType"
      :message="res"
    />
  </div>
  <AtomsLoader v-if="warehouse.isLoading" />
  <div
    class="border-b border-gray-200 px-4
    py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('warehouse.label') }}
      </h1>
      <p class="mt-2 text-sm text-gray-700">
        {{ $t('warehouse.caption') }}
      </p>
    </div>

    <div
      class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
    >
      <div class="w-full max-w-lg lg:max-w-xs">
        <label
          for="search"
          class="sr-only"
        >Search</label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            v-model="search"
            name="search"
            class="block w-full rounded-md border-0  bg-white py-1.5
            pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
            focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            :placeholder="$t('warehouse.search_warehouse')"
            type="search"
            @input="searchWarehouse"
          >
        </div>
      </div>
    </div>
    <div
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <NuxtLink
        :to="`/3pl/warehouse/${id}/create`"
        class="block app-button border-2 rounded-md py-2 px-3 text-center
         text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ $t('warehouse.btn_add') }}
      </NuxtLink>
    </div>
  </div>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('common.label_name') }}
                  </th>
                  <th
                    scope="col"
                    class="w-12 py-3.5 pl-3 pr-4 text-left text-sm
                    font-semibold text-gray-900 sm:pr-6 lg:pr-8"
                  >
                    {{ $t('common.table_col_action') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="wh in warehouseData.data"
                  :key="wh.hash"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm
                    font-medium text-gray-900 sm:pl-6"
                  >
                    {{ wh.name }}
                  </td>
                  <td
                    class="w-12 relative whitespace-nowrap py-4 pr-4 pl-3
                    text-right text-sm font-medium sm:pr-8 lg:pr-8"
                  >
                    <NuxtLink
                      :to="`/3pl/warehouse/${id}/${wh.hash}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="warehouseData.total === 0"
                >
                  <td
                    class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 col-span-6"
                  >
                    {{ $t('common.no_data_found') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <MoleculesPagination
              v-if="warehouseData.total !== 0"
              v-model="currentPage"
              :current-page="currentPage"
              :total-data="totalData"
              :links="pageLinks"
              @change="refetch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PencilIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import { warehouseStore } from '@/stores/warehouse';

definePageMeta({
  middleware: ['permission'],
});
const warehouse = warehouseStore();
const { id } = useRoute().params;

const warehouseData = ref({});
await warehouse.getWarehouse(id);
warehouseData.value = warehouse.warehouseData;

const search = ref('');
const pageLinks = ref(warehouseData.value.links);
const currentPage = ref(warehouse.warehouseData.current_page);
const totalData = ref(warehouse.warehouseData.total);

async function refetch(pageUrl) {
  await warehouse.getPaginatedData(pageUrl);
  warehouseData.value = warehouse.warehouseData;
  pageLinks.value = warehouseData.value.links;
  currentPage.value = warehouse.warehouseData.current_page;
}

const searchWarehouse = debounce(async () => {
  await warehouse.getWarehouse(id, currentPage.value, search.value);
  warehouseData.value = warehouse.warehouseData;
  pageLinks.value = warehouseData.value.links;
  currentPage.value = warehouse.warehouseData.current_page;
}, DEBOUNCE_TIMEOUT);

let res = ref('');
let resType = ref('');

const textVisible = ref(false);
res = warehouse.message;
resType = warehouse.type;
if (res && res !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    warehouse.message = null;
  }, 3000);
}

</script>

<style lang="scss" scoped>

</style>

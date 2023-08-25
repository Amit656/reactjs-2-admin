<template>
  <div>
    <AtomsConfirm
      v-if="showDelete"
      message="Do you really want to delete this 3PL?"
      @confirm="onDelete"
      @cancel="showDelete = false"
    />
    <AtomsAlert
      v-if="textVisible"
      type="success"
      :message="res"
    />
  </div>
  <AtomsLoader v-if="threePL.isLoading" />
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('threepl_menu') }}
      </h1>
      <p class="mt-2 text-sm text-gray-700">
        {{ $t('threepl.threepl_list_label') }}
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
            class="block w-full rounded-md border-0 bg-white py-1.5
            pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-blue-600 sm:text-sm sm:leading-6"
            :placeholder="$t('threepl.search_threepl_text')"
            type="search"
            @input="search3PL"
          >
        </div>
      </div>
    </div>
    <div
      v-if="auth.canAccess(ADD_3PL)"
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <NuxtLink
        to="/3pl/create"
        class="block app-button border-2 rounded-md py-2 px-3 text-center
         text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ $t('threepl.add_threepl_btn') }}
      </NuxtLink>
    </div>
  </div>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('threepl.table_col_fullname') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('common.table_col_email') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('threepl.table_col_address') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('threepl.table_col_country') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('common.table_col_city') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('threepl.table_col_status') }}
                  </th>
                  <th
                    v-if="auth.canAccess(EDIT_3PL) && auth.canAccess(DELETE_3PL)"
                    scope="col"
                    colspan="3"
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('common.table_col_action') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="threePL in threePLData.data"
                  :key="threePL.email"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900
                    sm:pl-6"
                  >
                    {{ threePL.full_name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ threePL.user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ threePL.address }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ threePL.country }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ threePL.city }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Switch
                      v-model="threePL.status"
                      :class="[
                        threePL.status ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                      ]"
                      @click="changeThreePL(threePL.hash)"
                    >
                      <span class="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        :class="[
                          threePL.status ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        ]"
                      />
                    </Switch>
                  </td>
                  <td
                    class="w-12 relative whitespace-nowrap
                    py-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      :to="`3pl/warehouse/${threePL.hash}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PlusCircleIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    v-if="auth.canAccess(EDIT_3PL)"
                    class="w-12 relative whitespace-nowrap
                    py-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      :to="`/3pl/${threePL.hash}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    v-if="auth.canAccess(DELETE_3PL)"
                    class="w-12 relative whitespace-nowrap py-4
                    text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      class="cursor-pointer text-indigo-600 hover:text-indigo-900"
                      @click="showDelete = true, itemToDelete = threePL.hash"
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="threePLData.length === 0 || threePLData.data == ''"
                >
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 col-span-6">
                    {{ $t('common.no_data_found') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <MoleculesPagination
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
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import { Switch } from '@headlessui/vue';
import { threePLStore } from '../../stores/3pl';
import { useAuthStore } from '../../stores/auth';

definePageMeta({
  middleware: ['permission'],
  alias: `/${LIST_3PL}`,
});
const auth = useAuthStore();
if (auth.permissions.length === 0) {
  await auth.myPermissions();
}
const threePL = threePLStore();
const threePLData = ref({});
await threePL.getThreePL();
threePLData.value = threePL.threePLData;

const search = ref('');
const pageLinks = ref(threePLData.value.links);
const currentPage = ref(threePL.threePLData.current_page);
const totalData = ref(threePL.threePLData.total);

async function refetch(pageUrl) {
  await threePL.getPaginatedData(pageUrl);
  threePLData.value = threePL.threePLData;
  pageLinks.value = threePLData.value.links;
  currentPage.value = threePL.threePLData.current_page;
}

const search3PL = debounce(async () => {
  await threePL.getThreePL(currentPage.value, search.value);
  threePLData.value = threePL.threePLData;
  pageLinks.value = threePLData.value.links;
  currentPage.value = threePL.threePLData.current_page;
}, DEBOUNCE_TIMEOUT);

const textVisible = ref(false);
let res = ref('');
res = threePL.message;
if (res !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    threePL.message = null;
  }, 3000);
}
async function changeThreePL(refId) {
  res = await threePL.changeStatus(refId);
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}
res = threePL.message;

const showDelete = ref(false);
const itemToDelete = ref('');
async function onDelete() {
  textVisible.value = true;
  res = await threePL.deleteThreePL(itemToDelete.value);
  showDelete.value = false;
  await threePL.getThreePL();
  threePLData.value = threePL.threePLData;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}
</script>

<style lang="scss">
</style>

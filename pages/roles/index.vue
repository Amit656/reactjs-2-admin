<template>
  <div>
    <AtomsConfirm
      v-if="showDelete"
      message="Do you really want to delete this Role?"
      @confirm="onDelete"
      @cancel="showDelete = false"
    />
    <AtomsAlert
      v-if="textVisible"
      type="success"
      :message="res"
    />
  </div>
  <AtomsLoader v-if="role.isLoading" />
  <div
    class="border-b border-gray-200 px-4
    py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('role.roles_heading') }}
      </h1>
      <p class="mt-2 text-sm text-gray-700">
        {{ $t('role.roles_list_label') }}
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
            :placeholder="$t('role.search_role_text')"
            type="search"
            @input="searchRole"
          >
        </div>
      </div>
    </div>
    <div
      v-if="auth.canAccess(ADD_ROLE)"
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <NuxtLink
        to="/roles/create"
        class="block app-button border-2 rounded-md
        py-2 px-3 text-center text-sm font-semibold
        shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-indigo-600"
      >
        {{ $t('role.add_role_btn') }}
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
                    {{ $t('role.roles_heading') }}
                  </th>
                  <th
                    v-if="auth.canAccess(EDIT_ROLE) && auth.canAccess(DELETE_ROLE)"
                    scope="col"
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('common.table_col_action') }}
                  </th>
                  <th
                    scope="col"
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="rolesDetail in rolesData.data"
                  :key="rolesDetail.ulid"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm
                    font-medium text-gray-900 sm:pl-6"
                  >
                    {{ rolesDetail.name }}
                  </td>
                  <td
                    v-if="auth.canAccess(EDIT_ROLE)"
                    class="w-12 relative whitespace-nowrap py-4
                    text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      :to="`/roles/${rolesDetail.ulid}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    v-if="auth.canAccess(DELETE_ROLE)"
                    class="w-12 relative whitespace-nowrap
                    py-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="showDelete = true, itemToDelete = rolesDetail.ulid"
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="rolesData.data.length === 0"
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
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import { useAuthStore } from '@/stores/auth';
import { roleStore } from '@/stores/role';

const role = roleStore();
await role.getAllRoles();

definePageMeta({
  middleware: ['permission'],
  alias: `/${LIST_ROLE}`,
});

const auth = await useAuthStore();
if (auth.permissions.length === 0) {
  await auth.myPermissions();
}

const rolesData = ref({});
rolesData.value = role.rolesData;
const pageLinks = ref(rolesData.value.links);
const currentPage = ref(role.rolesData.current_page);
const totalData = ref(role.rolesData.total);

async function refetch(pageUrl) {
  await role.getPaginatedData(pageUrl);
  rolesData.value = role.rolesData;
  pageLinks.value = rolesData.value.links;
  currentPage.value = role.rolesData.current_page;
}

const search = ref('');
const searchRole = debounce(async () => {
  await role.getAllRoles(currentPage.value, search.value);
  rolesData.value = role.rolesData;
  pageLinks.value = rolesData.value.links;
  currentPage.value = role.rolesData.current_page;
}, DEBOUNCE_TIMEOUT);

const textVisible = ref(false);
let res = reactive('');
res = role.message;
if (res && res !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    role.message = null;
  }, 3000);
}

const showDelete = ref(false);
const itemToDelete = ref('');
async function onDelete() {
  textVisible.value = true;
  res = await role.deleteRole(itemToDelete.value);
  showDelete.value = false;
  await role.getAllRoles();
  rolesData.value = role.rolesData;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}
</script>

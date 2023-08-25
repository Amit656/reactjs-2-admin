<template>
  <div>
    <AtomsConfirm
      v-if="showDelete"
      message="Do you really want to delete this User?"
      @confirm="onDelete"
      @cancel="showDelete = false"
    />
    <AtomsAlert
      v-if="textVisible"
      type="success"
      :message="res"
    />
  </div>
  <AtomsLoader v-if="user.isLoading" />
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex
    sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t("users_menu") }}
      </h1>
      <p class="mt-2 text-sm text-gray-700">
        {{ $t("user.users_list_label") }}
      </p>
    </div>

    <div
      class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
    >
      <div
        class="flex flex-1 items-center justify-center px-2"
      >
        <div>
          <select
            id="roleFilter"
            v-model="selectedRole"
            name="roleFilter"
            autocomplete="roleFilter"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
              ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
              sm:text-sm sm:leading-6"
            @change="onRoleChange()"
          >
            <option
              value=""
            >
              {{ $t('user.filter_role') }}
            </option>
            <option
              v-for="rolesDetail in rolesData"
              :key="rolesDetail.ulid"
              :value="rolesDetail.ulid"
            >
              {{ rolesDetail.name }}
            </option>
          </select>
        </div>
      </div>
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
            :placeholder="$t('user.search_user_text')"
            type="search"
            @input="searchUser"
          >
        </div>
      </div>
    </div>
    <div
      v-if="auth.canAccess(ADD_USER)"
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <NuxtLink
        to="/users/create"
        class="block app-button border-2 rounded-md
        py-2 px-3 text-center text-sm font-semibold
        shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-indigo-600"
      >
        {{ $t("user.add_user_btn") }}
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
                    {{ $t('users_menu') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('common.table_col_email') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('user.table_col_role') }}
                  </th>
                  <th
                    v-if="auth.canAccess(EDIT_USER) && auth.canAccess(DELETE_USER)"
                    scope="col"
                    class="w-12 py-3.5 pl-4 pr-3 text-left
                    text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('common.table_col_action') }}
                  </th>
                  <th
                    scope="col"
                    class="w-12 py-3.5 pl-4 pr-3 text-left
                    text-sm font-semibold text-gray-900 sm:pl-6"
                  />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="usersDetail in usersData.data"
                  :key="usersDetail.ulid"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3
                    text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ usersDetail.name }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3
                    text-sm text-gray-900 sm:pl-6"
                  >
                    {{ usersDetail.email }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3
                    text-sm text-gray-900 sm:pl-6"
                  >
                    {{ usersDetail.role }}
                  </td>
                  <td
                    v-if="auth.canAccess(EDIT_USER)"
                    class="w-12 relative whitespace-nowrap
                      py-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      :to="`/users/${usersDetail.ulid}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    v-if="auth.canAccess(DELETE_USER)"
                    class="w-12 relative whitespace-nowrap
                      py-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <NuxtLink
                      to=""
                      class="text-indigo-600 hover:text-indigo-900
                      cursor-pointer"
                      @click="showDelete = true, itemToDelete = usersDetail.ulid"
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="usersData.data.length === 0"
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
import { userStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: ['permission'],
  alias: `/${LIST_USER}`,
});

const auth = await useAuthStore();
if (auth.permissions.length === 0) {
  await auth.myPermissions();
}

const user = userStore();

await user.getAllRoles();
const rolesData = ref({});
rolesData.value = user.rolesData;
await user.getAllUsers();
const usersData = ref({});
usersData.value = user.usersData;
const pageLinks = ref(usersData.value.links);
const currentPage = ref(user.usersData.current_page);
const totalData = ref(user.usersData.total);

async function refetch(pageUrl) {
  await user.getPaginatedData(pageUrl);
  usersData.value = user.usersData;
  pageLinks.value = usersData.value.links;
  currentPage.value = user.usersData.current_page;
}

const search = ref('');
const searchUser = debounce(async () => {
  await user.getAllUsers(currentPage.value, search.value);
  usersData.value = user.usersData;
  pageLinks.value = usersData.value.links;
  currentPage.value = user.usersData.current_page;
}, DEBOUNCE_TIMEOUT);

const selectedRole = ref('');
async function onRoleChange() {
  await user.getAllUsers('', '', selectedRole.value);
  usersData.value = user.usersData;
}

const textVisible = ref(false);
let res = reactive('');
res = user.message;
if (res && res !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    user.message = null;
  }, 3000);
}

const showDelete = ref(false);
const itemToDelete = ref('');
async function onDelete() {
  textVisible.value = true;
  res = await user.deleteUser(itemToDelete.value);
  showDelete.value = false;
  await user.getAllUsers();
  usersData.value = user.usersData;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}
</script>

<style scoped>
select option:first-child{
  color:#acb8cf;
}
</style>

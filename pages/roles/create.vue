<template>
  <AtomsLoader v-if="role.isLoading" />
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="saveRole()"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <h3 class="text-xl font-semibold leading-6 text-gray-900">
          {{ $t('role.roles_information_text') }}
        </h3>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >{{ $t('role.role_name') }} <span class="text-red-600"> * </span>
          </label>

          <div class="mt-2">
            <AtomsInput
              id="name"
              v-model="formData.name"
              type="text"
              name="name"
              maxlength="20"
              autocomplete="given-name"
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
            > {{ $t('error.role_required') }} </span>
            <span
              v-else-if="v$.name.minLen.$invalid"
              class="text-sm font-medium text-red-600"
            > {{ $t('error.field_atleast_3_characters') }} </span>
            <span
              v-else-if="v$.name.maxLen.$invalid"
              class="text-sm font-medium text-red-600"
            > {{ $t('error.field_atleast_20_characters') }} </span>
          </div>
        </div>
      </div>

      <table
        v-for="(rolesDetail, index) in rolesData"
        v-if="auth.canAccess(LIST_PERMISSION)"
        :key="index"
        class="border-collapse border min-w-full"
      >
        <thead>
          <tr class="divide-x divide-gray-200">
            <th
              class="border py-3.5 pl-4 pr-4 text-left
              text-sm font-semibold cursor-pointer"
              @click="rolesDetail.isShow = !rolesDetail.isShow"
            >
              <div class="flex">
                <svg
                  v-if="rolesDetail.isShow"
                  width="16px"
                  height="16px"
                  viewBox="0 0 1024 1024"
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                    fill="#000000"
                  />
                </svg>
                <svg
                  v-else
                  width="16"
                  height="16px"
                  viewBox="0 0 1024 1024"
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z"
                    fill="#000000"
                  />
                </svg>
                <span class="pl-2"> {{ rolesDetail.name }}</span>
              </div>
            </th>
            <th
              v-for="(permission, perIndex) in rolesDetail.permissions"
              :key="perIndex"
              class="border py-3.5 pl-4 text-left text-sm font-normal"
            >
              <input
                :id="permission.name"
                v-model="formData.assigned_permissions"
                type="checkbox"
                :name="permission.name"
                :value="permission.name"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                @change="v$.assigned_permissions.$touch"
              >
              <label
                class="pl-1"
                :for="permission.name"
              >
                {{
                  (permission.name == "List Permission") ?
                    "List Permission" :
                    permission.name.split(' ')[0]
                }}
              </label>
            </th>
          </tr>
        </thead>
        <tbody v-if="!rolesDetail.isShow">
          <tr>
            <td
              class="border border-slate-300
            whitespace-nowrap p-4 text-sm
            text-gray-500"
            >
              {{
                rolesDetail.name
              }}
            </td>
            <td
              v-for="permission in rolesDetail.permissions"
              :key="permission.id"
              class="border border-slate-300
              whitespace-nowrap p-4 text-sm text-gray-500"
            >
              <input
                :id="permission.name"
                v-model="formData.assigned_permissions"
                type="checkbox"
                :name="permission.name"
                :value="permission.name"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                @change="v$.assigned_permissions.$touch"
              >
            </td>
          </tr>
        </tbody>
      </table>
      <span
        v-if="v$.assigned_permissions.$error"
        class="text-sm font-medium text-red-600"
      >
        {{ $t('error.permission_required') }}
      </span>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <NuxtLink
          type="button"
          to="/roles"
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
import { useVuelidate } from '@vuelidate/core';
import { roleStore } from '@/stores/role';
import { useAuthStore } from '@/stores/auth';
import validators from '@/plugins/validations';

definePageMeta({
  middleware: ['permission'],
  alias: `/${ADD_ROLE}`,
});
const auth = useAuthStore();
if (auth.permissions.length === 0) {
  await auth.myPermissions();
}
const formData = reactive({
  name: ref(''),
  assigned_permissions: ref([]),
});

const rules = computed(() => ({
  name: {
    required: validators.roleNameReq,
    minLen: validators.roleMinLen,
    maxLen: validators.roleMaxLen,
  },
  assigned_permissions: {
    required: validators.assignedPerReq,
  },
}));
const v$ = useVuelidate(rules, formData);
const role = roleStore();
await role.getRoles();
const { rolesData } = role;

async function saveRole() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await role.saveRole(formData);
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

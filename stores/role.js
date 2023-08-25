import { defineStore } from 'pinia';
import { apiStore } from './common';

export const roleStore = defineStore('roleStore', {
  state: () => ({
    roles: {},
    isLoading: false,
    message: null,
    apiBase: apiStore(),
  }),
  actions: {
    async getRoles() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('permissions/all');
      this.isLoading = false;
      this.rolesData = response.data;
    },
    async saveRole(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('roles', 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/roles');
    },
    async getAllRoles(page = 1, search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(
        `roles?page=${page}&search=${search}`,
      );
      this.isLoading = false;
      this.rolesData = response.data;
    },
    async deleteRole(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`roles/${id}`, 'DELETE');
      this.isLoading = false;
      return response.metadata.message;
    },
    async getRole(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`roles/${id}`);
      this.isLoading = false;
      this.fetchData = response.data;
    },
    async UpdateRole(id, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`roles/${id}`, 'PUT', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/roles');
    },
    async getPaginatedData(pageUrl) {
      this.isLoading = true;
      const response = await fetch(pageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      this.isLoading = false;
      this.rolesData = data.data;
    },
  },
});

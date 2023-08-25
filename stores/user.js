import { defineStore } from 'pinia';
import { apiStore } from './common';

export const userStore = defineStore('userStore', {
  state: () => ({
    users: {},
    isLoading: false,
    message: null,
    apiBase: apiStore(),
  }),
  actions: {
    async getAllRoles() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('all/roles');
      this.isLoading = false;
      this.rolesData = response.data;
    },
    async saveUser(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('users', 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/users');
    },
    async getAllUsers(page = 1, search = '', role = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`users?page=${page}&search=${search}&role=${role}`);
      this.isLoading = false;
      this.usersData = response.data;
    },
    async deleteUser(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`users/${id}`, 'DELETE');
      this.isLoading = false;
      return response.metadata.message;
    },
    async getUserData(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`users/${id}`);
      this.isLoading = false;
      this.userData = response;
    },
    async updateUser(id, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`users/${id}`, 'PUT', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/users');
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

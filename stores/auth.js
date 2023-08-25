import { defineStore } from 'pinia';
import { apiStore } from './common';

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
    permissions: [],
    user: {},
    isLoading: false,
    isAuthenicated: false,
    message: null,
    apiBase: apiStore(),
  }),
  actions: {
    async userLogin(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('login', 'POST', formData);
      this.isLoading = false;
      if (response.data.token) {
        this.user = response.data.user;
        this.token = response.data.token;
        this.permissions[0] = this.user.permissions;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.user.name);
        this.isloading = false;
        this.isAuthenicated = true;
        this.message = response.metadata.message;
      } else {
        this.isLoading = false;
      }
    },
    async getUser() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('user');
      this.isLoading = false;
      this.user = response.data;
    },
    userLogout() {
      this.token = '';
      this.user = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    async myPermissions() {
      const response = await this.apiBase.makeRequest('my/permissions');
      const permissions = response.data;
      this.permissions.push(permissions);
    },
  },
  getters: {
    canAccess: (state) => (permission) => state.permissions[0].includes(permission),
  },
});

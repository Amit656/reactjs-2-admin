import { defineStore } from 'pinia';
import { threePLAPIStore } from './common';

export const threePLStore = defineStore('threePLStore', {
  state: () => ({
    threePL: {},
    isLoading: false,
    message: null,
    apiBase: threePLAPIStore(),
  }),
  actions: {
    async getThreePL(page = 1, search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(
        `threepl?page=${page}&search=${search}`,
      );
      this.isLoading = false;
      this.threePLData = response.data;
    },
    async changeStatus(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(
        `set-threepl-status/${id}`,
        'PUT',
      );
      this.isLoading = false;
      return response.metadata.message;
    },
    async save3pl(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('threepl', 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/3pl');
    },
    async getThreePLData(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`threepl/${id}`, 'GET');
      this.isLoading = false;
      this.threePLData = response;
    },
    async update3pl(id, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`threepl/${id}`, 'PUT', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/3pl');
    },
    async deleteThreePL(id) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(
        `threepl/${id}`,
        'DELETE',
      );
      this.isLoading = false;
      return response.metadata.message;
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
      this.threePLData = data.data;
    },
  },
});

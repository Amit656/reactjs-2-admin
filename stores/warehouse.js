import { defineStore } from 'pinia';
import { warehouseAPIStore } from './common';

export const warehouseStore = defineStore('warehouseStore', {
  state: () => ({
    warehouse: {},
    isLoading: false,
    message: null,
    apiBase: warehouseAPIStore(),
    type: 'success',

  }),
  actions: {
    async saveWarehouse(id, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`${id}/warehouses`, 'POST', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
      }
      navigateTo(`/3pl/warehouse/${id}`);
    },
    async getWarehouse(id, page = 1, search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`${id}/warehouses?page=${page}&search=${search}`);
      this.isLoading = false;
      this.warehouseData = response.data;
    },
    async getWarehouseData(id, wid) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`${id}/warehouses/${wid}`);
      this.isLoading = false;
      this.warehouseData = response;
    },
    async updateWarehouse(id, wid, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`${id}/warehouses/${wid}`, 'PUT', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
      }
      navigateTo(`/3pl/warehouse/${id}`);
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
      this.warehouseData = data.data;
    },
  },
});

import { defineStore } from 'pinia';

export const apiStore = defineStore({
  id: 'api',
  state: () => ({
    apiUrl: useRuntimeConfig().public.apiBase,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const warehouseAPIStore = defineStore({
  id: 'warehouseAPI',
  state: () => ({
    apiUrl: useRuntimeConfig().public.warehouseBase,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const threePLAPIStore = defineStore({
  id: 'threePLAPI',
  state: () => ({
    apiUrl: useRuntimeConfig().public.threeplBase,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

import { apiRequest } from './client.js';

export const statusApi = {
  listar() {
    return apiRequest('/status');
  },
};

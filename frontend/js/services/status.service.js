import { statusApi } from '../api/status.api.js';

export const statusService = {
  async listar() {
    return statusApi.listar();
  },
};

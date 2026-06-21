// Configuração base da API
export const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Wrapper genérico do fetch.
 * Lança erro com a mensagem retornada pela API quando a resposta não é OK.
 */
export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  // DELETE retorna 204 No Content — sem body
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao comunicar com a API');
  }

  return data;
}

/**
 * if localhost just use the direct path, otherwise use the environment
 * variable or default to /api/resources
 *  */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.endsWith('/api/resources') ? envUrl : `${envUrl.replace(/\/+$/, '')}/api/resources`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://chaosapp.local/api/resources';
    }
  }

  return '/api/resources';
}

export function getFileApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.endsWith('/api/files') ? envUrl : `${envUrl.replace(/\/+$/, '')}/api/files`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://chaosapp.local/api/files';
    }
  }

  return '/api/files';
}

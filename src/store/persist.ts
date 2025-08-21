import storage from 'redux-persist/lib/storage';
import type { PersistConfig } from 'redux-persist';

export const STORAGE_ROOT_KEY = 'findmychef:persist:v1';

export const rootPersistConfig: PersistConfig<object> = {
  key: STORAGE_ROOT_KEY,
  version: 1,
  storage,
  whitelist: ['auth', 'jobs', 'applications', 'favorites', 'ui'],
};

export function resetDemoData() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(`persist:${STORAGE_ROOT_KEY}`);
    window.localStorage.removeItem('findmychef:theme');
  } finally {
    window.location.reload();
  }
}

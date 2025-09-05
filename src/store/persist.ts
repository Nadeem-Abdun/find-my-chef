export const STORAGE_ROOT_KEY = 'findmychef:persist:v1';

export function resetDemoData() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(`persist:${STORAGE_ROOT_KEY}`);
    window.localStorage.removeItem('findmychef:theme');
  } finally {
    window.location.reload();
  }
}

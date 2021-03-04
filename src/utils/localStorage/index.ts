const APP_KEY = 'WONGAMES';

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return;

  const data = window.localStorage.getItem(`${APP_KEY}_${key}`);
  return data ? JSON.parse(data) : undefined;
}

export function setStorageItem(key: string, value: string[]) {
  if (typeof window === 'undefined') return;

  const data = JSON.stringify(value);
  return window.localStorage.setItem(`${APP_KEY}_${key}`, data);
}

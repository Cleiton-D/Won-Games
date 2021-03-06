import { useEffect } from 'react';

import { setStorageItem } from 'utils/localStorage';

export const useStoragedValue = (key: string, value: string[]): void => {
  useEffect(() => {
    setStorageItem(key, value);
  }, [key, value]);
};

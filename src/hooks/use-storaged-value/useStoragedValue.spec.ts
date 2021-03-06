import { renderHook } from '@testing-library/react-hooks';
import { useEffect, useState } from 'react';

import { getStorageItem } from 'utils/localStorage';

import { useStoragedValue } from '.';

describe('useStoragedValue', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should save on localStorage on pass initial value', () => {
    const value = ['1'];

    renderHook(() => useStoragedValue('storagedValue', value));
    expect(getStorageItem('storagedValue')).toStrictEqual(['1']);
  });

  it('should save on localStorage on update value', async () => {
    const { waitForNextUpdate } = renderHook(() => {
      const [value, setValue] = useState(['1']);
      useStoragedValue('storagedValue', value);

      useEffect(() => {
        setTimeout(() => setValue(['1', '2']), 500);
      }, []);
    });

    await waitForNextUpdate();

    expect(getStorageItem('storagedValue')).toStrictEqual(['1', '2']);
  });
});

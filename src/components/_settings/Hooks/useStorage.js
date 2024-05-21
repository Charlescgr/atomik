import { useState, useEffect } from 'react';
import isBrowser from '@charlescgr/underline/dist/isBrowser';

/**
 * useStorage
 * @param {string} key Name/key to register on LocalStorage
 * @param {any} state The value to save on LocalStorage
 * @returns {array}
 */
const useStorage = (key, iniState) => {
  if (isBrowser()) {
    const storegeValue = JSON.parse(localStorage.getItem(key)) || iniState;
    const [state, setState] = useState(storegeValue);
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [state, setState]);
    return [state, setState];
  }
  return '';
};

export default useStorage;

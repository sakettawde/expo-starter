import { useSyncExternalStore, useCallback, useRef } from 'react';
import { getItem, setItem, subscribe } from '@/utils/storage';

/**
 * A reactive hook for localStorage that updates when the value changes
 */
export function useStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Cache the last known value and its serialized form to avoid infinite loops
  const cache = useRef<{ serialized: string | null; value: T }>({
    serialized: null,
    value: initialValue,
  });

  const subscribeToKey = useCallback(
    (listener: () => void) => subscribe(key, listener),
    [key]
  );

  const getSnapshotForKey = useCallback(() => {
    const stored = getItem<T>(key);
    const currentValue = stored ?? initialValue;
    const serialized = JSON.stringify(currentValue);

    // Only return new reference if value actually changed
    if (serialized !== cache.current.serialized) {
      cache.current = { serialized, value: currentValue };
    }

    return cache.current.value;
  }, [key, initialValue]);

  const getServerSnapshotForKey = useCallback(() => {
    return initialValue;
  }, [initialValue]);

  const value = useSyncExternalStore(
    subscribeToKey,
    getSnapshotForKey,
    getServerSnapshotForKey
  );

  const setValue = useCallback(
    (newValue: T) => {
      setItem(key, newValue);
    },
    [key]
  );

  return [value, setValue];
}

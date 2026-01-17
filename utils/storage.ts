import * as SQLite from 'expo-sqlite';

const storage = SQLite.openDatabaseSync('intuition.db');

// Initialize the storage table
storage.execSync(`
  CREATE TABLE IF NOT EXISTS storage (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`);

type Listener = () => void;

const listeners: Map<string, Set<Listener>> = new Map();

/**
 * Get a value from localStorage with JSON parsing
 */
export function getItem<T>(key: string): T | null {
  try {
    const result = storage.getFirstSync<{ value: string }>(
      'SELECT value FROM storage WHERE key = ?',
      [key]
    );
    if (!result) return null;
    return JSON.parse(result.value) as T;
  } catch {
    return null;
  }
}

/**
 * Set a value in localStorage with JSON serialization
 */
export function setItem<T>(key: string, value: T): void {
  try {
    storage.runSync(
      'INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?)',
      [key, JSON.stringify(value)]
    );
    notifyListeners(key);
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

/**
 * Remove a value from localStorage
 */
export function removeItem(key: string): void {
  try {
    storage.runSync('DELETE FROM storage WHERE key = ?', [key]);
    notifyListeners(key);
  } catch (error) {
    console.error('Failed to remove from storage:', error);
  }
}

/**
 * Subscribe to changes for a specific key
 */
export function subscribe(key: string, listener: Listener): () => void {
  if (!listeners.has(key)) {
    listeners.set(key, new Set());
  }
  listeners.get(key)!.add(listener);

  return () => {
    listeners.get(key)?.delete(listener);
  };
}

/**
 * Notify all listeners for a specific key
 */
function notifyListeners(key: string): void {
  listeners.get(key)?.forEach((listener) => listener());
}

/**
 * Get a snapshot function for useSyncExternalStore
 */
export function getSnapshot<T>(key: string): () => T | null {
  return () => getItem<T>(key);
}

/**
 * Get a server snapshot function (returns null for SSR)
 */
export function getServerSnapshot<T>(): () => T | null {
  return () => null;
}

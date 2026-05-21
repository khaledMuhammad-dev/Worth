'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = () => onStoreChange();
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    () => false
  );
}

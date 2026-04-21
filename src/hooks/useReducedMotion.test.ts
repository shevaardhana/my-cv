import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useReducedMotion from './useReducedMotion';

// Helper to mock window.matchMedia
function mockMatchMedia(matches: boolean) {
  const listeners: ((e: MediaQueryListEvent) => void)[] = [];
  const mql = {
    matches,
    addEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: vi.fn(),
    dispatchChange: (newMatches: boolean) => {
      listeners.forEach(cb => cb({ matches: newMatches } as MediaQueryListEvent));
    },
  };
  // jsdom doesn't implement matchMedia, so we define it directly
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn(() => mql),
  });
  return mql;
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when prefers-reduced-motion is not set', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion: reduce is active', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const mql = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mql.dispatchChange(true);
    });

    expect(result.current).toBe(true);
  });

  // Feature: cv-web-animated, Property 14: Reduced-motion menonaktifkan semua animasi
  // Validates: Requirements 8.5
  it('Property 14: hook mengembalikan nilai boolean yang mencerminkan state matchMedia', () => {
    // Test both states deterministically
    for (const reducedMotion of [true, false]) {
      mockMatchMedia(reducedMotion);
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(reducedMotion);
      vi.restoreAllMocks();
    }
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import useCountUp from './useCountUp';

describe('useCountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock requestAnimationFrame to run synchronously
    let rafId = 0;
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      rafId++;
      // Schedule via setTimeout so we can control timing
      setTimeout(() => cb(performance.now()), 16);
      return rafId;
    });
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('starts at 0 when trigger is false', () => {
    const { result } = renderHook(() => useCountUp(100, 1000, false));
    expect(result.current).toBe(0);
  });

  it('starts at 0 when trigger becomes true', () => {
    const { result } = renderHook(() => useCountUp(50, 500, true));
    // Initially 0 before any rAF fires
    expect(result.current).toBe(0);
  });

  it('reaches target value after duration completes', async () => {
    const target = 42;
    const duration = 500;

    const { result } = renderHook(() => useCountUp(target, duration, true));

    // Advance time past the duration to complete the animation
    await act(async () => {
      vi.advanceTimersByTime(duration + 100);
    });

    expect(result.current).toBe(target);
  });

  it('resets to 0 when trigger goes false then true again', async () => {
    const { result, rerender } = renderHook(
      ({ trigger }: { trigger: boolean }) => useCountUp(10, 200, trigger),
      { initialProps: { trigger: true } }
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(10);

    // Re-trigger
    rerender({ trigger: false });
    rerender({ trigger: true });

    // Should reset to 0 at start
    expect(result.current).toBe(0);
  });

  // Feature: cv-web-animated, Property 5: useCountUp mencapai nilai target
  // Validates: Requirements 3.5
  it('Property 5: useCountUp mencapai nilai target untuk berbagai target positif', async () => {
    // Test a range of positive integer targets
    const targets = [1, 5, 10, 20, 50, 100];

    for (const target of targets) {
      const { result } = renderHook(() => useCountUp(target, 300, true));

      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe(target);
    }
  });
});

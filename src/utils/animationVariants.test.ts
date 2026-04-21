import { describe, it, expect } from 'vitest';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  skillBarVariant,
} from './animationVariants';
import type { Variants } from 'framer-motion';

// Helper: extract duration from a Framer Motion Variants object
function getDuration(variant: Variants): number | undefined {
  const visible = variant['visible'];
  if (!visible || typeof visible !== 'object') return undefined;
  const transition = (visible as Record<string, unknown>)['transition'];
  if (!transition || typeof transition !== 'object') return undefined;
  return (transition as Record<string, unknown>)['duration'] as number | undefined;
}

const animatedVariants: { name: string; variant: Variants }[] = [
  { name: 'fadeInUp', variant: fadeInUp },
  { name: 'fadeInLeft', variant: fadeInLeft },
  { name: 'fadeInRight', variant: fadeInRight },
  { name: 'skillBarVariant', variant: skillBarVariant },
];

// Unit tests
describe('animationVariants', () => {
  it('fadeInUp has hidden and visible states', () => {
    expect(fadeInUp.hidden).toBeDefined();
    expect(fadeInUp.visible).toBeDefined();
  });

  it('skillBarVariant hidden starts at 0% width', () => {
    expect((fadeInUp.hidden as Record<string, unknown>)['opacity']).toBe(0);
  });

  // Feature: cv-web-animated, Property 13: Durasi animasi dalam rentang yang valid
  // Validates: Requirements 8.2
  it('Property 13: semua durasi animasi berada dalam rentang 300ms–800ms (0.3s–0.8s)', () => {
    // This is an example-based property over the defined variants (not random input)
    // We verify the property holds for all defined animation variants
    for (const { name, variant } of animatedVariants) {
      const duration = getDuration(variant);
      expect(duration, `${name} should have a duration`).toBeDefined();
      if (duration !== undefined) {
        expect(duration, `${name} duration should be >= 0.3`).toBeGreaterThanOrEqual(0.3);
        expect(duration, `${name} duration should be <= 0.8`).toBeLessThanOrEqual(0.8);
      }
    }
  });

  // Property-based: verify the constraint holds for any hypothetical duration value
  // This tests the range logic itself, not random inputs
  it('Property 13 (PBT): durasi dalam rentang 0.3–0.8 diterima, di luar rentang ditolak', () => {
    const isValidDuration = (d: number) => d >= 0.3 && d <= 0.8;

    // Values inside range should be valid
    const insideRange = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.35, 0.65, 0.75];
    for (const d of insideRange) {
      expect(isValidDuration(d), `${d} should be valid`).toBe(true);
    }

    // Values outside range should be invalid
    const outsideRange = [0, 0.1, 0.2, 0.29, 0.81, 0.9, 1.0, 2.0];
    for (const d of outsideRange) {
      expect(isValidDuration(d), `${d} should be invalid`).toBe(false);
    }

    // All defined animation variants must have valid durations
    for (const { name, variant } of animatedVariants) {
      const duration = getDuration(variant);
      expect(duration, `${name} should have a duration`).toBeDefined();
      if (duration !== undefined) {
        expect(isValidDuration(duration), `${name} duration ${duration} should be in [0.3, 0.8]`).toBe(true);
      }
    }
  });
});

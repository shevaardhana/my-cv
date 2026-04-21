import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import useScrollSpy from './useScrollSpy';

// Helper: create a mock DOM element with a specific offsetTop
function createSection(id: string, offsetTop: number): HTMLElement {
  const el = document.createElement('div');
  el.id = id;
  // Mock getBoundingClientRect to simulate position
  el.getBoundingClientRect = vi.fn(() => ({
    top: offsetTop - window.scrollY,
    bottom: offsetTop + 100 - window.scrollY,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: offsetTop - window.scrollY,
    toJSON: () => {},
  }));
  document.body.appendChild(el);
  return el;
}

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setScrollY(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns first section id by default', () => {
    createSection('hero', 0);
    createSection('about', 500);

    const { result } = renderHook(() => useScrollSpy(['hero', 'about']));
    expect(result.current).toBe('hero');
  });

  it('returns empty string when no sections provided', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });

  it('returns active section when scrolled to it', () => {
    createSection('hero', 0);
    createSection('about', 500);
    createSection('skills', 1000);

    const { result } = renderHook(() => useScrollSpy(['hero', 'about', 'skills']));

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('about');
  });

  it('returns last section when scrolled past all sections', () => {
    createSection('hero', 0);
    createSection('about', 500);
    createSection('contact', 1000);

    const { result } = renderHook(() => useScrollSpy(['hero', 'about', 'contact']));

    act(() => {
      setScrollY(1200);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('contact');
  });

  // Feature: cv-web-animated, Property 1: Scroll Spy mengembalikan section aktif yang benar
  // Validates: Requirements 1.4
  it('Property 1: selalu mengembalikan salah satu dari sectionIds yang diberikan', () => {
    // Use a fixed set of sections with known positions
    const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    const positions = [0, 300, 600, 900, 1200, 1500];

    // Create DOM elements
    document.body.innerHTML = '';
    sectionIds.forEach((id, i) => createSection(id, positions[i]));

    // Test multiple scroll positions
    const scrollPositions = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1800];

    for (const scrollPos of scrollPositions) {
      setScrollY(scrollPos);

      const { result } = renderHook(() => useScrollSpy(sectionIds));

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      // The result must be one of the provided section IDs
      expect(sectionIds).toContain(result.current);
    }
  });
});

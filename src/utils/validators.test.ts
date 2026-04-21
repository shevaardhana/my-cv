import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateEmail, validateContactForm } from './validators';
import type { ContactFormData } from '../types';

// Unit tests for validateEmail
describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('rejects email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('rejects email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  // Feature: cv-web-animated, Property 12: Validasi email menolak format tidak valid
  // Validates: Requirements 7.3
  it('Property 12: menolak semua string yang tidak mengandung @ diikuti domain valid', () => {
    fc.assert(
      fc.property(
        // Generate strings that clearly lack a valid email format
        fc.oneof(
          // No @ at all
          fc.stringMatching(/^[^@]+$/),
          // @ but no dot after it
          fc.tuple(
            fc.stringMatching(/^[^@]+$/),
            fc.stringMatching(/^[^@.]+$/)
          ).map(([a, b]) => `${a}@${b}`)
        ),
        (invalidEmail) => {
          expect(validateEmail(invalidEmail)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Unit tests for validateContactForm
describe('validateContactForm', () => {
  it('returns no errors for a valid form', () => {
    const data: ContactFormData = {
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'Hi there',
    };
    const errors = validateContactForm(data);
    expect(errors.name).toBeNull();
    expect(errors.email).toBeNull();
    expect(errors.subject).toBeNull();
    expect(errors.message).toBeNull();
  });

  it('returns error for empty name', () => {
    const data: ContactFormData = { name: '', email: 'a@b.com', subject: 'x', message: 'y' };
    expect(validateContactForm(data).name).toBe('Field ini wajib diisi');
  });

  it('returns error for whitespace-only name', () => {
    const data: ContactFormData = { name: '   ', email: 'a@b.com', subject: 'x', message: 'y' };
    expect(validateContactForm(data).name).toBe('Field ini wajib diisi');
  });

  it('returns email format error for invalid email', () => {
    const data: ContactFormData = { name: 'A', email: 'notanemail', subject: 'x', message: 'y' };
    expect(validateContactForm(data).email).toBe('Format email tidak valid');
  });

  // Feature: cv-web-animated, Property 11: Validasi form menolak field kosong
  // Validates: Requirements 7.2
  it('Property 11: menolak form dengan satu atau lebih field kosong/whitespace', () => {
    const emptyOrWhitespace = fc.oneof(
      fc.constant(''),
      fc.stringMatching(/^\s+$/)
    );
    const validString = fc.stringMatching(/\S/).filter(s => s.trim().length > 0);
    const validEmail = fc.constant('valid@example.com');

    fc.assert(
      fc.property(
        // At least one field is empty/whitespace — test each field independently
        fc.oneof(
          // empty name
          fc.tuple(emptyOrWhitespace, validEmail, validString, validString).map(
            ([name, email, subject, message]) => ({ name, email, subject, message })
          ),
          // empty email
          fc.tuple(validString, emptyOrWhitespace, validString, validString).map(
            ([name, email, subject, message]) => ({ name, email, subject, message })
          ),
          // empty subject
          fc.tuple(validString, validEmail, emptyOrWhitespace, validString).map(
            ([name, email, subject, message]) => ({ name, email, subject, message })
          ),
          // empty message
          fc.tuple(validString, validEmail, validString, emptyOrWhitespace).map(
            ([name, email, subject, message]) => ({ name, email, subject, message })
          ),
        ),
        (data: ContactFormData) => {
          const errors = validateContactForm(data);
          // At least one error must be non-null
          const hasError = Object.values(errors).some(e => e !== null);
          return hasError;
        }
      ),
      { numRuns: 100 }
    );
  });
});

import type { ContactFormData } from '../types';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(
  data: ContactFormData
): Record<string, string | null> {
  const errors: Record<string, string | null> = {
    name: null,
    email: null,
    subject: null,
    message: null,
  };

  if (!data.name || !data.name.trim()) {
    errors.name = 'Field ini wajib diisi';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Field ini wajib diisi';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Format email tidak valid';
  }

  if (!data.subject || !data.subject.trim()) {
    errors.subject = 'Field ini wajib diisi';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Field ini wajib diisi';
  }

  return errors;
}

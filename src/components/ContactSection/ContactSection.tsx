import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiSend, FiDownload } from 'react-icons/fi';
import type { ContactFormData } from '../../types/index';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '../../utils/animationVariants';
import { validateContactForm } from '../../utils/validators';
import { useLanguage } from '../../contexts/LanguageContext';
import { contactInfo } from '../../data/portfolio';

const emptyForm: ContactFormData = { name: '', email: '', subject: '', message: '' };

function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const variants = (base: typeof fadeInUp) => reducedMotion ? { hidden: {}, visible: {} } : base;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateContactForm(form);
    setErrors(result);
    const hasError = Object.values(result).some((v) => v !== null);
    if (!hasError) {
      setSubmitted(true);
      setForm(emptyForm);
    }
  }

  const socialLinks = [
    { label: 'GitHub', href: contactInfo.github, Icon: FiGithub },
    { label: 'LinkedIn', href: contactInfo.linkedin, Icon: FiLinkedin },
    { label: 'Instagram', href: contactInfo.instagram, Icon: FiInstagram },
  ];

  const directContacts = [
    { label: contactInfo.email, Icon: FiMail, href: `mailto:${contactInfo.email}` },
    { label: contactInfo.phone, Icon: FiPhone, href: `tel:${contactInfo.phone}` },
    { label: contactInfo.location, Icon: FiMapPin, href: null },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Heading */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants(fadeInUp)}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('contact.title')}</h2>
        <p className="mt-3 text-gray-600">{t('contact.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants(staggerContainer)}
          className="flex flex-col gap-6"
        >
          {/* Direct contact */}
          <motion.div variants={variants(fadeInUp)} className="rounded-xl bg-white border border-gray-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">{t('contact.info')}</h3>
            <ul className="flex flex-col gap-4">
              {directContacts.map(({ label, Icon, href }) => (
                <li key={label} className="flex items-center gap-3 text-gray-700">
                  <Icon className="text-orange-500 shrink-0 text-xl" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-orange-500 transition-colors break-all">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social media */}
          <motion.div variants={variants(fadeInUp)} className="rounded-xl bg-white border border-gray-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">{t('contact.social')}</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <Icon className="text-xl" aria-hidden="true" />
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Download CV */}
          {contactInfo.cvUrl && (
            <motion.div variants={variants(fadeInUp)}>
              <a
                href={contactInfo.cvUrl}
                download
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-orange-50 border border-orange-200 px-6 py-4 text-orange-500 font-semibold hover:bg-orange-100 hover:border-orange-400 transition-colors"
              >
                <FiDownload className="text-xl" aria-hidden="true" />
                {t('contact.downloadCV')}
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants(fadeInUp)}
          className="rounded-xl bg-white border border-gray-200 p-6 shadow-md"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
              <FiSend className="text-5xl text-orange-500" aria-hidden="true" />
              <p className="text-gray-900 text-lg font-semibold">{t('contact.sent')}</p>
              <p className="text-gray-600 text-sm">{t('contact.sentDesc')}</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-orange-500 hover:underline"
              >
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-700">{t('contact.form.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.name')}
                  className={`rounded-lg bg-gray-50 border px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-700">{t('contact.form.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.email')}
                  className={`rounded-lg bg-gray-50 border px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-sm text-gray-700">{t('contact.form.subject')}</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.subject')}
                  className={`rounded-lg bg-gray-50 border px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && <p id="subject-error" className="text-xs text-red-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm text-gray-700">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.message')}
                  className={`rounded-lg bg-gray-50 border px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 transition resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors shadow-md"
              >
                <FiSend aria-hidden="true" />
                {t('contact.form.send')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;

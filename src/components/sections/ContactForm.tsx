import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import RevealWrapper from '../ui/RevealWrapper';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdapvrel';
const HAS_REAL_FORMSPREE_ID = !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID_HERE');

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!HAS_REAL_FORMSPREE_ID) {
      setSubmitError('Replace YOUR_FORM_ID_HERE in the Formspree URL before using the contact form.');
      return;
    }

    setSubmitError('');
    setSending(true);

    try {
      const submittedFrom = `${window.location.origin}${window.location.pathname}`;

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          submittedFrom,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = data?.errors?.[0]?.message || 'Something went wrong while sending your message.';
        throw new Error(message);
      }

      setSending(false);
      setSent(true);
      setForm(initialForm);
    } catch (error: unknown) {
      setSending(false);
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending your message.';
      setSubmitError(message);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 bg-bg-tertiary border rounded-xl text-text-primary text-sm placeholder-text-muted transition-all duration-200 outline-none focus:ring-1 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
        : 'border-[var(--border)] focus:border-accent/60 focus:ring-accent/10 hover:border-[var(--border-hover)]'
    }`;

  if (sent) {
    return (
      <RevealWrapper>
        <div className="bg-bg-secondary border border-accent3/30 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--accent3-glow)] border border-accent3/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-accent3" />
          </div>
          <h3 className="font-display text-xl font-bold text-text-primary mb-2">Message sent!</h3>
          <p className="text-text-secondary text-sm mb-6">
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSent(false)}
            className="px-5 py-2.5 text-sm border border-[var(--border-hover)] text-text-primary rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
          >
            Send another message
          </button>
        </div>
      </RevealWrapper>
    );
  }

  return (
    <RevealWrapper delay={100}>
      <div className="bg-bg-secondary border border-[var(--border)] rounded-2xl p-6 lg:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">Send a message</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Arman Khan"
                className={inputClass('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && <p id="contact-name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && <p id="contact-email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label htmlFor="contact-subject" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Internship opportunity / Project collaboration"
              className={inputClass('subject')}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            />
            {errors.subject && <p id="contact-subject-error" className="text-red-400 text-xs mt-1">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="contact-message" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell me about the opportunity, project, or just say hello..."
              className={`${inputClass('message')} resize-none`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && <p id="contact-message-error" className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent/90 hover:shadow-[0_8px_24px_rgba(79,142,247,0.25)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>

          <p className="text-text-muted text-xs text-center mt-4">
            Typical response time: within 24 hours
          </p>

          {submitError && (
            <p className="text-red-400 text-xs text-center mt-3">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </RevealWrapper>
  );
};

export default ContactForm;

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle } from 'lucide-react';
import RevealWrapper from '../ui/RevealWrapper';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? '';

const inputClass =
  'w-full px-4 py-3 bg-bg-tertiary border rounded-xl text-text-primary text-sm placeholder-text-muted transition-all duration-200 outline-none focus:ring-1 border-[var(--border)] focus:border-accent/60 focus:ring-accent/10 hover:border-[var(--border-hover)]';

const errorClass = 'text-red-400 text-xs mt-1';

const ContactFormFields = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <RevealWrapper>
        <div className="bg-bg-secondary border border-[var(--color-status)]/30 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--status-glow)] border border-[var(--color-status)]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-[var(--color-status)]" />
          </div>
          <h3 className="font-display text-xl font-bold text-text-primary mb-2">Message sent!</h3>
          <p className="text-text-secondary text-sm">
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
        </div>
      </RevealWrapper>
    );
  }

  return (
    <RevealWrapper delay={100}>
      <div className="bg-bg-secondary border border-[var(--border)] rounded-2xl p-6 lg:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">Send a message</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Arman Khan"
                className={inputClass}
              />
              <ValidationError field="name" prefix="Name" errors={state.errors} className={errorClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
              <ValidationError field="email" prefix="Email" errors={state.errors} className={errorClass} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="contact-subject" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              required
              placeholder="Internship opportunity / Project collaboration"
              className={inputClass}
            />
            <ValidationError field="subject" prefix="Subject" errors={state.errors} className={errorClass} />
          </div>

          <div className="mb-6">
            <label htmlFor="contact-message" className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about the opportunity, project, or just say hello..."
              className={`${inputClass} resize-none`}
            />
            <ValidationError field="message" prefix="Message" errors={state.errors} className={errorClass} />
          </div>

          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_12px_30px_rgba(79,142,247,0.35)] hover-glow-crisp transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state.submitting ? (
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

          <ValidationError errors={state.errors} className="text-red-400 text-xs text-center mt-3" />
        </form>
      </div>
    </RevealWrapper>
  );
};

const ContactForm = () => {
  if (!FORMSPREE_FORM_ID) {
    return (
      <RevealWrapper delay={100}>
        <div className="bg-bg-secondary border border-[var(--border)] rounded-2xl p-6 lg:p-8">
          <h2 className="font-display text-xl font-bold text-text-primary mb-6">Send a message</h2>
          <p className="text-text-muted text-sm text-center py-8">
            Contact form is not configured.
          </p>
        </div>
      </RevealWrapper>
    );
  }

  return <ContactFormFields formId={FORMSPREE_FORM_ID} />;
};

export default ContactForm;

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle } from 'lucide-react';
import RevealWrapper from '../ui/RevealWrapper';
import { CONTACT_FORM_COPY } from '../../constants';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? '';

const inputClass =
  'w-full px-4 py-3 bg-panel-2 border border-rule rounded-md text-chalk text-sm placeholder-chalk-3 outline-none transition-colors duration-tap ease-signal focus:border-signal';

// --color-reject appears here and on 422 only. It is never decorative.
const errorClass = 'text-reject text-xs mt-1';

const labelClass = 'block text-xs text-chalk-3 font-mono uppercase tracking-wider mb-1.5';

const ContactFormFields = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <RevealWrapper>
        <div className="panel p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-panel-2 border border-rule flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-verified" />
          </div>
          <h3 className="font-display text-xl font-bold text-chalk mb-2">{CONTACT_FORM_COPY.successHeading}</h3>
          <p className="text-chalk-2 text-sm">{CONTACT_FORM_COPY.successBody}</p>
        </div>
      </RevealWrapper>
    );
  }

  return (
    <RevealWrapper delay={100}>
      <div className="panel p-6 lg:p-8">
        <h2 className="font-display text-xl font-bold text-chalk mb-6">{CONTACT_FORM_COPY.heading}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                {CONTACT_FORM_COPY.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder={CONTACT_FORM_COPY.namePlaceholder}
                className={inputClass}
              />
              <ValidationError field="name" prefix="Name" errors={state.errors} className={errorClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                {CONTACT_FORM_COPY.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder={CONTACT_FORM_COPY.emailPlaceholder}
                className={inputClass}
              />
              <ValidationError field="email" prefix="Email" errors={state.errors} className={errorClass} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="contact-subject" className={labelClass}>
              {CONTACT_FORM_COPY.subjectLabel}
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              required
              placeholder={CONTACT_FORM_COPY.subjectPlaceholder}
              className={inputClass}
            />
            <ValidationError field="subject" prefix="Subject" errors={state.errors} className={errorClass} />
          </div>

          <div className="mb-6">
            <label htmlFor="contact-message" className={labelClass}>
              {CONTACT_FORM_COPY.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder={CONTACT_FORM_COPY.messagePlaceholder}
              className={`${inputClass} resize-none`}
            />
            <ValidationError field="message" prefix="Message" errors={state.errors} className={errorClass} />
          </div>

          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-signal text-void rounded-md font-semibold text-sm transition-colors duration-tap ease-signal hover:bg-signal/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state.submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                {CONTACT_FORM_COPY.submitting}
              </>
            ) : (
              <>
                <Send size={15} />
                {CONTACT_FORM_COPY.submit}
              </>
            )}
          </button>

          <p className="text-chalk-3 text-xs text-center mt-4">{CONTACT_FORM_COPY.responseNote}</p>

          <ValidationError errors={state.errors} className="text-reject text-xs text-center mt-3" />
        </form>
      </div>
    </RevealWrapper>
  );
};

const ContactForm = () => {
  if (!FORMSPREE_FORM_ID) {
    return (
      <RevealWrapper delay={100}>
        <div className="panel p-6 lg:p-8">
          <h2 className="font-display text-xl font-bold text-chalk mb-6">{CONTACT_FORM_COPY.heading}</h2>
          <p className="text-chalk-3 text-sm text-center py-8">{CONTACT_FORM_COPY.unconfigured}</p>
        </div>
      </RevealWrapper>
    );
  }

  return <ContactFormFields formId={FORMSPREE_FORM_ID} />;
};

export default ContactForm;

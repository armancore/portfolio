import React, { useRef, useState } from 'react';
import { useForm } from '@formspree/react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_FORM_COPY, PERSONAL_INFO } from '../../constants';
import { revealBody, viewport } from '../../lib/motion';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? '';

const inputClass =
  'w-full px-4 py-3 bg-panel-2 border border-rule rounded-md text-chalk text-sm placeholder-chalk-3 outline-none transition-colors duration-tap ease-signal focus:border-signal';

const inputErrorClass =
  'w-full px-4 py-3 bg-panel-2 border border-reject rounded-md text-chalk text-sm placeholder-chalk-3 outline-none transition-colors duration-tap ease-signal focus:border-signal';

const labelClass = 'block text-xs text-chalk-3 font-mono uppercase tracking-wider mb-1.5';

const FieldError = ({ id, messages }: { id: string; messages: string[] }) => {
  if (messages.length === 0) return null;
  return (
    <p
      id={id}
      role="alert"
      className="text-reject text-xs mt-1.5 flex items-start gap-1.5"
    >
      <AlertCircle size={13} className="shrink-0 mt-px" aria-hidden="true" />
      <span>{messages.join('. ')}</span>
    </p>
  );
};

const FormNotice = ({ heading, body }: { heading: string; body: string }) => (
  <div className="panel p-6 lg:p-8">
    <p className="text-reject text-sm font-semibold flex items-center gap-2 mb-2">
      <AlertCircle size={16} aria-hidden="true" />
      {heading}
    </p>
    <p className="text-chalk-2 text-sm leading-7">
      {body}{' '}
      <a className="text-chalk underline underline-offset-4" href={`mailto:${PERSONAL_INFO.email}`}>
        {PERSONAL_INFO.email}
      </a>
      .
    </p>
  </div>
);

const ContactFormFields = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [hardFailure, setHardFailure] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const fieldErrors = (field: string): string[] => {
    const errors = state.errors as unknown;
    if (!errors) return [];
    if (typeof (errors as { getFieldErrors?: unknown }).getFieldErrors === 'function') {
      const found = (errors as { getFieldErrors: (f: string) => { message: string }[] }).getFieldErrors(field);
      return (found ?? []).map((e) => e.message);
    }
    if (Array.isArray(errors)) {
      return (errors as { field?: string; message: string }[])
        .filter((e) => e.field === field)
        .map((e) => e.message);
    }
    return [];
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setHardFailure(false);
    setDismissed(false);
    try {
      const result = (await handleSubmit(event)) as
        | { kind: 'success' }
        | { kind: 'error'; getFormErrors: () => readonly { message: string }[] }
        | undefined;

      if (result?.kind === 'error') {
        const formErrors = result.getFormErrors?.() ?? [];
        if (formErrors.length > 0) setHardFailure(true);
      }
    } catch {
      setHardFailure(true);
    }
  };

  const showSuccess = state.succeeded && !dismissed;

  const field = (name: string, label: string, placeholder: string, type = 'text') => {
    const errors = fieldErrors(name);
    const errorId = `contact-${name}-error`;
    return (
      <div>
        <label htmlFor={`contact-${name}`} className={labelClass}>
          {label}
        </label>
        <input
          id={`contact-${name}`}
          type={type}
          name={name}
          required
          placeholder={placeholder}
          className={errors.length ? inputErrorClass : inputClass}
          aria-invalid={errors.length > 0 || undefined}
          aria-describedby={errors.length ? errorId : undefined}
        />
        <FieldError id={errorId} messages={errors} />
      </div>
    );
  };

  const messageErrors = fieldErrors('message');

  return (
    <motion.div variants={revealBody} initial="hidden" whileInView="show" viewport={viewport}>
      {showSuccess ? (
        <div className="panel p-6 mb-4" role="status">
          <p className="text-verified text-sm font-semibold flex items-center gap-2 mb-2">
            <CheckCircle size={16} aria-hidden="true" />
            {CONTACT_FORM_COPY.successHeading}
          </p>
          <p className="text-chalk-2 text-sm leading-7 mb-4">{CONTACT_FORM_COPY.successBody}</p>
          <button
            type="button"
            className="pj-toggle"
            onClick={() => {
              setDismissed(true);
              formRef.current?.reset();
            }}
          >
            {CONTACT_FORM_COPY.sendAnother}
          </button>
        </div>
      ) : null}

      {hardFailure ? (
        <div className="mb-4">
          <FormNotice heading={CONTACT_FORM_COPY.errorHeading} body={CONTACT_FORM_COPY.errorBody} />
        </div>
      ) : null}

      <div className="panel p-6 lg:p-8">
        <h2 className="font-display text-xl font-bold text-chalk mb-6">{CONTACT_FORM_COPY.heading}</h2>

        <form ref={formRef} onSubmit={onSubmit} aria-busy={state.submitting || undefined}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {field('name', CONTACT_FORM_COPY.nameLabel, CONTACT_FORM_COPY.namePlaceholder)}
            {field('email', CONTACT_FORM_COPY.emailLabel, CONTACT_FORM_COPY.emailPlaceholder, 'email')}
          </div>

          <div className="mb-4">
            {field('subject', CONTACT_FORM_COPY.subjectLabel, CONTACT_FORM_COPY.subjectPlaceholder)}
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
              className={`${messageErrors.length ? inputErrorClass : inputClass} resize-none`}
              aria-invalid={messageErrors.length > 0 || undefined}
              aria-describedby={messageErrors.length ? 'contact-message-error' : undefined}
            />
            <FieldError id="contact-message-error" messages={messageErrors} />
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
                <Send size={15} aria-hidden="true" />
                {hardFailure ? CONTACT_FORM_COPY.retry : CONTACT_FORM_COPY.submit}
              </>
            )}
          </button>

          <p className="text-chalk-3 text-xs text-center mt-4">{CONTACT_FORM_COPY.responseNote}</p>
        </form>
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  if (!FORMSPREE_FORM_ID) {
    return (
      <motion.div variants={revealBody} initial="hidden" whileInView="show" viewport={viewport}>
        <FormNotice
          heading={CONTACT_FORM_COPY.unconfiguredHeading}
          body={CONTACT_FORM_COPY.unconfiguredBody}
        />
      </motion.div>
    );
  }

  return <ContactFormFields formId={FORMSPREE_FORM_ID} />;
};

export default ContactForm;

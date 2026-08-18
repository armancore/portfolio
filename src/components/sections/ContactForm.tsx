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

/**
 * Errors are never colour alone.
 *
 * --color-reject carries the message, but an icon and the word itself carry it
 * too, and the input is marked aria-invalid with aria-describedby pointing
 * here. Red text on its own fails WCAG 1.4.1 for anyone who cannot see it.
 */
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

/** Panel used for both the hard failure and the unconfigured case. */
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

  /**
   * Formspree only populates `state.errors` on a 422. A network failure, a 5xx
   * or a bad form ID resolved with the button quietly re-enabling and nothing
   * shown -- the user had no way to know the message never arrived. This holds
   * that case.
   */
  const [hardFailure, setHardFailure] = useState(false);
  /** Lets the success banner be dismissed without losing what was typed. */
  const [dismissed, setDismissed] = useState(false);

  const fieldErrors = (field: string): string[] => {
    const errors = state.errors as unknown;
    if (!errors) return [];
    // v3 exposes a helper; older shapes are a plain array. Handle both rather
    // than assuming, since getting this wrong silently hides errors.
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
      // handleSubmit resolves to SubmissionSuccess | SubmissionError, a union
      // discriminated by `kind` -- it is not an object carrying a Response.
      // Form-level errors (FORM_NOT_FOUND on a bad id, BLOCKED, INACTIVE,
      // EMPTY) live in getFormErrors(); field errors from a 422 flow through
      // state.errors and are rendered per input. Only the former is the silent
      // case this guards.
      const result = (await handleSubmit(event)) as
        | { kind: 'success' }
        | { kind: 'error'; getFormErrors: () => readonly { message: string }[] }
        | undefined;

      if (result?.kind === 'error') {
        const formErrors = result.getFormErrors?.() ?? [];
        if (formErrors.length > 0) setHardFailure(true);
      }
    } catch {
      // Network loss and anything else that rejects.
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
      {/* Sits above the form rather than replacing it. Replacing it destroyed
          whatever had been typed, so a later failure had nothing to fall back
          on. */}
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

        {/* noValidate is gone: native constraint validation is the free first
            line of defence, and Formspree's 422 is the second. */}
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

          {/* The page's single amber. */}
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

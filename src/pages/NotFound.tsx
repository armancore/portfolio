import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import PageMeta from '../components/seo/PageMeta';
import { NOT_FOUND_COPY } from '../constants';

const NotFound = () => {
  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/404" />
      <section style={{ paddingTop: '130px', paddingBottom: '90px', position: 'relative' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <div className="panel" style={{ padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  margin: '0 auto 20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-panel-2)',
                  border: '1px solid var(--color-rule)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={28} style={{ color: 'var(--color-signal)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-signal)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {NOT_FOUND_COPY.label}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(var(--text-2xl), 7vw, var(--text-5xl))',
                  color: 'var(--color-chalk)',
                  lineHeight: 1.05,
                  marginBottom: '14px',
                }}
              >
                {NOT_FOUND_COPY.heading}
              </h1>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-chalk-2)',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  margin: '0 auto 28px',
                }}
              >
                {NOT_FOUND_COPY.body}
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 text-sm font-semibold text-void no-underline transition-colors duration-tap ease-signal hover:bg-signal/90"
              >
                <ArrowLeft size={15} />
                {NOT_FOUND_COPY.cta}
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

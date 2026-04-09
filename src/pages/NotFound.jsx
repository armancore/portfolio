import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';

const NotFound = () => {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <section style={{ paddingTop: '130px', paddingBottom: '90px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 50% 35%, rgba(79,142,247,0.08) 0%, transparent 65%)' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.55), rgba(124,92,252,0.55), transparent)' }} />
              <div style={{ width: '68px', height: '68px', margin: '0 auto 20px', borderRadius: '18px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={28} style={{ color: '#4F8EF7' }} />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>404</p>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 7vw, 58px)', color: '#E8E8F2', lineHeight: 1.05, marginBottom: '14px' }}>Page not found</h1>
              <p style={{ fontSize: '15px', color: '#8B8BAE', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 28px' }}>
                The page you tried to open does not exist or the link is no longer valid.
              </p>
              <Link
                to="/"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 22px', background: '#4F8EF7', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3a7de0';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(79,142,247,0.38)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4F8EF7';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowLeft size={15} />
                Back to home
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

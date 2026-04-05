import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Facebook, Instagram, Send, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import { PERSONAL_INFO, CONTACT_LINKS } from '../constants';

const iconMap = { Mail, Phone, Github, Linkedin, Facebook, Instagram };

const accentForLink = (iconName) => {
  const map = {
    Mail:      { icon: '#4F8EF7', bg: 'rgba(79,142,247,0.1)',   border: 'rgba(79,142,247,0.2)'   },
    Phone:     { icon: '#00D9B5', bg: 'rgba(0,217,181,0.1)',    border: 'rgba(0,217,181,0.2)'    },
    Github:    { icon: '#E8E8F2', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)'  },
    Linkedin:  { icon: '#38BDF8', bg: 'rgba(56,189,248,0.1)',   border: 'rgba(56,189,248,0.2)'   },
    Facebook:  { icon: '#7C5CFC', bg: 'rgba(124,92,252,0.1)',   border: 'rgba(124,92,252,0.2)'   },
    Instagram: { icon: '#EC4899', bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.2)'   },
  };
  return map[iconName] || map.Mail;
};

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
  borderRadius: '10px',
  color: '#E8E8F2',
  fontSize: '14px',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
});

const labelStyle = {
  display: 'block',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  color: '#4A4A6A',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '7px',
};

const RECIPIENT_EMAIL = 'arman.techiee@gmail.com';

const Contact = () => {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name required';
    if (!form.email.trim())   e.email   = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject required';
    if (!form.message.trim()) e.message = 'Message required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  /**
   * Build a mailto: URL and open it — this launches the user's default email
   * client (including Gmail if set as default) with To, Subject and Body
   * pre-filled, so the sender can review and hit Send themselves.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSending(true);

    const body = [
      `Name: ${form.name}`,
      `From: ${form.email}`,
      '',
      form.message,
    ].join('\n');

    const mailto =
      `mailto:${RECIPIENT_EMAIL}` +
      `?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Small delay so the "Sending…" state is visible, then open mail client
    setTimeout(() => {
      window.location.href = mailto;
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div style={{ background: '#080B14', minHeight: '100vh' }}>

      {/* ─── PAGE HEADER ─── */}
      <section style={{ paddingTop: '110px', paddingBottom: '52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,217,181,0.05) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(79,142,247,0.04) 0%, transparent 65%)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>── Contact</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 72px)', color: '#E8E8F2', letterSpacing: '-0.03em', lineHeight: 1.05 }}>Let's Connect</h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(0,217,181,0.08)', border: '1px solid rgba(0,217,181,0.2)', borderRadius: '100px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D9B5', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
                <span style={{ color: '#00D9B5', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
              </div>
            </div>
            <p style={{ fontSize: 'clamp(14px, 3.6vw, 16px)', color: '#8B8BAE', maxWidth: '500px', lineHeight: 1.8 }}>
              Whether you have a job opportunity, a project to collaborate on, or just want to say hi — my inbox is always open.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ padding: '32px 0 80px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '40px' }}>

            {/* ── LEFT — Contact info ── */}
            <div>
              <RevealWrapper>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '22px', color: '#E8E8F2', marginBottom: '10px' }}>Get in touch</h2>
                <p style={{ fontSize: '14px', color: '#8B8BAE', lineHeight: 1.85, marginBottom: '32px' }}>
                  {PERSONAL_INFO.bio[2]}
                </p>
              </RevealWrapper>

              {/* Contact links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {CONTACT_LINKS.map((link, i) => {
                  const Icon = iconMap[link.iconName];
                  const ac   = accentForLink(link.iconName);
                  return (
                    <RevealWrapper key={link.label} delay={i * 70}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '13px', textDecoration: 'none', transition: 'all 0.2s', flexWrap: 'wrap' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = '#161B27'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#0D1117'; e.currentTarget.style.transform = 'none'; }}
                      >
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: ac.bg, border: `1px solid ${ac.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {Icon && <Icon size={16} style={{ color: ac.icon }} />}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ fontSize: '13px', color: '#E8E8F2', fontWeight: 500, marginBottom: '2px', overflowWrap: 'anywhere' }}>{link.label}</p>
                          <p style={{ fontSize: '11px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace" }}>{link.sublabel}</p>
                        </div>
                        <ArrowRight size={13} style={{ color: '#4A4A6A', flexShrink: 0 }} />
                      </a>
                    </RevealWrapper>
                  );
                })}
              </div>

              {/* Availability box */}
              <RevealWrapper delay={380}>
                <div style={{ background: '#0D1117', border: '1px solid rgba(0,217,181,0.18)', borderRadius: '14px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,217,181,0.5), transparent)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00D9B5', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
                    <span style={{ color: '#00D9B5', fontSize: '13px', fontWeight: 600 }}>Currently Available</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.75 }}>
                    Open to internship and junior developer positions. I bring energy, curiosity, and a genuine drive to ship great software.
                  </p>
                </div>
              </RevealWrapper>

              {/* Direct Gmail shortcut */}
              <RevealWrapper delay={440}>
                <div style={{ marginTop: '16px' }}>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${RECIPIENT_EMAIL}&su=Hello%20Arman`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '10px', fontSize: '12px', color: '#4F8EF7', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.12)'; e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.06)'; e.currentTarget.style.borderColor = 'rgba(79,142,247,0.2)'; }}
                  >
                    <Mail size={12} />
                    Open Gmail directly
                    <ExternalLink size={11} />
                  </a>
                </div>
              </RevealWrapper>
            </div>

            {/* ── RIGHT — Message form ── */}
            <RevealWrapper delay={100}>
              {sent ? (
                /* Success state */
                <div style={{ background: '#0D1117', border: '1px solid rgba(0,217,181,0.2)', borderRadius: '20px', padding: '56px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,217,181,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,217,181,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,217,181,0.1)', border: '1px solid rgba(0,217,181,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={26} style={{ color: '#00D9B5' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '22px', color: '#E8E8F2', marginBottom: '10px' }}>Your email client is open!</h3>
                  <p style={{ fontSize: '14px', color: '#8B8BAE', marginBottom: '8px', lineHeight: 1.75 }}>
                    Your default email app (or Gmail) should have opened with your message pre-filled.
                  </p>
                  <p style={{ fontSize: '13px', color: '#4A4A6A', marginBottom: '28px', fontFamily: "'JetBrains Mono', monospace" }}>
                    Just press Send to reach Arman.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSent(false)}
                      style={{ padding: '10px 22px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', fontSize: '13px', color: '#E8E8F2', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.color = '#4F8EF7'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#E8E8F2'; }}
                    >
                      Send another
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=${RECIPIENT_EMAIL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 22px', background: '#4F8EF7', color: '#fff', borderRadius: '9px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#3a7de0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#4F8EF7'; }}
                    >
                      <Mail size={13} /> Open Gmail
                    </a>
                  </div>
                </div>
              ) : (
                /* Form */
                <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                  {/* Top accent bar */}
                  <div style={{ height: '2px', background: 'linear-gradient(90deg, #4F8EF7, #7C5CFC, #00D9B5)' }} />

                  <div style={{ padding: 'clamp(22px, 5vw, 32px)' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#E8E8F2', marginBottom: '6px' }}>Send a message</h2>
                      <p style={{ fontSize: '12px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Mail size={10} />
                        Opens your email client with the message pre-filled
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-[14px]">
                        {[
                          { name: 'name',  label: 'Full Name',      placeholder: 'Your Name',       type: 'text'  },
                          { name: 'email', label: 'Email Address',   placeholder: 'you@example.com', type: 'email' },
                        ].map(f => (
                          <div key={f.name}>
                            <label style={labelStyle}>{f.label}</label>
                            <input
                              type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                              placeholder={f.placeholder} style={inputStyle(!!errors[f.name])}
                              onFocus={e => { e.target.style.borderColor = errors[f.name] ? 'rgba(239,68,68,0.6)' : 'rgba(79,142,247,0.5)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                              onBlur={e =>  { e.target.style.borderColor = errors[f.name] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                            />
                            {errors[f.name] && <p style={{ fontSize: '11px', color: '#F87171', marginTop: '4px' }}>{errors[f.name]}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Subject */}
                      <div style={{ marginBottom: '14px' }}>
                        <label style={labelStyle}>Subject</label>
                        <input
                          type="text" name="subject" value={form.subject} onChange={handleChange}
                          placeholder="Internship opportunity / Project collaboration"
                          style={{ ...inputStyle(!!errors.subject), width: '100%' }}
                          onFocus={e => { e.target.style.borderColor = errors.subject ? 'rgba(239,68,68,0.6)' : 'rgba(79,142,247,0.5)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                          onBlur={e =>  { e.target.style.borderColor = errors.subject ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                        />
                        {errors.subject && <p style={{ fontSize: '11px', color: '#F87171', marginTop: '4px' }}>{errors.subject}</p>}
                      </div>

                      {/* Message */}
                      <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Message</label>
                        <textarea
                          name="message" value={form.message} onChange={handleChange} rows={5}
                          placeholder="Tell me about the opportunity or project..."
                          style={{ ...inputStyle(!!errors.message), width: '100%', resize: 'vertical', minHeight: '120px', lineHeight: 1.6 }}
                          onFocus={e => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.6)' : 'rgba(79,142,247,0.5)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                          onBlur={e =>  { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                        />
                        {errors.message && <p style={{ fontSize: '11px', color: '#F87171', marginTop: '4px' }}>{errors.message}</p>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit" disabled={sending}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', background: sending ? 'rgba(79,142,247,0.6)' : '#4F8EF7', color: '#fff', borderRadius: '11px', fontSize: '14px', fontWeight: 500, cursor: sending ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                        onMouseEnter={e => { if (!sending) { e.currentTarget.style.background = '#3a7de0'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,142,247,0.35)'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = sending ? 'rgba(79,142,247,0.6)' : '#4F8EF7'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        {sending ? (
                          <>
                            <span style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                            Opening email client…
                          </>
                        ) : (
                          <><Send size={14} /> Send via Email Client</>
                        )}
                      </button>

                      <p style={{ textAlign: 'center', fontSize: '11px', color: '#4A4A6A', marginTop: '12px', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}>
                        Opens Gmail or your default mail app · Reply within 24 hours
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </RevealWrapper>

          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Contact;

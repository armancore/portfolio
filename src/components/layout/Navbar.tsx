import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import { NAV_LINKS, NAV_COPY } from '../../constants';
import { DURATION, EASE } from '../../lib/motion';

const SHEET_ID = 'nav-sheet';

/**
 * The bar is sticky rather than fixed, so it takes part in the flow and no page
 * has to reserve room for it. It carries no radius, no blur, no nested pills
 * and no boxed control: the wordmark, the routes and one action are all plain
 * type on the page's own grid, separated by space rather than by borders.
 */
const Navbar = () => {
  const scrolled = useScrolled(80);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /**
   * Scroll lock. Without it the page scrolls behind the open sheet, so closing
   * the menu returns the reader somewhere they never chose to be.
   *
   * The lock goes on the documentElement, not the body: <html> is the scrolling
   * element here, and hiding the body's overflow leaves the page scrolling
   * exactly as before. The body is locked too for the browsers that disagree
   * about which of the two owns the viewport scroll. `scrollbar-gutter: stable`
   * is already set on <html>, so removing the scrollbar shifts nothing.
   */
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const root = document.documentElement;
    const previousRoot = root.style.overflow;
    const previousBody = document.body.style.overflow;
    // Hiding the overflow makes the document unscrollable, which clamps its
    // scroll position to 0. The sheet covers the viewport so nobody sees that
    // happen -- but without restoring it, closing the menu would leave the
    // reader at the top of a page they were halfway down.
    const restoreTo = window.scrollY;

    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousRoot;
      document.body.style.overflow = previousBody;
      window.scrollTo({ top: restoreTo, behavior: 'instant' });
    };
  }, [isMenuOpen]);

  /**
   * Focus trap and Escape. The trap spans the whole header, not just the sheet,
   * because the close control lives in the bar -- trapping inside the sheet
   * alone would put the only way out beyond reach of the keyboard.
   *
   * Focusables are read on every keystroke rather than cached: the desktop
   * links are display:none at this breakpoint, and offsetParent is what tells
   * them apart from the sheet's own links.
   */
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const header = headerRef.current;
    if (!header) return undefined;

    const focusables = () =>
      Array.from(
        header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((element) => element.offsetParent !== null);

    // Focus lands on the first route in the sheet, not on the close control --
    // the reader opened the menu to go somewhere.
    const sheet = header.querySelector<HTMLElement>(`#${SHEET_ID}`);
    const firstInSheet = sheet?.querySelector<HTMLElement>('a[href]');
    (firstInSheet ?? toggleRef.current)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
        // Return focus to the control that opened it, not to the document.
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !header.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !header.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header ref={headerRef} className="nav-bar" data-scrolled={scrolled || undefined}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nav-row">
          <Link to="/" className="nav-wordmark">
            {NAV_COPY.wordmark}
          </Link>

          <nav className="nav-links" aria-label={NAV_COPY.primaryLabel}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                data-active={isActive(link.path) || undefined}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/contact" className="nav-cta">
              {NAV_COPY.cta}
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? NAV_COPY.closeMenu : NAV_COPY.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls={SHEET_ID}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id={SHEET_ID}
            className="nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.move, ease: EASE }}
          >
            <nav aria-label={NAV_COPY.mobileLabel}>
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-sheet__link"
                  data-active={isActive(link.path) || undefined}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="nav-sheet__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Link>
              ))}
            </nav>

            <Link to="/contact" className="nav-sheet__cta" onClick={() => setIsMenuOpen(false)}>
              {NAV_COPY.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

// Shared animation variants for Framer Motion / Motion for React

export const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeDown: any = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeLeft: any = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeRight: any = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleInSpring: any = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

export const slideInFromBottom: any = {
  hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const rotateIn: any = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0): any => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const staggerFast = (delayChildren = 0): any => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren } },
});

// For hero entrance (fires immediately, no scroll)
export const heroVariants: any = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Blur-in text reveal
export const blurIn: any = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Card flip/reveal
export const cardReveal: any = {
  hidden: { opacity: 0, y: 32, rotateX: 8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Viewport config used across all scroll-triggered sections
export const viewport: any = { once: true, amount: 0.1 };
export const viewportEarly: any = { once: true, amount: 0.05 };

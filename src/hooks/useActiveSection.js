import { useState, useEffect } from 'react';

const useActiveSection = (sectionIds = []) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0
        }
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds.join(',')]);

  return activeSection;
};

export default useActiveSection;

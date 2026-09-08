import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset all elements on route change
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => el.classList.remove('revealed'));

    // Small delay to allow DOM to settle
    const timeout = setTimeout(() => {
      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      const newElements = document.querySelectorAll('[data-reveal]');
      newElements.forEach((el) => observerRef.current?.observe(el));
    }, 50);

    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  }, [location.pathname]);
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Get the last known scroll position from sessionStorage
    const lastScroll = sessionStorage.getItem(`scroll_${pathname}`);
    if (lastScroll) {
      window.scrollTo(0, parseInt(lastScroll));
      sessionStorage.removeItem(`scroll_${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {
    // Save scroll position before navigation
    const handleScroll = () => {
      sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return null;
}
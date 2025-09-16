import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Always scroll to the top smoothly when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'smooth' });
  }, [pathname]);
  return null;
}

export default ScrollToTop;

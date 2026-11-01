import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SpatialDirection } from '../types/site';
import { useRandomDirection } from './useRandomDirection';

interface NavigationContextType {
  currentDirection: SpatialDirection;
  isTransitioning: boolean;
  navigateTo: (path: string) => void;
  reducedMotion: boolean;
  activePath: string;
}

export const NavigationContext = createContext<NavigationContextType>({
  currentDirection: 'bottom-right',
  isTransitioning: false,
  navigateTo: () => {},
  reducedMotion: false,
  activePath: '/',
});

export const useNavigationContext = () => useContext(NavigationContext);

export const useNavigationController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentDirection, pickNextDirection } = useRandomDirection();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const navigateTo = useCallback(
    (targetPath: string) => {
      if (location.pathname === targetPath || isTransitioning) {
        return;
      }

      // Pick a random spatial direction for this transition
      pickNextDirection();
      setIsTransitioning(true);

      // Trigger navigation immediately: Framer Motion AnimatePresence mode="wait"
      // keeps the existing component mounted for its full exit animation,
      // and only mounts & fades in the new component after the old one has exited!
      navigate(targetPath);

      // Reset transition lock once the entrance animation has settled
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);

      return () => clearTimeout(timer);
    },
    [location.pathname, isTransitioning, pickNextDirection, navigate]
  );

  return {
    currentDirection,
    isTransitioning,
    navigateTo,
    reducedMotion,
    activePath: location.pathname,
  };
};

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigationContext } from '../../hooks/useNavigation';
import { getDirectionOffsets } from '../../hooks/useRandomDirection';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { currentDirection, reducedMotion } = useNavigationContext();

  // Compute direction offsets dynamically
  const { exit, enterFrom } = useMemo(() => {
    return getDirectionOffsets(currentDirection, 35);
  }, [currentDirection]);

  // Framer motion variants respecting prefers-reduced-motion
  const variants = useMemo(() => {
    if (reducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.4, ease: 'easeOut' as const },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeIn' as const },
        },
      };
    }

    return {
      initial: {
        x: enterFrom.x,
        y: enterFrom.y,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(8px)',
      },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.85,
          // Sophisticated editorial spring-like bezier
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
      exit: {
        x: exit.x,
        y: exit.y,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(10px)',
        transition: {
          duration: 0.6,
          ease: [0.7, 0, 0.84, 0] as [number, number, number, number],
        },
      },
    };
  }, [enterFrom, exit, reducedMotion]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.canvasContainer}
    >
      {children}
    </motion.div>
  );
};

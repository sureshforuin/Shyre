import { useState, useCallback, useRef } from 'react';
import { SpatialDirection, DirectionOffset } from '../types/site';

export const SPATIAL_DIRECTIONS: SpatialDirection[] = [
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

/**
 * Returns pixel or viewport coordinate shifts for the exit movement
 * based on direction.
 */
export const getDirectionOffsets = (
  direction: SpatialDirection,
  magnitude = 100
): { exit: DirectionOffset; enterFrom: DirectionOffset } => {
  switch (direction) {
    case 'top':
      return {
        exit: { x: 0, y: `-${magnitude}vh` },
        enterFrom: { x: 0, y: `${magnitude}vh` },
      };
    case 'bottom':
      return {
        exit: { x: 0, y: `${magnitude}vh` },
        enterFrom: { x: 0, y: `-${magnitude}vh` },
      };
    case 'left':
      return {
        exit: { x: `-${magnitude}vw`, y: 0 },
        enterFrom: { x: `${magnitude}vw`, y: 0 },
      };
    case 'right':
      return {
        exit: { x: `${magnitude}vw`, y: 0 },
        enterFrom: { x: `-${magnitude}vw`, y: 0 },
      };
    case 'top-left':
      return {
        exit: { x: `-${magnitude * 0.75}vw`, y: `-${magnitude * 0.75}vh` },
        enterFrom: { x: `${magnitude * 0.75}vw`, y: `${magnitude * 0.75}vh` },
      };
    case 'top-right':
      return {
        exit: { x: `${magnitude * 0.75}vw`, y: `-${magnitude * 0.75}vh` },
        enterFrom: { x: `-${magnitude * 0.75}vw`, y: `${magnitude * 0.75}vh` },
      };
    case 'bottom-left':
      return {
        exit: { x: `-${magnitude * 0.75}vw`, y: `${magnitude * 0.75}vh` },
        enterFrom: { x: `${magnitude * 0.75}vw`, y: `-${magnitude * 0.75}vh` },
      };
    case 'bottom-right':
    default:
      return {
        exit: { x: `${magnitude * 0.75}vw`, y: `${magnitude * 0.75}vh` },
        enterFrom: { x: `-${magnitude * 0.75}vw`, y: `-${magnitude * 0.75}vh` },
      };
  }
};

export const useRandomDirection = () => {
  const [currentDirection, setCurrentDirection] = useState<SpatialDirection>('bottom-right');
  const lastDirectionRef = useRef<SpatialDirection>('bottom-right');

  const pickNextDirection = useCallback((): SpatialDirection => {
    // Avoid immediate repetition
    const available = SPATIAL_DIRECTIONS.filter(
      (dir) => dir !== lastDirectionRef.current
    );
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex] || 'right';
    
    lastDirectionRef.current = selected;
    setCurrentDirection(selected);
    return selected;
  }, []);

  return {
    currentDirection,
    pickNextDirection,
  };
};

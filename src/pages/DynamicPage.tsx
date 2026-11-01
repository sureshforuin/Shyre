import React, { useMemo } from 'react';
import { PageConfig } from '../types/site';
import { SectionRenderer } from '../components/SectionRenderer/SectionRenderer';
import { Result, Button } from 'antd';
import { useNavigationContext } from '../hooks/useNavigation';
import { getDirectionOffsets } from '../hooks/useRandomDirection';
import { motion } from 'framer-motion';

interface DynamicPageProps {
  pageConfig?: PageConfig;
  pageKey: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ pageConfig, pageKey }) => {
  const { navigateTo, currentDirection, reducedMotion } = useNavigationContext();

  const { enterFrom } = useMemo(() => {
    return getDirectionOffsets(currentDirection, 30);
  }, [currentDirection]);

  // If page is disabled or doesn't exist in JSON configuration
  if (!pageConfig || pageConfig.enabled === false) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <Result
          status="404"
          title="Page Unavailable"
          subTitle={`The page config for "${pageKey}" is currently deactivated or missing from site.json.`}
          extra={
            <Button type="primary" onClick={() => navigateTo('/')}>
              Return to Gallery Home
            </Button>
          }
        />
      </main>
    );
  }

  // Pure fade-in & spatial glide when the component mounts
  return (
    <motion.main
      initial={
        reducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: enterFrom.x,
              y: enterFrom.y,
              filter: 'blur(10px)',
              scale: 0.98,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      style={{
        width: '100%',
        minHeight: '80vh',
        willChange: 'transform, opacity, filter',
      }}
    >
      <SectionRenderer sections={pageConfig.sections} />
    </motion.main>
  );
};

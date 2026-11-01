import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';
import { BackgroundParticles } from '../components/BackgroundParticles/BackgroundParticles';
import { SiteMeta } from '../types/site';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  siteMeta: SiteMeta;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ siteMeta }) => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      {/* Persistent subtle background sprinkled particles */}
      <BackgroundParticles />

      <Navigation siteMeta={siteMeta} />
      <div className={styles.mainContent}>
        <Outlet key={location.pathname} />
        <Footer siteMeta={siteMeta} />
      </div>
    </div>
  );
};

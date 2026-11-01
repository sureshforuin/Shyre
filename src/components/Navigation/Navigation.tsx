import React, { useState } from 'react';
import { useNavigationContext } from '../../hooks/useNavigation';
import { SiteMeta } from '../../types/site';
import styles from './Navigation.module.scss';
import { CompassOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface NavigationProps {
  siteMeta: SiteMeta;
}

export const Navigation: React.FC<NavigationProps> = ({ siteMeta }) => {
  const { activePath, navigateTo, isTransitioning, currentDirection } = useNavigationContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (path === activePath || isTransitioning) return;
    setMobileMenuOpen(false);
    navigateTo(path);
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo & Brand Identity */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={styles.brand}
          >
            <div className={styles.logoBadge}>
              <img
                src={siteMeta.logo}
                alt={siteMeta.name}
                className={styles.logoImg}
              />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>{siteMeta.name}</span>
              <span className={styles.brandTagline}>{siteMeta.tagline}</span>
            </div>
          </a>

          {/* Floating Minimal Nav Capsule */}
          <nav className={styles.navCapsule} aria-label="Main Navigation">
            {siteMeta.navigation.map((item) => {
              const isActive = activePath === item.path;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`${styles.navLink} ${isActive ? styles.active : ''} ${
                    isTransitioning ? styles.disabled : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.linkLabel}>{item.label}</span>
                  {isActive && <span className={styles.activePill} />}
                </a>
              );
            })}
          </nav>

          {/* Spatial Canvas Mode Indicator & Action */}
          <div className={styles.actions}>
            <div
              className={styles.spatialIndicator}
              title={`Last spatial jump: ${currentDirection}`}
            >
              <CompassOutlined
                className={`${styles.compassIcon} ${
                  isTransitioning ? styles.spinning : ''
                }`}
              />
              <span className={styles.directionTag}>{currentDirection}</span>
            </div>

            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className={styles.inquireButton}
            >
              Commission
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileContent}>
            <div className={styles.mobileBrand}>
              <img
                src={siteMeta.logo}
                alt={siteMeta.name}
                className={styles.mobileLogo}
              />
              <h3>{siteMeta.name}</h3>
              <p>{siteMeta.tagline}</p>
            </div>
            <div className={styles.mobileLinks}>
              {siteMeta.navigation.map((item) => {
                const isActive = activePath === item.path;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                  >
                    <span>{item.label}</span>
                    <span className={styles.mobileArrow}>→</span>
                  </a>
                );
              })}
            </div>
            <div className={styles.mobileFooter}>
              <p>Multidirectional Spatial Navigation Active</p>
              <span>{siteMeta.est}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

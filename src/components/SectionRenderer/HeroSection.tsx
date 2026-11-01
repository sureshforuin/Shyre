import React from 'react';
import { HeroSectionData } from '../../types/site';
import { useNavigationContext } from '../../hooks/useNavigation';
import { ArrowRightOutlined, HeartFilled } from '@ant-design/icons';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  data: HeroSectionData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { navigateTo } = useNavigationContext();

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.editorialGrid}>
          {/* Left Column: Editorial Statement */}
          <div className={styles.textContent}>
            <div className={styles.brandBadge}>
              <HeartFilled className={styles.heartIcon} />
              <span>{data.tagline || 'ShyRe Creations'}</span>
            </div>

            <h1 className={`editorial-title ${styles.headline}`}>
              {data.heading}
            </h1>

            <p className={styles.leadText}>
              {data.description}
            </p>

            <div className={styles.actions}>
              {data.primaryAction && (
                <button
                  className={styles.primaryBtn}
                  onClick={() => navigateTo(data.primaryAction!.path)}
                >
                  <span>{data.primaryAction.label}</span>
                  <ArrowRightOutlined />
                </button>
              )}
              {data.secondaryAction && (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => navigateTo(data.secondaryAction!.path)}
                >
                  <span>{data.secondaryAction.label}</span>
                </button>
              )}
            </div>

            {data.stats && data.stats.length > 0 && (
              <div className={styles.statsStrip}>
                {data.stats.map((stat, i) => (
                  <div key={i} className={styles.statBox}>
                    <span className={styles.statNum}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Visual Centerpiece */}
          <div className={styles.visualContent}>
            <div className={styles.imageFrame}>
              <div className={styles.glowHalo} />
              <img
                src={data.image || '/images/logo.jpg'}
                alt="ShyRe Creations Masterpiece"
                className={styles.heroImg}
              />
              <div className={styles.floatingTag}>
                <span className={styles.tagDot} />
                <span>Made with love • Preserved forever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

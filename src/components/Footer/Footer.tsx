import React from 'react';
import { SiteMeta } from '../../types/site';
import { HeartFilled, CompassOutlined } from '@ant-design/icons';
import styles from './Footer.module.scss';
import { useNavigationContext } from '../../hooks/useNavigation';

interface FooterProps {
  siteMeta: SiteMeta;
}

export const Footer: React.FC<FooterProps> = ({ siteMeta }) => {
  const { navigateTo } = useNavigationContext();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandBox}>
            <div className={styles.brandTitleWrap}>
              <span className={styles.brandName}>{siteMeta.name}</span>
              <span className={styles.brandTagline}>{siteMeta.tagline}</span>
            </div>
            <p className={styles.desc}>{siteMeta.description}</p>
          </div>

          <div className={styles.navCols}>
            <div className={styles.col}>
              <span className={styles.colTitle}>Atelier Navigation</span>
              <div className={styles.colLinks}>
                {siteMeta.navigation.map((item) => (
                  <button
                    key={item.id}
                    className={styles.footerLink}
                    onClick={() => navigateTo(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.col}>
              <span className={styles.colTitle}>Direct Inquiry</span>
              <div className={styles.colLinks}>
                <a href={`mailto:${siteMeta.socials.email}`} className={styles.footerLink}>
                  {siteMeta.socials.email}
                </a>
                <span className={styles.contactNote}>{siteMeta.socials.whatsapp}</span>
                <span className={styles.contactNote}>Pan-India & International</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.spatialNote}>
            <CompassOutlined />
            <span>Multidirectional Parallax Spatial Engine Active</span>
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()} {siteMeta.name}. Crafted with{' '}
            <HeartFilled className={styles.heart} /> Preserved forever.
          </p>
        </div>
      </div>
    </footer>
  );
};

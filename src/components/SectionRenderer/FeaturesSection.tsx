import React from 'react';
import { FeatureListSectionData } from '../../types/site';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './FeaturesSection.module.scss';

interface FeaturesSectionProps {
  data: FeatureListSectionData;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ data }) => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          <h2 className={`editorial-title ${styles.title}`}>{data.title}</h2>
          {data.description && <p className={styles.desc}>{data.description}</p>}
        </div>

        <div className={styles.grid}>
          {data.items.map((item, idx) => (
            <div key={idx} className={styles.featureItem}>
              <div className={styles.iconBox}>
                <CheckCircleOutlined className={styles.icon} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

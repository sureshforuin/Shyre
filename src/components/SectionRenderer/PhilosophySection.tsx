import React from 'react';
import { PhilosophySectionData } from '../../types/site';
import styles from './PhilosophySection.module.scss';

interface PhilosophySectionProps {
  data: PhilosophySectionData;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ data }) => {
  return (
    <section className={styles.philosophySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          <h2 className={`editorial-title ${styles.title}`}>{data.title}</h2>
          <p className={styles.statement}>{data.statement}</p>
        </div>

        <div className={styles.valuesGrid}>
          {data.values.map((val) => (
            <div key={val.number} className={styles.valueCard}>
              <span className={styles.valNumber}>{val.number}</span>
              <h3 className={styles.valTitle}>{val.title}</h3>
              <p className={styles.valDesc}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ImageSectionData } from '../../types/site';
import styles from './ImageSection.module.scss';

interface ImageSectionProps {
  data: ImageSectionData;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ data }) => {
  return (
    <section className={styles.imageSection}>
      <div className={styles.container}>
        <div className={styles.frame}>
          <img
            src={data.imageUrl}
            alt={data.title || 'ShyRe Creations artwork'}
            className={styles.image}
            loading="lazy"
          />
        </div>
        {(data.title || data.caption) && (
          <div className={styles.captionArea}>
            {data.title && <h4 className={styles.title}>{data.title}</h4>}
            {data.caption && <p className={styles.caption}>{data.caption}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

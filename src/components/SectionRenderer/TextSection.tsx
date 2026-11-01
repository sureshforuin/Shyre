import React from 'react';
import { TextSectionData } from '../../types/site';
import styles from './TextSection.module.scss';

interface TextSectionProps {
  data: TextSectionData;
}

export const TextSection: React.FC<TextSectionProps> = ({ data }) => {
  return (
    <section className={styles.textSection}>
      <div className={styles.container}>
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        <h2 className={`editorial-title ${styles.title}`}>{data.title}</h2>

        <div className={styles.contentGrid}>
          <div className={styles.paragraphs}>
            {data.paragraphs.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>

          {data.quote && (
            <div className={styles.quoteCard}>
              <div className={styles.quoteMark}>“</div>
              <blockquote className={styles.quoteText}>{data.quote}</blockquote>
              {data.quoteAuthor && (
                <cite className={styles.quoteAuthor}>— {data.quoteAuthor}</cite>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

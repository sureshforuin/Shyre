import React from 'react';
import { ProjectItem } from '../../types/site';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: ProjectItem;
  onClick: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <article
      className={styles.card}
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div className={styles.mediaContainer}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className={styles.thumbnail}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.inspectPill}>
            <span>View Archival Details</span>
            <ArrowRightOutlined />
          </span>
        </div>
        <span className={styles.yearBadge}>{project.year}</span>
      </div>

      <div className={styles.meta}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
    </article>
  );
};

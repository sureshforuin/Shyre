import React, { useState } from 'react';
import { ProjectGridSectionData, ProjectItem } from '../../types/site';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Modal, Tag } from 'antd';
import styles from './ProjectGrid.module.scss';
import siteConfig from '../../config/site.json';
import { Sparkles } from 'lucide-react';
import { useNavigationContext } from '../../hooks/useNavigation';

interface ProjectGridProps {
  data: ProjectGridSectionData;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ data }) => {
  const { navigateTo } = useNavigationContext();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filter only enabled projects from JSON configuration
  const allProjects = (siteConfig.projects as ProjectItem[]).filter(
    (p) => p.enabled !== false
  );

  const displayedProjects = data.limit
    ? allProjects.slice(0, data.limit)
    : allProjects;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
            <h2 className={`editorial-title ${styles.title}`}>{data.title}</h2>
          </div>
          {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}
        </div>

        <div className={styles.grid}>
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Project Detail Modal (Driven directly by JSON) */}
      <Modal
        open={!!selectedProject}
        onCancel={() => setSelectedProject(null)}
        footer={null}
        width={760}
        centered
        className={styles.projectModal}
      >
        {selectedProject && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeroImageWrap}>
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className={styles.modalHeroImage}
              />
              <span className={styles.modalYearTag}>
                {selectedProject.year} Archive
              </span>
            </div>

            <div className={styles.modalBody}>
              <span className={styles.modalCategory}>
                {selectedProject.category}
              </span>
              <h3 className={`editorial-title ${styles.modalTitle}`}>
                {selectedProject.title}
              </h3>

              {selectedProject.client && (
                <p className={styles.clientInfo}>
                  <strong>Commissioned For:</strong> {selectedProject.client}
                </p>
              )}

              <p className={styles.modalDesc}>
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {selectedProject.materials && (
                <div className={styles.materialsSection}>
                  <div className={styles.materialsLabel}>
                    <Sparkles size={14} />
                    <span>Archival Materials & Techniques</span>
                  </div>
                  <div className={styles.materialsList}>
                    {selectedProject.materials.map((m, idx) => (
                      <Tag key={idx} className={styles.materialTag}>
                        {m}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalFooterActions}>
                <button
                  type="button"
                  className={styles.orderSimilarBtn}
                  onClick={() => {
                    setSelectedProject(null);
                    navigateTo('/contact');
                  }}
                >
                  Commission a Similar Masterpiece
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

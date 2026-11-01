import React from 'react';
import { SectionData } from '../../types/site';
import { HeroSection } from './HeroSection';
import { TextSection } from './TextSection';
import { ImageSection } from './ImageSection';
import { FeaturesSection } from './FeaturesSection';
import { ProjectGrid } from './ProjectGrid';
import { ContactSection } from './ContactSection';
import { PhilosophySection } from './PhilosophySection';

/**
 * Safe Component Registry mapping JSON section types to React components.
 * Strictly prevents arbitrary HTML execution or unsafe evaluations.
 */
const SECTION_REGISTRY: Record<string, React.FC<{ data: any }>> = {
  hero: HeroSection,
  text: TextSection,
  image: ImageSection,
  features: FeaturesSection,
  projectGrid: ProjectGrid,
  contact: ContactSection,
  philosophy: PhilosophySection,
};

interface SectionRendererProps {
  sections: SectionData[];
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => {
        const Component = SECTION_REGISTRY[section.type];
        if (!Component) {
          console.warn(`[SectionRenderer] Unrecognized section type: ${section.type}`);
          return null;
        }
        return <Component key={`${section.type}-${index}`} data={section} />;
      })}
    </>
  );
};

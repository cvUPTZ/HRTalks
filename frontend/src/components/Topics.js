// src/components/Topics.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTrail, animated, useSpring } from 'react-spring';

const TopicsWrapper = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TopicItem = styled(animated.div)`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    background-color: ${props => props.theme.colors.primary};
  }
`;

const TopicTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const TopicDescription = styled(animated.p)`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const topics = [
  { title: 'Recrutement', description: 'Stratégies et meilleures pratiques pour attirer les meilleurs talents.' },
  { title: 'Rémunération', description: 'Politiques salariales équitables et compétitives.' },
  { title: 'Code de travail', description: 'Comprendre et appliquer la législation du travail algérienne.' },
  { title: 'Droit social', description: 'Aspects juridiques des relations employeur-employé.' },
  { title: 'Innovation RH', description: 'Nouvelles technologies et tendances dans la gestion des ressources humaines.' },
  { title: 'Intégration RH', description: 'Processus d\'accueil et d\'intégration des nouveaux employés.' },
];

function Topics() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const trail = useTrail(topics.length, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 10 },
  });

  const descriptionSpring = useSpring({
    opacity: hoveredIndex !== null ? 1 : 0,
    transform: hoveredIndex !== null ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 300, friction: 10 },
  });

  return (
    <TopicsWrapper>
      <Title>Nos sujets</Title>
      <TopicGrid>
        {trail.map((props, index) => (
          <TopicItem
            key={topics[index].title}
            style={props}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <TopicTitle>{topics[index].title}</TopicTitle>
            {hoveredIndex === index && (
              <TopicDescription style={descriptionSpring}>
                {topics[index].description}
              </TopicDescription>
            )}
          </TopicItem>
        ))}
      </TopicGrid>
    </TopicsWrapper>
  );
}

export default Topics;
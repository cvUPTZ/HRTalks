// src/components/About.js
import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.section`
  margin: 4rem 0;
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

function About() {
  return (
    <AboutWrapper>
      <Title>À propos de #HRtalksDZ</Title>
      <Content>
        #HRtalksDZ est le meilleur endroit où vous bénéficierez des connaissances 
        et du savoir-faire des experts RH algériens. Nos invités dans chaque épisode 
        partageront avec vous leurs expériences et répondront à vos questions, 
        en garantissant que vous disposerez d'une information claire, directe et crédible.
      </Content>
    </AboutWrapper>
  );
}

export default About;
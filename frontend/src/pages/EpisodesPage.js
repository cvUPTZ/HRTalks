// src/pages/EpisodesPage.js
// src/pages/EpisodesPage.js
import React from 'react';
import styled from 'styled-components';
import EpisodeList from '../components/EpisodeList';

const EpisodesPageWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

function EpisodesPage() {
  return (
    <EpisodesPageWrapper>
      <Title>Nos épisodes</Title>
      <EpisodeList />
    </EpisodesPageWrapper>
  );
}

export default EpisodesPage;
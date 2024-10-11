// src/components/EpisodeList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EpisodeListWrapper = styled.div`
  margin: 2rem 0;
`;

const EpisodeItem = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EpisodeTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const EpisodeDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/episodes')
      .then(response => {
        setEpisodes(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <EpisodeListWrapper>
      {episodes.map(episode => (
        <EpisodeItem key={episode._id}>
          <EpisodeTitle>{episode.title}</EpisodeTitle>
          <EpisodeDescription>{episode.description}</EpisodeDescription>
        </EpisodeItem>
      ))}
    </EpisodeListWrapper>
  );
}

export default EpisodeList;
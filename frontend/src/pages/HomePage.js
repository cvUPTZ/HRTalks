// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Hero from '../components/Hero';
import About from '../components/About';
import Topics from '../components/Topics';

const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

function HomePage() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn}>
      <HomeWrapper>
        <Hero />
        <About />
        <Topics />
      </HomeWrapper>
    </animated.div>
  );
}

export default HomePage;
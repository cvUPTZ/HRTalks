// src/components/Hero.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const HeroWrapper = styled.section`
  text-align: center;
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.background};
`;

const Title = styled(animated.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const Subtitle = styled(animated.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.secondary};
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

function Hero() {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 10 },
  });

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 10 },
    delay: 300,
  });

  return (
    <HeroWrapper>
      <Title style={titleAnimation}>#HRtalksDZ</Title>
      <Subtitle style={subtitleAnimation}>
        Le Podcast dédié aux professionnels RH Algériens
      </Subtitle>
      <Button>Écoutez maintenant</Button>
    </HeroWrapper>
  );
}

export default Hero;

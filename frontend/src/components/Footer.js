// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.background};
  padding: 2rem;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.5rem;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;
function Footer() {
  return (
    <FooterWrapper>
      <p>&copy; 2024 #HRtalksDZ. Tous droits réservés.</p>
      <SocialIcons>
        <SocialIcon href="#"><FaFacebook /></SocialIcon>
        <SocialIcon href="#"><FaTwitter /></SocialIcon>
        <SocialIcon href="#"><FaLinkedin /></SocialIcon>
      </SocialIcons>
    </FooterWrapper>
  );
}

export default Footer;

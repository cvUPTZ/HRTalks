// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png'; // Import your logo image

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.tertiary};
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 50px; // Adjust this value to fit your logo size
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.secondary};
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Nav>
        <Logo to="/">
          <LogoImage src={logoImage} alt="#HRtalksDZ Logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/episodes">Épisodes</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
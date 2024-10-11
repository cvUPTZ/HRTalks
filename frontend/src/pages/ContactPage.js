// src/pages/ContactPage.js
import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';  // Make sure this import is correct

const ContactPageWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

function ContactPage() {
  return (
    <ContactPageWrapper>
      <Title>Contactez-nous</Title>
      <ContactForm />
    </ContactPageWrapper>
  );
}

export default ContactPage;  // Make sure this line is present
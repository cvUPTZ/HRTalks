// src/components/ContactForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 2rem auto;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  height: 150px;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Votre nom"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextArea
        name="message"
        placeholder="Votre message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <SubmitButton type="submit">Envoyer</SubmitButton>
    </FormWrapper>
  );
}

export default ContactForm;
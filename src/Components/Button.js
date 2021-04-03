import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  background-color: ${(props) => props.theme.blueColor};
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: center;
  padding: 7px 7px;
  cursor: pointer;
`;

const Button = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;

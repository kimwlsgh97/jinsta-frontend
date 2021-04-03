import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  margin-top: 5px;
`;

export const LinkBlue = ({ text, onClick }) => {
  return <Container onClick={onClick}>{text}</Container>;
};

LinkBlue.propTypes = {
  text: PropTypes.string.isRequired,
};

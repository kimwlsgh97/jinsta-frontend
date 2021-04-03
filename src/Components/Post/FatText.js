import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  color: ${(props) => props.theme.blackColor};
  font-weight: 600;
  font-size: ${(props) => props.size};
  margin-right: 5px;
`;

const FatText = ({ text, size }) => <Text size={`${size}px`}>{text}</Text>;

FatText.propTypes = { text: PropTypes.string.isRequired };

export default FatText;

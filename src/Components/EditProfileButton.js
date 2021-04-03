import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 5px 10px;
  margin-left: 20px;
  :focus {
    opacity: 0.7;
    outline: none;
  }
`;

const EditProfileButton = () => {
  return (
    <Link to="/EditProfile">
      <Button>EditProfile</Button>
    </Link>
  );
};

export default EditProfileButton;

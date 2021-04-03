import styled from "styled-components";

const LinkC = styled.button`
  cursor: pointer;
  :focus {
    outline: none;
  }
  border: none;
  background-color: white;
  color: ${(props) => props.theme.darkBlueColor};
  padding: 0;
`;

export default LinkC;

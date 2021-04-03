import React from "react";
import styled from "styled-components";
import TextareaAutoSize from "react-textarea-autosize";

const Button = styled.span`
  margin-right: 10px;
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  cursor: pointer;
  opacity: 0.6;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Textarea = styled(TextareaAutoSize)`
  width: 90%;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
  :focus + ${Button} {
    opacity: 1;
  }
  padding: 20px 17px;
  opacity: 0.6;
`;

export default ({
  placeholder,
  value,
  onChange,
  onKeyPress,
  onClick,
  buttonView,
}) => {
  return (
    <Wrapper>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Button onClick={onClick}>{buttonView}</Button>
    </Wrapper>
  );
};

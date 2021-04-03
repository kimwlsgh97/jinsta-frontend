import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../Components/Input";
import FatText from "../../Components/Post/FatText";
import Avatar from "../../Components/Post/Avatar";
import { LinkBlue } from "../../Components/LinkBlue";
import Button from "../../Components/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`;
const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  display: flex;
`;

const Menu = styled.div`
  width: 240px;
  border-right: ${(props) => props.theme.boxBorder};
`;
const MenuBox = styled.li`
  width: 100%;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-left: 2px solid black;
`;

const Meta = styled.div`
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const Inputs = styled.ul`
  display: flex;
  flex-direction: column;
`;
const InputBar = styled.li`
  display: flex;
  margin-bottom: 20px;
`;
const LeftBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 165px;
  margin-right: 30px;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Submit = styled(InputBar)``;

const FullPostPresenter = ({
  username,
  avatar,
  firstName,
  lastName,
  bio,
  onPosted,
  data,
}) => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <MenuBox>EditProfile</MenuBox>
        </Menu>
        <Meta>
          <Header>
            <LeftBox>
              <Avatar size="sm" url={data.me.avatar} />
            </LeftBox>
            <RightBox>
              <FatText text={data.me.username} size="18" />
              <LinkBlue
                text="Edit Avatar"
                onClick={() => console.log("click")}
              />
            </RightBox>
          </Header>
          <Inputs>
            <InputBar>
              <LeftBox>
                <FatText text="username" />
              </LeftBox>
              <RightBox>
                <Input placeholder={data.me.username} {...username} />
              </RightBox>
            </InputBar>
            <InputBar>
              <LeftBox>
                <FatText text="firstname" />
              </LeftBox>
              <RightBox>
                <Input placeholder={data.me.firstName} {...firstName} />
              </RightBox>
            </InputBar>
            <InputBar>
              <LeftBox>
                <FatText text="lastname" />
              </LeftBox>
              <RightBox>
                <Input placeholder={data.me.lastName} {...lastName} />
              </RightBox>
            </InputBar>
            <InputBar>
              <LeftBox>
                <FatText text="bio" />
              </LeftBox>
              <RightBox>
                <Input placeholder={data.me.bio} {...bio} />
              </RightBox>
            </InputBar>
          </Inputs>
          <Submit>
            <LeftBox></LeftBox>
            <RightBox>
              <Button text="Submit" onClick={onPosted} />
            </RightBox>
          </Submit>
        </Meta>
      </Wrapper>
    </Container>
  );
};

export default FullPostPresenter;

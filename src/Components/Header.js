import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import useInput from "../Hooks/useInput";
import {
  HomeI,
  MessageI,
  ExploreI,
  EmptyHeartI,
  FullHeartI,
  UserI,
  SendI,
  InstaI,
} from "./Icons";

const Header = styled.header`
  ${(props) => props.theme.whiteBox}
  width: 100%;
  border-radius: 0;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: ${(props) => props.theme.boxBorder};
  margin-bottom: 30px;
  padding: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: ${(props) => props.theme.maxWidth};
  justify-content: center;
  align-items: center;
`;

const HeaderColumn = styled.div`
  width: 30%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 85%;
  height: 30px;
  padding: 0 7px;
  text-align: center;
  font-size: 14px;
  &::placeholder {
    opacity: 0.6;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const ME = gql`
  {
    me {
      username
    }
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/Search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <InstaI />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              placeholder={"검색"}
              value={search.value}
              onChange={search.onChange}
            ></SearchInput>
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <HomeI />
          </HeaderLink>
          <HeaderLink to="/Send">
            <SendI />
          </HeaderLink>
          <HeaderLink to="/Explore">
            <ExploreI />
          </HeaderLink>
          <HeaderLink to="/Notification">
            <EmptyHeartI />
          </HeaderLink>
          {!data ? (
            <HeaderLink to="/">
              <UserI />
            </HeaderLink>
          ) : (
            <HeaderLink to={`/user/${data.me.username}`}>
              <UserI />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

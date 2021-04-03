import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Post/Avatar";
import FatText from "./Post/FatText";
import Button from "./Button";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { FullHeartI, FillCommentI } from "./Icons";

const Card = styled.div`
  ${(props) => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 10px;
`;

const ELink = styled(Link)`
  margin-bottom: 10px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: white;
    width: 18px;
    height: 18px;
  }
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Container = styled(Link)`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    margin-right: 40px;
  }
`;

const NumberText = styled.div`
  color: white;
  font-weight: 600;
  margin-left: 7px;
`;

export const UserCard = ({
  id,
  username,
  fullName,
  isFollowing,
  url,
  isSelf,
  followingCount = 0,
  followersCount = 0,
}) => (
  <Card>
    <EAvatar size="md" url={url} />
    <ELink to={`/user/${username}`}>
      <FatText text={username} />
    </ELink>

    {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
    {isSelf && <Button text="Edit Profile" />}
  </Card>
);

export const PostCard = ({ file, likeCounts, commentCounts, postId }) => (
  <Container bg={file} to={`/post/${postId}`}>
    <Overlay>
      <Number>
        <FullHeartI />
        <NumberText>{likeCounts}</NumberText>
      </Number>
      <Number>
        <FillCommentI />
        <NumberText>{commentCounts}</NumberText>
      </Number>
    </Overlay>
  </Container>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string,
  isSelf: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  intro: PropTypes.string,
  followingCount: PropTypes.number,
  followersCount: PropTypes.number,
};

PostCard.propTypes = {
  file: PropTypes.string.isRequired,
  likeCounts: PropTypes.number.isRequired,
  commentCounts: PropTypes.number.isRequired,
};

import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Post/Avatar";
import FollowButton from "../../Components/FollowButton";
import {
  MoreIcon,
  CircleI,
  EmptyHeartI,
  FullHeartI,
  CommentI,
  MarkI,
  SendI,
} from "../../Components/Icons";
import NewCommentBar from "../../Components/NewCommentBar";
import FatText from "../../Components/Post/FatText";
import { Link } from "react-router-dom";
import EditProfileButton from "../../Components/EditProfileButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 814px;
  display: flex;
`;

const File = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 500px;
  height: 500px;
  border-radius: ${(props) => props.theme.boxBorder};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 335px;
`;
const HeaderColumn = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 17px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;
const CommentsColumn = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 17px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;
const ContentsColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 17px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
`;
const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const BottomBox = styled.div``;
const Timestamp = styled.div`
  font-size: 12px;
  opacity: 0.5;
  margin-top: 10px;
`;
const EAvatar = styled(Avatar)`
  margin-right: 17px;
`;
const Spot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
`;

const Comments = styled.ul`
  max-height: 220px;
  flex-grow: 1;
  overflow-y: scroll;
  list-style: none;
  align-items: stretch;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;
const Comment = styled.li`
  display: flex;
  align-items: center;
  &:not(last-child) {
    margin-bottom: 15px;
  }
`;
const Button = styled.span`
  cursor: pointer;
  margin-right: 10px;
`;
const FullPostPresenter = ({
  newComment,
  onKeyPress,
  onPosted,
  selfComments,
  comments,
  files,
  likeCountsS,
  user,
  createdAt,
  isLikedS,
  toggleLike,
}) => {
  return (
    <Container>
      <Wrapper>
        <File src={files[0].url} />
        <Contents>
          <HeaderColumn>
            <LeftBox>
              <EAvatar size="sm" url={user.avatar} />
              <Link to={`/user/${user.username}`}>
                <FatText text={user.username}></FatText>
              </Link>

              {user && !user.isSelf && (
                <>
                  <Spot>
                    <CircleI />
                  </Spot>
                  <FollowButton isFollowing={user.isFollowing} id={user.id} />
                </>
              )}
            </LeftBox>
            <RightBox>
              <MoreIcon />
            </RightBox>
          </HeaderColumn>
          <CommentsColumn>
            <Comments>
              {comments.map((comment, index) => (
                <Comment key={index}>
                  <EAvatar size="sm" url={comment.user.avatar} />
                  <Link to={`/user/${comment.user.username}`}>
                    <FatText text={comment.user.username}></FatText>
                  </Link>
                  {comment.text}
                </Comment>
              ))}
              {selfComments.map((comment, index) => (
                <Comment key={index}>
                  <EAvatar size="sm" url={user.avatar} />
                  <Link to={`/user/${user.username}`}>
                    <FatText text={user.username}></FatText>
                  </Link>
                  {comment.text}
                </Comment>
              ))}
            </Comments>
          </CommentsColumn>
          <ContentsColumn>
            <TopBox>
              <LeftBox>
                <Button onClick={toggleLike}>
                  {isLikedS ? <FullHeartI color="#ED4956" /> : <EmptyHeartI />}
                </Button>
                <Button>
                  <CommentI />
                </Button>
                <Button>
                  <SendI />
                </Button>
              </LeftBox>
              <RightBox>
                <Button>
                  <MarkI />
                </Button>
              </RightBox>
            </TopBox>
            <BottomBox>
              <FatText
                text={likeCountsS === 1 ? "1 like" : `${likeCountsS} like`}
              />
              <Timestamp>{createdAt}</Timestamp>
            </BottomBox>
          </ContentsColumn>
          <NewCommentBar
            placeholder="Add a Comment..."
            value={newComment.value}
            onChange={newComment.onChange}
            onKeyPress={onKeyPress}
            onClick={onPosted}
            buttonView="Post"
          />
        </Contents>
      </Wrapper>
    </Container>
  );
};

export default FullPostPresenter;

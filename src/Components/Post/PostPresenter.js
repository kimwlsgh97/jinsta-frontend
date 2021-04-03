import React from "react";
import styled from "styled-components";
import FatText from "./FatText";
import Avatar from "./Avatar";
import {
  FullHeartI,
  EmptyHeartI,
  CommentI,
  SendI,
  MarkI,
  MoreIcon,
} from "../Icons";
import LinkC from "../LinkC";
import { Link } from "react-router-dom";
import NewCommentBar from "../NewCommentBar";

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  max-width: 600px;
  width: 100%;
  margin-bottom: 60px;
  user-select: none;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 14px;
`;
const LeftBox = styled.div`
  display: flex;
`;
const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 14px;
`;
const Location = styled.span`
  padding-top: 5px;
`;
const Files = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  flex-shrink: 0;
  background-color: black;
`;
const File = styled.img`
  max-width: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Meta = styled.div`
  padding: 10px 15px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const Button = styled.span`
  cursor: pointer;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ${Button} {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const Like = styled.div`
  margin-bottom: 10px;
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  display: block;
  font-weight: 300;
  font-size: 12px;
  opacity: 0.5;
`;

export default ({
  id,
  location,
  caption,
  user: { username, avatar },
  files,
  likes,
  comments,
  commentCounts,
  likeCounts,
  createdAt,
  newComment,
  currentItem,
  isLikedS,
  toggleLike,
  onKeyPress,
  onPosted,
  selfComments,
  showComments,
  onShowComments,
  onClicked,
}) => {
  const commentB = document.getElementById("trigger");
  return (
    <Post>
      <Header>
        <LeftBox>
          <Avatar size="sm" url={avatar} />
          <UserColumn>
            <Link to={`/user/${username}`}>
              <FatText text={username}></FatText>
            </Link>
            <Location>{location}</Location>
          </UserColumn>
        </LeftBox>
        <RightBox>
          <Button>
            <MoreIcon />
          </Button>
        </RightBox>
      </Header>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              key={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <LeftBox>
            <Button onClick={toggleLike}>
              {isLikedS ? <FullHeartI color="#ED4956" /> : <EmptyHeartI />}
            </Button>
            <Button>
              <Link to={`/post/${id}`}>
                <CommentI />
              </Link>
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
        </Buttons>
        <Like>
          <FatText text={likeCounts === 1 ? "1 like" : `${likeCounts} like`} />
        </Like>
        {commentCounts > 3 && showComments === 3 && (
          <LinkC onClick={onShowComments}>
            댓글{commentCounts}개 모두 보기
          </LinkC>
        )}
        {commentCounts > 3 && showComments > 3 && (
          <LinkC onClick={onShowComments}>가리기</LinkC>
        )}

        <Comments>
          {comments &&
            comments.slice(0, showComments).map((comment, index) => (
              <Comment key={index}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          {selfComments &&
            selfComments.map((comment, index) => (
              <Comment key={index}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
        </Comments>
        <Timestamp>{createdAt}</Timestamp>
      </Meta>
      <NewCommentBar
        id="trigger"
        placeholder="Add a Comment..."
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
        onClick={onPosted}
        buttonView="Post"
      />
    </Post>
  );
};

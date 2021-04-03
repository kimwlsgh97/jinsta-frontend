import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Post/Avatar";
import FollowButton from "../../Components/FollowButton";
import FatText from "../../Components/Post/FatText";
import { PostCard } from "../../Components/SearchCard";
import EditProfileButton from "../../Components/EditProfileButton";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
`;

const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 226px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonBar = styled.div`
  margin-left: 10px;
`;
const Username = styled.div`
  font-size: 27px;
`;

const MiddleBar = styled.div`
  display: flex;

  margin-bottom: 20px;
`;

const Counts = styled.ul`
  font-size: 16px;
  display: flex;
`;

const Count = styled.li`
  &:not(:last-child) {
    margin-right: 40px;
  }
`;
const FootBar = styled.div``;
const FullName = styled(FatText)`
  font-size: 18px;
`;
const Bio = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const Post = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
  padding-top: 30px;
  border-top: ${(props) => props.theme.boxBorder};
`;

const ProfilePresenter = ({ loading, data, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        followingCount,
        followersCount,
        postCounts,
        posts,
        bio,
      },
    } = data;
    return (
      <Wrapper>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <TopBar>
              <Username>{username}</Username>
              {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
              {isSelf && (
                <>
                  <EditProfileButton />
                  <ButtonBar>
                    <Button onClick={logOut} text="Log Out" />
                  </ButtonBar>
                </>
              )}
            </TopBar>
            <MiddleBar>
              <Counts>
                <Count>
                  Post <FatText text={String(postCounts)} />
                </Count>
                <Count>
                  Followers <FatText text={String(followersCount)} />
                </Count>
                <Count>
                  Following <FatText text={String(followingCount)} />
                </Count>
              </Counts>
            </MiddleBar>
            <FootBar>
              <FullName text={fullName} />
              <Bio>{bio}</Bio>
            </FootBar>
          </HeaderColumn>
        </Header>
        <Post>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              file={post.files[0].url}
              postId={post.id}
              likeCounts={post.likeCounts}
              commentCounts={post.commentCounts}
            />
          ))}
        </Post>
      </Wrapper>
    );
  }
};

export default ProfilePresenter;

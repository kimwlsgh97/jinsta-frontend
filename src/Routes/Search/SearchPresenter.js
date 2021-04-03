import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/Post/FatText";
import Loader from "../../Components/Loader";
import { UserCard, PostCard } from "../../Components/SearchCard";

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
`;

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  margin-bottom: 50px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
`;

const SearchPresenter = ({ term, loading, data }) => {
  if (term === undefined || term === "") {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No users found" />
          ) : (
            data.searchUser.map((user, index) => (
              <UserCard
                key={index}
                id={user.id}
                username={user.username}
                fullName={user.fullName}
                intro={user.intro}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No photos found" />
          ) : (
            data.searchPost.map((post, index) => (
              <PostCard
                key={index}
                file={post.files[0].url}
                postId={post.id}
                likeCounts={post.likeCounts}
                commentCounts={post.commentCounts}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <FatText text="No result" />
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  term: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;

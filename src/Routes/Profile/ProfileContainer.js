import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePresenter from "./ProfilePresenter";
import Helmet from "react-helmet";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      bio
      avatar
      username
      fullName
      isFollowing
      isSelf
      followingCount
      followersCount
      postCounts
      posts {
        files {
          url
        }
        likeCounts
        commentCounts
        id
      }
    }
  }
`;
const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    return (
      <>
        <Helmet>
          <title>Profile | Jinsta</title>
        </Helmet>
        <ProfilePresenter loading={loading} data={data} logOut={logOut} />
      </>
    );
  }
);

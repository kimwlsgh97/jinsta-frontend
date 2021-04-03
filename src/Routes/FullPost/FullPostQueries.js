import { gql } from "apollo-boost";

export const FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      user {
        id
        avatar
        username
        isFollowing
        isSelf
      }
      files {
        url
      }
      comments {
        text
        user {
          avatar
          username
        }
      }
      likeCounts
      createdAt
    }
    isLiked(id: $id)
  }
`;

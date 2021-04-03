import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      files {
        url
      }
      likeCounts
      commentCounts
      id
    }
    searchUser(term: $term) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      followingCount
      followersCount
    }
  }
`;

import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
      avatar
      username
      firstName
      lastName
      bio
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editUser(
    $avatar: String
    $username: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      avatar: $avatar
      username: $username
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      avatar
      username
      firstName
      lastName
      bio
    }
  }
`;

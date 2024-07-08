import { graphql } from "@/gql";

export const ADD_USER_MUTATION = graphql(/* GraphQL */ `
  mutation AddUser($newUserData: NewUserInput!) {
    addUser(newUserData: $newUserData) {
      id
      username
      creationDate
    }
  }
`);

export const LOGIN_MUTATION = graphql(/* GraphQL */ `
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      user {
        id
        username
        creationDate
      }
      access_token
    }
  }
`);

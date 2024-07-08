import { graphql } from "@/gql";

export const GET_USERS_QUERY = graphql(/* GraphQL */ `
  query GetUsers {
    getUsers {
      id
      username
      creationDate
    }
  }
`);

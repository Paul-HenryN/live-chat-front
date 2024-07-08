import { graphql } from "@/gql";

export const GET_CONVERSATIONS_QUERY = graphql(/* GraphQL */ `
  query GetConversations {
    getConversations {
      id
      users {
        id
        username
        creationDate
      }
      messages {
        id
        content
        conversationId
        creationDate
        sender {
          id
          username
          creationDate
        }
        receiver {
          id
          username
          creationDate
        }
      }
    }
  }
`);

export const ADD_CONVERSATION_MUTATION = graphql(/* GraphQL */ `
  mutation AddConversation($newConversationData: NewConversationInput!) {
    addConversation(newConversationData: $newConversationData) {
      id
    }
  }
`);

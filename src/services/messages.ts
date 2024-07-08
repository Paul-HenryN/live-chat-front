import { graphql } from "@/gql";

export const GET_MESSAGES_QUERY = graphql(/* GraphQL */ `
  query GetMessages($getMessagesInput: GetMessagesInput!) {
    getMessages(getMessagesInput: $getMessagesInput) {
      id
      content
      sender {
        id
      }
      receiver {
        id
      }
    }
  }
`);

export const ADD_MESSAGE_MUTATION = graphql(/* GraphQL */ `
  mutation AddMessage($newMessageData: NewMessageInput!) {
    addMessage(newMessageData: $newMessageData)
  }
`);

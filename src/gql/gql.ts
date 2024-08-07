/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddUser($newUserData: NewUserInput!) {\n    addUser(newUserData: $newUserData) {\n      id\n      username\n      creationDate\n    }\n  }\n": types.AddUserDocument,
    "\n  mutation Login($authInput: AuthInput!) {\n    login(authInput: $authInput) {\n      user {\n        id\n        username\n        creationDate\n      }\n      access_token\n    }\n  }\n": types.LoginDocument,
    "\n  query GetConversations {\n    getConversations {\n      id\n      users {\n        id\n        username\n        creationDate\n      }\n      messages {\n        id\n        content\n        conversationId\n        creationDate\n        sender {\n          id\n          username\n          creationDate\n        }\n        receiver {\n          id\n          username\n          creationDate\n        }\n      }\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation AddConversation($newConversationData: NewConversationInput!) {\n    addConversation(newConversationData: $newConversationData) {\n      id\n    }\n  }\n": types.AddConversationDocument,
    "\n  query GetMessages($getMessagesInput: GetMessagesInput!) {\n    getMessages(getMessagesInput: $getMessagesInput) {\n      id\n      content\n      sender {\n        id\n      }\n      receiver {\n        id\n      }\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation AddMessage($newMessageData: NewMessageInput!) {\n    addMessage(newMessageData: $newMessageData)\n  }\n": types.AddMessageDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      creationDate\n    }\n  }\n": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUser($newUserData: NewUserInput!) {\n    addUser(newUserData: $newUserData) {\n      id\n      username\n      creationDate\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($newUserData: NewUserInput!) {\n    addUser(newUserData: $newUserData) {\n      id\n      username\n      creationDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($authInput: AuthInput!) {\n    login(authInput: $authInput) {\n      user {\n        id\n        username\n        creationDate\n      }\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($authInput: AuthInput!) {\n    login(authInput: $authInput) {\n      user {\n        id\n        username\n        creationDate\n      }\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConversations {\n    getConversations {\n      id\n      users {\n        id\n        username\n        creationDate\n      }\n      messages {\n        id\n        content\n        conversationId\n        creationDate\n        sender {\n          id\n          username\n          creationDate\n        }\n        receiver {\n          id\n          username\n          creationDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConversations {\n    getConversations {\n      id\n      users {\n        id\n        username\n        creationDate\n      }\n      messages {\n        id\n        content\n        conversationId\n        creationDate\n        sender {\n          id\n          username\n          creationDate\n        }\n        receiver {\n          id\n          username\n          creationDate\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddConversation($newConversationData: NewConversationInput!) {\n    addConversation(newConversationData: $newConversationData) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddConversation($newConversationData: NewConversationInput!) {\n    addConversation(newConversationData: $newConversationData) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages($getMessagesInput: GetMessagesInput!) {\n    getMessages(getMessagesInput: $getMessagesInput) {\n      id\n      content\n      sender {\n        id\n      }\n      receiver {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($getMessagesInput: GetMessagesInput!) {\n    getMessages(getMessagesInput: $getMessagesInput) {\n      id\n      content\n      sender {\n        id\n      }\n      receiver {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMessage($newMessageData: NewMessageInput!) {\n    addMessage(newMessageData: $newMessageData)\n  }\n"): (typeof documents)["\n  mutation AddMessage($newMessageData: NewMessageInput!) {\n    addMessage(newMessageData: $newMessageData)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      creationDate\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      username\n      creationDate\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
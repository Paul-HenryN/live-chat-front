/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  users: Array<User>;
};

/** message  */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversationId: Scalars['ID']['output'];
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  receiver: User;
  sender: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addConversation: Conversation;
  addJobToQueue: Scalars['String']['output'];
  addMessage: Scalars['Boolean']['output'];
  addUser: User;
  login: AuthResponse;
};


export type MutationAddConversationArgs = {
  newConversationData: NewConversationInput;
};


export type MutationAddMessageArgs = {
  newMessageData: NewMessageInput;
};


export type MutationAddUserArgs = {
  newUserData: NewUserInput;
};


export type MutationLoginArgs = {
  authInput: AuthInput;
};

export type NewConversationInput = {
  interlocutorId: Scalars['ID']['input'];
};

export type NewMessageInput = {
  content: Scalars['String']['input'];
  conversationId: Scalars['ID']['input'];
  receiverId: Scalars['ID']['input'];
  senderId: Scalars['ID']['input'];
};

export type NewUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getConversations: Array<Conversation>;
  getMessages: Array<Message>;
  getUsers: Array<User>;
  health: Scalars['String']['output'];
  testRedis: Scalars['String']['output'];
};


export type QueryGetConversationsArgs = {
  userIds: Array<Scalars['String']['input']>;
};

/** user  */
export type User = {
  __typename?: 'User';
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type AddUserMutationVariables = Exact<{
  newUserData: NewUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, username: string, creationDate: any } };

export type LoginMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, username: string, creationDate: any } } };


export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newUserData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newUserData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newUserData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"creationDate"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"creationDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
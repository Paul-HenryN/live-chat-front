"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ClientApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientApolloProvider client={client}>{children}</ClientApolloProvider>
  );
}

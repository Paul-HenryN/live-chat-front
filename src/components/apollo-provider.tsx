"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ClientApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
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

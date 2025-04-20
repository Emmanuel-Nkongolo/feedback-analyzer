import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Create HTTP link to GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Create Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;

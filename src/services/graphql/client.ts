import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { config } from "../../config/config";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: config.githubGraphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = config.githubAccessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

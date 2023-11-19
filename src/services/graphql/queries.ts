import { gql } from "@apollo/client";

export const GET_REPOSITORIES_WITH_PAGINATION = gql`
  query SearchRepositories(
    $query: String!
    $pageSize: Int!
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $pageSize
      after: $after
      before: $before
    ) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          owner {
            login
          }
          description
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          watchers {
            totalCount
          }
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

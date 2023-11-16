import { ReactNode } from "react";

export interface ContextProviderProps {
  children: ReactNode;
}

export interface Repository {
  name: string;
  owner: {
    login: string;
  };
  stargazers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  watchers: {
    totalCount: number;
  };
  primaryLanguage: {
    name: string;
  };
  description: string;
}

export interface PageInfo {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
}

export interface SearchQueryData {
  search: {
    nodes: Repository[];
    repositoryCount: number;
    pageInfo: PageInfo;
  };
}

export interface SearchQueryVariables {
  query: string;
  pageSize?: number;
  after?: string;
  before?: string;
}

export interface TablePageInfo {
  pageSize: number;
  page: number;
}

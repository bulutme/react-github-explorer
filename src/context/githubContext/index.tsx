import { useLazyQuery } from "@apollo/client";
import { FC, createContext, useState } from "react";
import { GET_REPOSITORIES_WITH_PAGINATION } from "../../services/graphql/queries";
import {
  ContextProviderProps,
  SearchQueryData,
  SearchQueryVariables,
  TablePageInfo,
} from "./types";
import { message } from "antd";

const useContext = () => {
  const [query, setQuery] = useState<string>("");
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfo>({
    pageSize: 10,
    page: 1,
  });

  const maximumRepositoryLength = 1000;
  /* The total number of repositories that matched the search query. 
   Regardless of the total number of matches, a maximum of 1,000 results will be available across all types.
   This is why repositoryCount can set max 1000
   */

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setTablePageInfo({
      ...tablePageInfo,
      page: 1,
    });
  };

  const getEncodedCursor = (minus: number) => {
    //Git api base64 encode after/before variables. Here we need to decode it.
    const rate = (tablePageInfo?.page - minus) * tablePageInfo?.pageSize;
    const rateCheck =
      rate > maximumRepositoryLength ? maximumRepositoryLength : rate;
    const cursor = tablePageInfo && btoa(`cursor:${rateCheck}`);
    return {
      rate: rateCheck,
      cursor: cursor,
    };
  };

  const variables = {
    query,
    pageSize: getEncodedCursor(0).rate - getEncodedCursor(1).rate,
    after: getEncodedCursor(1).cursor,
    before: getEncodedCursor(0).cursor,
  };

  const [getAllRepositories, { data, loading, error }] = useLazyQuery<
    SearchQueryData,
    SearchQueryVariables
  >(GET_REPOSITORIES_WITH_PAGINATION, {
    variables,
  });

  const getRepositories = () => {
    return data?.search?.nodes || [];
  };

  const getLimitedRepositoryCount = () => {
    const totalCount = data?.search?.repositoryCount!;
    return totalCount > maximumRepositoryLength
      ? maximumRepositoryLength
      : totalCount;
  };

  if (data && data.search && data.search.nodes.length === 0) {
    message.error("Repository Not Found");
  }

  if (error) {
    message.error("A problem occurred during getting repositories");
  }

  const contextValues = {
    loading,
    repositories: getRepositories(),
    tablePageInfo,
    query,
    setTablePageInfo,
    setQuery: handleQueryChange,
    getAllRepositories,
    repositoryTotalCount: getLimitedRepositoryCount(),
  };

  return contextValues;
};

export const Context = createContext({} as ReturnType<typeof useContext>);

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const contextValues = useContext();
  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default ContextProvider;

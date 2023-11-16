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

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setTablePageInfo({
      ...tablePageInfo,
      page: 1,
    });
  };

  const getEncodedCursor = (minus: number) => {
    const cursor =
      tablePageInfo &&
      btoa(`cursor:${(tablePageInfo?.page - minus) * tablePageInfo?.pageSize}`);
    return cursor;
  };

  const variables = {
    query,
    pageSize: tablePageInfo?.pageSize,
    after: getEncodedCursor(1),
    before: getEncodedCursor(0),
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
    return totalCount > 1000 ? 1000 : totalCount;
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
    /* The total number of repositories that matched the search query. 
    Regardless of the total number of matches, a maximum of 1,000 results will be available across all types.
    This is why repositoryCount can set max 1000
    */
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

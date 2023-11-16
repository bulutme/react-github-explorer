import React, { useContext, useEffect } from "react";
import { Button, Modal, Typography } from "antd";
import CustomTable from "../../components/customTable/CustomTable";
import SearchForm from "./components/searchForm/SearchForm";
import RepoDetails from "./components/repoDetails/RepoDetails";
import { ColumnsType } from "antd/lib/table";
import { AnyObject } from "antd/es/_util/type";
import { Context } from "../../context/githubContext";

const RepositoryList: React.FC = () => {
  const {
    query,
    loading,
    repositories,
    repositoryTotalCount,
    tablePageInfo,
    setTablePageInfo,
    getAllRepositories,
  } = useContext(Context);

  useEffect(() => {
    if (query) {
      getAllRepositories();
    }
  }, [query, getAllRepositories]);

  const handlePageChange = (page: number, pageSize: number) => {
    setTablePageInfo({
      pageSize,
      page,
    });
  };

  const { Title } = Typography;

  const columns: ColumnsType<AnyObject> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => (
        <span>
          <strong>{owner.login}</strong> {` (${owner.__typename})`}
        </span>
      ),
    },
    {
      key: "action",
      render: (repo) => (
        <Button
          size="small"
          data-testid="detail-button"
          onClick={() => {
            Modal.confirm({
              icon: null,
              title: `"${repo?.name}"`,
              onCancel() {},
              content: (
                <RepoDetails
                  id={repo?.id}
                  description={repo?.description}
                  owner={repo.owner?.login}
                  stars={repo.stargazers?.totalCount}
                  forks={repo.forks?.totalCount}
                  watchers={repo.watchers?.totalCount}
                  language={repo.primaryLanguage?.name}
                />
              ),
            });
          }}
        >
          Details
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="repository-list">
      <Title level={4}>React Github Explorer</Title>
      <SearchForm />
      <CustomTable
        rowKey={(record) => record.id}
        bordered
        columns={columns}
        dataSource={repositories}
        loading={loading}
        pagination={{
          total: repositoryTotalCount,
          onChange: handlePageChange,
          defaultPageSize: 10,
          pageSize: tablePageInfo?.pageSize,
          defaultCurrent: 1,
          current: tablePageInfo?.page,
        }}
      />
    </div>
  );
};

export default RepositoryList;

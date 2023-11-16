import React from "react";
import { List } from "antd";
import { RepoDetailsProps } from "./types";

const RepoDetails: React.FC<RepoDetailsProps> = ({
  id,
  description = "-",
  owner = "-",
  stars = 0,
  forks = 0,
  watchers = 0,
  language = "-",
}: RepoDetailsProps) => {
  const renderListItem = (label: string, value: string | number) => (
    <List.Item key={label + id}>
      <strong>{label}: </strong>
      {String(value)}
    </List.Item>
  );

  return (
    <List itemLayout="horizontal">
      {renderListItem("Description", description || "-")}
      {renderListItem("Owner", owner || "-")}
      {renderListItem("Stars", stars || 0)}
      {renderListItem("Forks", forks || 0)}
      {renderListItem("Watchers", watchers || 0)}
      {renderListItem("Language", language || "-")}
    </List>
  );
};

export default RepoDetails;

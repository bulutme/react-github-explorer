import React from "react";
import { List } from "antd";
import { RepoDetailsProps } from "./types";

const RepoDetails: React.FC<RepoDetailsProps> = ({
  id,
  description,
  owner,
  stars,
  forks,
  watchers,
  language,
}: RepoDetailsProps) => {
  const renderListItem = (label: string, value?: string | number) => (
    <List.Item key={label + id}>
      <strong>{label}: </strong>
      {String(value ?? "-")}
    </List.Item>
  );

  return (
    <List itemLayout="horizontal">
      {renderListItem("Description", description)}
      {renderListItem("Owner", owner)}
      {renderListItem("Stars", stars)}
      {renderListItem("Forks", forks)}
      {renderListItem("Watchers", watchers)}
      {renderListItem("Language", language)}
    </List>
  );
};

export default RepoDetails;

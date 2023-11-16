import { Table } from "antd";
import { IProps } from "./types";

const CustomTable = ({ showSizeChanger = true, ...tableProps }: IProps) => {
  return (
    <Table
      {...tableProps}
      bordered
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger,
      }}
    />
  );
};

export default CustomTable;

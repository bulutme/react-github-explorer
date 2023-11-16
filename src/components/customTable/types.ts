import { TableProps } from "antd";
import { AnyObject } from "antd/lib/_util/type";

export interface IProps extends TableProps<AnyObject> {
  showSizeChanger?: boolean;
}

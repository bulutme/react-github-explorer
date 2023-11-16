import { render, screen } from "@testing-library/react";
import CustomTable from "./CustomTable";

const mockData = [
  { key: "1", name: "John Doe", age: 30, address: "123 Main St" },
  { key: "2", name: "Jane Doe", age: 25, address: "456 Oak St" },
];

const mockColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
];

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("renders custom table with mock data", () => {
  render(<CustomTable dataSource={mockData} columns={mockColumns} />);

  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Age")).toBeInTheDocument();
  expect(screen.getByText("Address")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
});

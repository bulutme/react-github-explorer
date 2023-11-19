import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Context } from "../../../../context/githubContext";

const SearchForm: React.FC = () => {
  const { setQuery } = useContext(Context);

  const onFinish = (formData: { search: string }) => {
    setQuery(formData.search);
  };

  return (
    <Form onFinish={onFinish} className="search-form">
      <Form.Item
        name="search"
        rules={[{ required: true, message: "Please input your search key!" }]}
        className="search-form-item"
      >
        <Input
          type="text"
          placeholder="Enter GitHub username or repository"
          prefix={<SearchOutlined />}
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          data-testid="search-button"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;

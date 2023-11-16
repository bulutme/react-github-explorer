import React, { useContext, useState, ChangeEvent } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Context } from "../../../../context/githubContext";

const SearchForm: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const { setQuery } = useContext(Context);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter GitHub username or repository"
        prefix={<SearchOutlined />}
        size="large"
        style={{ marginRight: 8 }}
      />
      <Button
        data-testid="search-button"
        size="large"
        type="primary"
        onClick={() => setQuery(value)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchForm;

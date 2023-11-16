import { Layout } from "antd";
import React from "react";
import { MainLayoutProps } from "./types";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout data-testid="main-layout" className="main-layout">
      {children}
    </Layout>
  );
};

export default MainLayout;

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import BranchStats from "./admin";
import BenzinTurlari from "../benzin-turlari";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");
  const [bars, setBars] = useState(false);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("register"));
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div>
            <BranchStats />
          </div>
        );
      case "2":
        return <div></div>;
      case "3":
        return (
          <div>
            <BenzinTurlari />
          </div>
        );
      default:
        return <div>Bo'lim tanlang</div>;
    }
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {bars ? (
          ""
        ) : (
          <div
            className="flex items-center justify-center text-center flex-col gap-1 text-[#FFF]"
            style={{
              height: "64px",
              margin: "16px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <h1 className="text-[17px] font-medium">Wolcome!</h1>
            <h3 className="text-[15px] font-medium">ADMIN PANEL</h3>
          </div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Statistika bo'limi",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Video materiallar",
            },
            {
              key: "3",
              label: "Benzin turlari",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed), setBars(false);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            ></Button>
            <div style={{ marginRight: "24px" }}>
              <span className="text-[15px] font-medium">
                Salom, {token ? userData.first_name : ""}
              </span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

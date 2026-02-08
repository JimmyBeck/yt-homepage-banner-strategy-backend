import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  PictureOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useStore } from '../store/useStore';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <h1 className={`text-xl font-bold text-blue-600 transition-all duration-300 ${collapsed ? 'scale-0 w-0' : 'scale-100'}`}>
            Banner Admin
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: '工作台',
            },
            {
              key: '/banners',
              icon: <PictureOutlined />,
              label: 'Banner管理',
            },
            {
              key: '/strategy',
              icon: <SettingOutlined />,
              label: '策略配置',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: token.colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 }}>
          <div 
            className="px-6 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined className="text-lg" /> : <MenuFoldOutlined className="text-lg" />}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">欢迎回来，{currentUser?.name || '管理员'}</span>
            <Dropdown menu={userMenu} placement="bottomRight">
              <Avatar 
                src={currentUser?.avatar} 
                icon={<UserOutlined />} 
                className="cursor-pointer bg-blue-500" 
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

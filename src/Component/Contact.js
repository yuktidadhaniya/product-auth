import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const menulist = [
  { name: 'charts', path: '/charts' },
  { name: 'contact', path: '/contact' },
  { name: 'back', path: './dashboard' },
  { name: 'login', path: '/' },
];
const items2 = menulist.map((menu, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,

    label: (
      <div>
        <Link to={menu.path}>{menu.name}</Link>
      </div>
    ),
  };
});

const items1 = menulist.map((menu, index) => ({
  label: (
    <div>
      <Link to={menu.path}>{menu.name}</Link>
    </div>
  ),
}));
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          ></Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            This is a Contact page
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
